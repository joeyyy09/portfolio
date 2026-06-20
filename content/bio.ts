export const hero = {
  title: "hello, world. i’m harshith mente.",
  tagline: "from vizag · based in bengaluru · forza ferrari",
};

export const intro = [
  "let’s skip the standard resume intro for a second. before we get to the code, who am i, really?",
  "i’m a vizag kid who grew up by the bay and now writes code in bengaluru. i believe in keeping life gloriously simple and never, ever saying no to a new experience. my days come soundtracked by coldplay, ed sheeran, or taylor swift on loop. right now it’s the ukulele in my hands, but the master plan is the guitar, so i can host my own living room concerts and tiny, badly lit acoustic sessions. i shoot photos of the quiet moments that actually matter, and when i’m not chasing light, i’m in the kitchen turning random ingredients into something genuinely worth eating.",
  "here’s the thing that actually drives me: i crave perfection. i’ll do everything in my power to get there, and to keep myself genuinely satisfied with what i make. i’m not chasing metrics or numbers ticking up on some dashboard. i’m chasing that quiet inner satisfaction of knowing a thing was done right, and that i left nothing on the table.",
  "but here’s the other side of the coin. i’m intensely passionate about a hundred things, yet at my absolute core, i just love to code. getting to spend my days deep in software architecture, untangling complex logic puzzles, and paying the bills with my favourite thing on earth? that’s a privilege i never take for granted.",
  "here’s the real, extended story of what i build, how i work, and what makes me tick.",
];

export const introWhisper =
  "♫ look at the stars, look how they shine for you (coldplay)";

export type Entry = { title: string; meta?: string; body: string };

export type Section = {
  id: string;
  label: string;
  tag?: string;
  lead?: string;
  entries: Entry[];
  whisper?: string;
  doodles?: string[];
};

