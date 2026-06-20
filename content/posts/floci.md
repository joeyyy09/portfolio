---
title: "floci: the whole cloud, running on your laptop"
date: "2026-06-20"
excerpt: "the local cloud emulator we found this week — what it is, when to reach for it, and a crystal-clear walk through how it serves aws, azure, and gcp from a single port."
url: ""
doodles: [server, cloud, terminal, database, network, gear]
---

Every so often you trip over a tool that's just *nice* — the kind that quietly deletes a category of annoyance you'd stopped noticing. This week, for me, that tool was **[Floci](https://floci.io/)**.

If you've ever built anything against the cloud, you know the local-development tax. You either deploy to a real account and wait (and pay, and pray nothing leaks), or you reach for an emulator, wrestle a `.env` full of fake-but-mandatory credentials, and hope the mock behaves like the real service once you ship. Floci is the cleanest answer to that I've seen in a while, and the way it works under the hood is genuinely fun. So let's get into it.

## what floci is

Floci is a suite of open-source cloud emulators. You run AWS, Azure, and GCP services *on your own machine*, with no cloud account and no real credentials, and you talk to them with the exact same SDKs and CLIs you'd use against the real thing.

It's three emulators plus tooling:

- **floci** — AWS, on port `4566`
- **floci-az** — Azure, on port `4577`
- **floci-gcp** — GCP, on port `4588`
- **floci-cli** to start, stop, and manage them
- **floci-ui** — an AWS-console-style dashboard to browse everything you've created

The defining design choice — the thing that makes it more than a toy — is that **Floci runs the real implementations wherever faking them would lie to you**. More on that below, because it's the best part.

## what you'd actually use it for

- **The inner loop.** Iterate on code that hits S3, SQS, DynamoDB, or Lambda without a single round trip to a real account. Save, run, see the result.
- **Integration tests in CI.** Spin up an ephemeral cloud, run your suite against it, throw it away. No shared test account drifting into a mess, no cleanup jobs, no flaky teardown.
- **Letting AI agents touch infrastructure safely.** Hand a coding agent throwaway keys pointed at localhost and it can create buckets, invoke functions, and stand up databases all day with zero risk to production and zero risk to your bill. This is the bit that overlaps with what I think about at work: let it act freely, but make the worst case harmless.
- **Demos and onboarding.** A new teammate runs one command and has a working cloud, instead of a half-day of IAM and account setup.
- **Offline development**, on a plane or a bad connection, against the same APIs you ship to.

## when to reach for it (and when not)

Reach for Floci when you want a **tight feedback loop** or **disposable, isolated infrastructure**: local development, integration tests, CI pipelines, agent sandboxes, demos. Anywhere the cost of touching the real cloud — latency, money, credentials, blast radius — is friction you don't need yet.

Be honest about what it isn't: it's not a stand-in for the real cloud when you're doing production-scale load testing, validating exact IAM-policy edge cases, or relying on a service it doesn't emulate. It's a development and testing tool, and a very good one. It's not your prod environment wearing a disguise.

## how it works under the hood

This is the part I went down the rabbit hole on. I'll build it up piece by piece, explaining every bit of jargon as we go, so by the end the whole architecture is obvious.

Here's the entire system in one picture. We'll then walk through each box.

```
            your code  (aws sdk · cli · terraform)
                         │   ordinary, signed AWS API calls
                         ▼
   ┌───────────────────────────────────────────────────────┐
   │   floci  —  one native binary listening on port 4566   │
   │                                                         │
   │   ┌───────────────────────────────────────────────┐   │
   │   │   the router   (Quarkus · JAX-RS · Vert.x)     │   │
   │   │   reads each request, decides the target svc   │   │
   │   └───────────────────────────────────────────────┘   │
   │          │                 │                 │         │
   │          ▼                 ▼                 ▼         │
   │   stateless          stateful          container-      │
   │   in-process         in-process        backed          │
   │   SQS, SNS,          S3, DynamoDB       Lambda, RDS,    │
   │   IAM, KMS, STS                         ElastiCache…    │
   │          │                 │                 │         │
   └──────────┼─────────────────┼─────────────────┼─────────┘
              ▼                 ▼                 ▼
          storage backend (RAM / disk)      Docker API
                                            starts REAL
                                            postgres, redis,
                                            kafka, mongo…
```

### the front door: one port, dozens of services

The first puzzle: a single HTTP port (`4566`) serves the *whole* AWS surface — S3, SQS, DynamoDB, Lambda, IAM. How does one listener know whether you're talking to S3 or DynamoDB?

First, the three pieces of tech holding that front door open, in plain English:

- **Vert.x** is an asynchronous, event-driven networking toolkit for the JVM. Instead of dedicating one thread per connection (which gets expensive fast), it runs a small **event loop** — the same idea as Node.js — where a handful of threads juggle thousands of connections by reacting to events ("data arrived," "socket ready"). This is what lets one port handle lots of concurrent traffic cheaply.
- **JAX-RS** is the standard Java way to *declare* HTTP endpoints: you annotate methods with the path and verb they handle, and the framework maps incoming requests to the right method. It's the vocabulary Floci uses to say "a request shaped like *this* goes to handler *that*."
- **Quarkus** is the modern Java framework tying those together — and, crucially, it's built to compile down to a tiny native binary (more on that in the next section). Vert.x is its networking engine; JAX-RS is its endpoint layer.

So: Vert.x accepts the connection, and a JAX-RS router decides where it goes. But how does the router know the *service*? It reads the request exactly the way real AWS does, using signals every AWS SDK already puts on the wire:

```
   incoming request on :4566
            │
            ├─ has an  X-Amz-Target  header?   ──►  JSON services
            │     e.g.  DynamoDB_20120810.PutItem      (DynamoDB, Kinesis, Lambda)
            │
            ├─ path / host look like a bucket? ──►  REST-XML services
            │     e.g.  PUT /my-bucket/my-key          (S3, CloudFormation)
            │
            ├─ form body with  Action=… ?      ──►  Query services
            │     e.g.  Action=CreateQueue             (SQS, SNS, IAM, STS)
            │
            └─ still ambiguous?  read the signature ──►  SigV4 credential scope
                  Authorization: …Credential=test/20260620/us-east-1/sqs/aws4_request
                                                          └ region ┘ └ svc ┘
```

That last one is my favourite trick. Every signed AWS request carries an `Authorization` header, and inside it is the **SigV4 credential scope** — a string that literally spells out the date, region, and *service name*. The SDK was already sending it for authentication. Floci just reads the service straight out of the signature it was going to receive anyway. Free routing information, hiding in plain sight.

Once the router knows the service, it hands off to that service's handler, and each handler speaks the genuine AWS **wire protocol** for its service. AWS isn't one uniform API; it's three dialects, and Floci implements all three rather than translating:

- **JSON** — DynamoDB, Lambda, Kinesis
- **Query** (form-encoded key/value) — SQS, SNS, IAM, STS
- **REST-XML** — S3, CloudFormation

### a single request, start to finish

To make it concrete, here's exactly what happens when you run `aws s3 mb s3://my-bucket`:

```
1. the AWS CLI builds an HTTP request to create a bucket,
   signs it with SigV4, and (because AWS_ENDPOINT_URL points
   at floci) sends it to  http://localhost:4566
        │
2. Vert.x's event loop accepts the connection
        │
3. the JAX-RS router inspects it: bucket-style path + REST-XML
   shape  →  this is S3
        │
4. the S3 handler creates the bucket as an entry in the
   storage backend (RAM or disk, your choice)
        │
5. it serializes a normal AWS-shaped XML response
        │
6. the CLI parses that response and prints success —
   it has no idea it never left your laptop
```

No mock pretending to be S3. A real implementation of the S3 protocol, backed by real storage.

### the native binary: why it boots instantly (GraalVM, explained)

Normally a Java program ships as **bytecode**: you hand the JVM your compiled classes, and at runtime it loads them, interprets them, watches which paths run hot, and *then* JIT-compiles those to machine code. That "watch and compile while running" phase is the famous JVM **warmup**, and it's why long-lived Java servers feel sluggish for their first few seconds.

Floci is compiled with **GraalVM native image**, which flips that around. It does **ahead-of-time (AOT) compilation**: at build time it performs a **closed-world analysis** — it traces every class and method the app could possibly reach — and produces a single, standalone, OS-native executable with a minimal runtime baked right in.

```
   classic JVM:   .class bytecode ─► JVM loads ─► interprets ─► JIT warms up ─► fast
   GraalVM AOT:   whole app analysed at BUILD time ─► native binary ─► fast immediately
```

The payoff for an emulator is huge: there's no warmup curve, so it's *up* the instant you ask. That's what makes it sane to start and stop a fresh instance inside a single test, rather than babysitting a long-running daemon. (If you're somewhere you'd rather run on a plain JVM, there's a `floci.jar` fallback too.)

### three kinds of service, and why the split matters

Here's the design decision I respect most. Not every service can be faked honestly, so Floci sorts them into three tiers:

1. **Stateless, in-process** — pure protocol logic with no real persistence story of their own: SQS, SNS, IAM, KMS, STS. These live inside the Floci process.
2. **Stateful, in-process** — they own data, which they read and write through a pluggable **storage backend**: S3, DynamoDB.
3. **Container-backed** — the clever ones. For anything where a mock would eventually betray you, Floci doesn't imitate it. It becomes a little **control plane**: it talks to *your* Docker daemon (through the socket you bind-mount) and provisions the *real engine* in a container.

```
   you:  "create an RDS Postgres instance"
            │
            ▼
   floci  ──►  Docker API:  run  postgres:16-alpine
                                  │
                                  ▼
            a genuine Postgres, wired up and credentialed,
            that your code connects to over the real protocol
```

The real engines it stands up:

| service | what actually runs |
|---|---|
| Lambda | real containers from `public.ecr.aws/lambda/<runtime>`, kept warm in a pool |
| RDS (Postgres) | a real `postgres:16-alpine` |
| RDS (MySQL / Aurora) | a real `mysql:8.0` |
| ElastiCache | real Redis, via `valkey/valkey:8` |
| MSK (Kafka) | a real Kafka-compatible broker (`redpanda`) |
| Neptune | a real Gremlin server |
| DocumentDB | a real `mongo:7.0` |
| ECS / EC2 / EKS | real container lifecycle management |