export const sections: Section[] = [
  {
    id: "footprint",
    label: "the professional footprint",
    tag: "where the bills get paid (happily)",
    lead: "i design and write code that has to be fast, clean, and stubbornly resilient. my toolkit revolves around typescript, c++, and python, but i’m happily language agnostic when there’s a real problem to solve. i’ve shipped with go, javascript, and dart too; built on react, next, node, express, flutter, graphql, and redux; lived inside mongodb, postgres, redis, and clickhouse; and made my peace with docker, kubernetes, aws, firebase, git, and ci/cd along the way. the tools matter less than the thinking, so hand me anything and i’ll be productive in it fast. i care, maybe a little too much, about clean architecture, killing system friction, and automating away the boring human overhead.",
    entries: [
      {
        title: "flagright",
        meta: "software engineer",
        body: "currently building core compliance and financial crime infrastructure at a yc backed fintech startup. most of my work lives in an agentic investigation framework: systems that automatically pick up incoming risk alerts, reason over the signals behind each one, and take the obvious decision so a human doesn’t have to. i designed it to act only on the clear cut, low risk, high confidence cases, with the safety rails to match: every agent can be dry run in shadow mode and simulated against past alerts before it’s ever allowed to touch a live one. the payoff is leaner investigation workflows and far fewer repetitive manual reviews, without anyone giving up control over the calls that actually carry risk. alongside that i’ve worked across the rule building and investigation copilot surfaces that make all of this usable day to day.",
      },
      {
        title: "goldman sachs",
        meta: "summer software engineering intern",
        body: "a high intensity summer in the controllers org, buried in enterprise grade backend work. i built a financial reporting pipeline that swallowed the slow, manual data pulls analysts used to stitch together by hand across multiple systems, and collapsed them into a single report generation engine. the result: roughly 30% faster processing end to end, manual reconciliation eliminated for the people who lived in those reports, and 99.9% accuracy across 50,000+ financial records. a masterclass in data integrity where precision simply isn’t negotiable.",
      },
      {
        title: "linux foundation · cncf",
        meta: "lfx mentee · jaeger",
        body: "picked for an lfx mentorship with cncf to work on jaeger, the distributed tracing platform, through its v2 rebuild on top of the opentelemetry collector. i integrated the kafka exporter and receiver from the otel collector so kafka could sit as a buffer between collection and ingestion, extended the otel kafka receiver to parse otlp json (not just protobuf), wrote the integration tests that proved data flows cleanly all the way from span collection to storage, and ran a v1 vs v2 comparison to keep upgrades backward compatible. work that helped ship jaeger v2. one of the most formative things i’ve done. (the full story’s in the writing desk further down.)",
      },
    ],
    whisper: "cool. cool cool cool cool cool. no doubt, no doubt. (b99)",
    doodles: ["code", "braces", "terminal", "gear"],
  },
  {
    id: "crucible",
    label: "the academic & competitive crucible",
    tag: "five years of beautiful suffering",
    entries: [
      {
        title: "iiitm gwalior",
        meta: "integrated m.tech, information technology",
        body: "five years deep in the fundamentals that actually stick: data structures, algorithm design, operating systems, computer networks, computer architecture, database management, and object oriented programming, with the occasional machine learning detour for good measure. it’s the place that drilled in the habit i lean on every single day, think hard before you type, and respect the layers quietly running underneath your code.",
      },
      {
        title: "the master’s thesis",
        body: "an extensive r&d project on english to telugu neural machine translation. months of implementing distillation frameworks and experimenting with dynamic teacher distributions to squeeze out translation accuracy. a brutal exercise in data cleaning and model tuning, peaking the week i spent hunting an elusive corpus anomaly where the exact frequency count of the word “the” was, all on its own, quietly skewing my entire evaluation metric. data cleaning is the job; the modelling is the reward you earn afterward.",
      },
      {
        title: "the hackathon circuit",
        body: "i live for the rush of building under pressure. out of thousands of teams nationwide, i punched through the brackets to the national semi finals of the flipkart grid 7.0 engineering challenge, and landed in the top 50 of the tata elxsi teliport innovation challenge, throwing untested ideas at some of the sharpest young minds in the country and watching what survived.",
      },
      {
        title: "wins & responsibilities",
        body: "a few things i’m proud of off the leaderboard too. i took 1st place in the technical blog writing contest and 2nd in jpc-ii, the campus programming contest, both run by the abhigyan abhikaushalam students’ forum. i also taught 300+ students the ropes of git, github, and web development, and ran 60+ techno managerial events as a core member of the forum. turns out i like building communities almost as much as i like building software.",
      },
    ],
    whisper: "♫ i wanna be defined by the things that i love (taylor swift, daylight)",
    doodles: ["book", "bulb", "compass", "star"],
  },
  {
    id: "tinkering",
    label: "the tinkering years",
    tag: "where the curiosity actually started",
    lead: "long before any of this was a job, it was just me, a device i had no business opening, and the deeply held belief that the fastest way to learn something is to take it apart and risk never putting it back together.",
    entries: [
      {
        title: "the bricked phone",
        body: "the original sin. as a kid i decided my phone simply had to run a custom rom, so i rooted it, flashed something i barely understood, and turned a perfectly good phone into a very expensive paperweight. bricked it, completely. equal parts terrified and thrilled, and that exact mix never really left, neither did the itch to flash roms onto anything that would hold still long enough.",
      },
      {
        title: "the dual boot",
        body: "my first windows laptop didn’t stay just windows for long. i dual booted linux onto it and then customised the thing down to the bone: window managers, dotfiles, keybindings, themes, the lot, until it felt like mine and nobody else’s. that was the moment it clicked that i didn’t just want to use computers, i wanted to own every single layer of them.",
      },
      {
        title: "beta everything",
        body: "if there’s an early access build, a beta channel, or a nightly release, odds are i’m already running it. i like living a version or two ahead, bugs and all, because software that’s broken on purpose is the fastest way to understand how it actually works (and the fastest route to filing a very enthusiastic bug report).",
      },
    ],
    whisper: "warranty: voided. curiosity: very much intact.",
    doodles: ["wrench", "penguin", "phone", "bolt"],
  },
  {
    id: "war-stories",
    label: "engineering nuances & war stories",
    tag: "me vs. the machine",
    lead: "i’m relentlessly resourceful. my core belief is stubbornly simple: there is always a solution, and if i can’t see it yet, it only means i haven’t looked hard or honestly enough. so i sit with the problem, question everything, chase the why behind every behaviour, and refuse to move on until it genuinely makes sense. i take ownership of the whole development ecosystem, not just the code inside the file, and there’s little i enjoy more than handing the team a fix that just works.",
    entries: [
      {
        title: "the logic battles",
        body: "i don’t quit on a bug, ever. i’m the one who’ll lose hours to a stubborn set of failing test cases on a grid based pathfinding problem, sketching vectors by hand until the penny finally drops: the naive fixed diagonal approach was never going to hold. so i throw it out and rebuild it as a proper multi state dynamic programming solution, then grind it until every last edge case turns green. 100%, or it simply isn’t done.",
      },
      {
        title: "the rabbit holes",
        body: "i’m incurably curious. i can’t really use a thing without wanting to pry it open and understand why it works, which is exactly how a two minute fix becomes a three hour investigation i regret absolutely nothing about. that itch, needing the why and never just the what, is the same thing that makes me a decent engineer and a menace to my own free time.",
      },
    ],
    whisper: "noice. smort. (every bug, the moment it finally dies)",
    doodles: ["bug", "warning", "shield", "braces"],
  },
  {
    id: "off-keyboard",
    label: "life off the keyboard",
    tag: "macbook closed, heart open",
    lead: "when the macbook closes, the intensity just changes shape into the things that keep me grounded and a little bit electric.",
    entries: [
      {
        title: "saltwater & sandcastles",
        body: "i’m a coast kid at heart. vizag raised me by the sea, and it never really left. drop me near a beach and i’m gone: chasing the waves, watching the light fall, and yes, still building sandcastles like the tide isn’t coming. the ocean is where the noise quiets down, where i reset, and where everything suddenly feels possible again.",
      },
      {
        title: "the sports fanatic",
        body: "weekends are sacred, and they belong to sport. i’m a ferrari tifoso, first and always, living and dying with every formula 1 race weekend. i’m culer to the bone for fc barcelona, and i ride for rcb through every glorious high and every familiar heartbreak. i don’t casually follow these clubs, i love them with my whole heart, whether i’m breaking down tire degradation strategy, arguing tactical formations till midnight, or just yelling at a screen with everything i’ve got.",
      },
      {
        title: "the markets",
        body: "when i’m not writing code, i’m usually reading the markets. i love investing, and even more than that i love the analysis underneath it, running technical and quantitative breakdowns of how things move and obsessing over why. it scratches the exact same itch as engineering: a messy real world system, full of signal and noise, quietly daring you to find the pattern.",
      },
      {
        title: "the bengaluru lifestyle",
        body: "i thrive on the mix of fast paces and good flavour. catch me at the local track burning rubber through a go karting session, or cooking up a storm and hunting down the city’s best kept culinary secrets. my fuel of choice? a legendary chicken dum biryani, crispy hot wings, or a flawless, gold standard ghee podi masala dosa.",
      },
    ],
    whisper: "forza ferrari · visca el barça · ee sala cup namde 🏆",
    doodles: ["ferrari", "ukulele", "camera", "biryani", "gokart"],
  },
];

export const outro = {
  label: "let’s build something real",
  tag: "bingpot.",
  body: "i’m all about software engineering and building things that are genuinely fun and interesting. so whether you want to talk systems architecture, clean code, open source, or some half formed idea worth chasing, or just throw down in a debate about track strategy and football tactics over coffee, let’s connect. my dms are open and i’m genuinely easy to reach.",
  links: [
    { label: "github", value: "@joeyyy09", href: "https://github.com/joeyyy09" },
    {
      label: "linkedin",
      value: "harshith mente",
      href: "https://www.linkedin.com/in/harshith-mente",
    },
  ],
  whisper:
    "nine nine! ♫ i found a love, for me, darling just dive right in (ed sheeran, perfect)",
};