This is exactly why container-backed services need the Docker socket mounted (`-v /var/run/docker.sock:/var/run/docker.sock`): Floci uses the Docker API to start these engines, connect their networking, and inject credentials. So when your code hits "RDS," it's talking to genuine Postgres over the genuine wire protocol — the local-versus-prod gap that burns everyone simply isn't there, because there's no mock to disagree with reality.

### where your state lives (persistence)

In-process services route their data through a storage backend whose behaviour you pick with `FLOCI_STORAGE_MODE`:

- `memory` — everything in RAM, gone on stop. Perfect for CI and throwaway tests.
- `persistent` — flush to disk on every write. Durable, slower.
- `hybrid` — flush asynchronously on an interval. The comfortable default for local dev.
- `wal` — write to a **write-ahead log** before responding, for maximum durability (the same technique real databases use to survive crashes).

Data lands under `FLOCI_STORAGE_PERSISTENT_PATH`. And there are **snapshots** — `floci snapshot save` / `load` / `export` — so you can freeze an entire world of resources and restore it later, or hand it to a teammate as a tarball. Think git stash, but for your whole local cloud.

### isolation and compatibility, almost for free

**Multi-account isolation** is delightfully blunt: if your `AWS_ACCESS_KEY_ID` happens to be exactly twelve digits, Floci treats it as the account ID; otherwise it falls back to `000000000000`. Resources in one account are invisible to another, no setup required.

And if you're migrating from **LocalStack**, Floci tries to make it a non-event: it auto-translates LocalStack environment variables (`LOCALSTACK_HOST`, `PERSISTENCE=1`), runs your existing `/_localstack/init` scripts unchanged, and even serves a `/_localstack/health` endpoint so your test harness doesn't notice the swap.

### the cli stays out of your way

One thing I like philosophically: `floci-cli` does **not** wrap the AWS CLI or manage your resources for you. Its only jobs are orchestrating the emulator containers and exporting environment variables. You keep using the real `aws`, `az`, and `gcloud`. `floci env` prints an `AWS_ENDPOINT_URL` plus throwaway `test` credentials; you `eval` it, and every SDK on your machine quietly starts pointing at localhost. That's the whole integration — no plugin, no shim in your code, nothing to rip out later.

## setting it up

Install it (pick your platform):

```bash
# macOS / Linux
curl -fsSL https://floci.io/install.sh | sh

# Homebrew
brew install floci-io/floci/floci

# Windows (PowerShell)
irm https://floci.io/install.ps1 | iex
```

Start it and wire your shell up:

```bash
floci start          # boots the AWS emulator on :4566
eval $(floci env)    # exports AWS_ENDPOINT_URL + throwaway test creds
floci doctor         # sanity-checks your setup (docker, ports, etc.)
```

Now just use AWS as normal — the SDKs follow the endpoint from `floci env`:

```bash
aws s3 mb s3://my-bucket
aws s3 cp hello-floci.txt s3://my-bucket/
aws sqs create-queue --queue-name jobs
```

Prefer Docker? It's a one-liner (mount the socket so container-backed services work):

```bash
docker run --rm -p 4566:4566 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  floci/floci:latest
```

For tests, there are **Testcontainers** modules (Java, Node, Python, Go) that give each test its own isolated instance with no shared state:

```java
@Container
static FlociContainer floci = new FlociContainer();

S3Client s3 = S3Client.builder()
    .endpointOverride(URI.create(floci.getEndpoint()))
    .build();
```

And in CI it reads like you'd hope — start detached, wait until ready, run, tear down:

```bash
floci start --detach
floci wait --timeout 60s
eval $(floci env)
pytest
floci stop --remove
```

## where to find it

Floci is open source and free. If this got you curious, the project lives at **[floci.io](https://floci.io/)**, with the source at **[github.com/floci-io](https://github.com/floci-io)** — full credit to the team building it.

## the takeaway

What makes Floci click isn't any single feature, it's the philosophy: serve the real AWS protocols from one tiny native binary, back the stateful services with the *actual* engines instead of mocks, ask for no credentials, and stay out of your code entirely. It closes the gap between local and prod by refusing to pretend in the first place.

I've already dropped it into a side project to find the rough edges. If you live in the inner loop the way I do, give it an afternoon of your curiosity — that's exactly what I did, and I came away genuinely charmed.
