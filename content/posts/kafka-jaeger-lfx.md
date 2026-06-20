---
title: "a kafka fuelled journey: my lfx mentorship with jaeger"
date: "2024-09-01"
excerpt: "my lfx mentorship with cncf jaeger: wiring kafka as a buffer between collector and ingester in jaeger v2."
url: "https://medium.com/@menteharshith/a-kafka-fueled-journey-my-lfx-mentorship-experience-with-jaeger-633152397b4d"
doodles: [network, gear, branch, server, database, terminal]
---

This summer has been an incredible journey of growth and learning. From contributing tirelessly to Kwok and Jaeger to becoming a primary candidate across both the projects for the mentorship, it has been an exhilarating experience. As the summer wraps up, I am proud to reflect on the progress and achievements made along the way.

## The Beginning: How It All Started

When I embarked on this journey, I was eager to contribute to a project that would push the boundaries of my skills. Early on, I identified two potential projects: **CNCF — Jaeger** and **CNCF — Kwok**. I started contributing to both in my free time, even before the official contribution phase began. This early involvement allowed me to explore the codebases thoroughly, pick up and solve some good first issues, and engage with the community members who were incredibly supportive. Throughout this period, I was diligently preparing a solid and detailed proposal, even though the application process only required a cover letter.

By the time submissions closed, I felt confident about my chances. I continued to dive deeper into the codebases of both organizations, gaining a stronger understanding of the challenges and opportunities within each project.

Finally, the day of the results arrived, and I was thrilled to find out that I had been selected for the **Jaeger project**. I would be spending my summer working on an exciting Kafka integration project! Interestingly, while my initial proposal was for a different project, my mentor, Yuri, suggested that I take on the Kafka project instead. Without hesitation, I agreed, eager to take on the challenge. Later, I also learned that I had been the primary candidate for the Kwok project as well, which boosted my confidence even further.

As for my proposal, I put together a comprehensive plan that covered every aspect of the project. I crafted a **weekly plan** for the entire mentorship program, outlining how I would approach each phase of the project with specific milestones. I included **code examples** to demonstrate my approach, highlighted my **current code contributions**, and detailed my **introductions** to the community. My proposal also covered my **commitments** and **technical abilities**, showing how I intended to contribute effectively to the project. This thorough preparation ensured that I was ready to hit the ground running when the mentorship officially began.

The Jaeger community, known for its powerful open-source tool for observability and distributed tracing, presented the perfect challenge. With mentors like Yuri Shkuro, Jonah Kowall, and Yash Sharma guiding me, I knew I was in for an enriching experience for my summer!

Now let's get into the project details.

## What is Jaeger V2?

For those unfamiliar, **Jaeger is a distributed tracing platform**. Jaeger V2 represents a significant evolution, as it rebases all Jaeger backend components — agent, collector, ingester, and query — on top of the OpenTelemetry (OTEL) Collector. The primary goal of my project was to implement a deployment mode, previously supported in Jaeger V1, that uses Kafka as an intermediate buffer for spans between the collector and the ingester. This integration needed to support both the original Jaeger formats and the newer OTLP formats, all while using the latest version of the IBM/Sarama driver.

## Kafka Meets Jaeger: The Heart of My Project

The main focus of my mentorship was on **enhancing the Kafka integration for Jaeger V2**. This involved leveraging Kafka as a buffer between the collector and ingester, ensuring reliable data flow in both Jaeger and OTLP formats. The project aimed to achieve parity for Kafka-based deployments in Jaeger V2 compared to Jaeger V1, including robust internal observability.

## From Code to Reality: Developing End-to-End Integration Tests

To validate our Kafka integration, I developed **comprehensive end-to-end integration tests**. These tests were crucial for ensuring that data flowed seamlessly from collection to storage, regardless of the telemetry format — be it Jaeger or OTLP. This effort ensured consistency and reliability across various data formats, making Jaeger V2 even more robust.

## Digging Deep: Comparative Analysis and Compatibility Checks

To ensure a smooth transition for users upgrading from Jaeger V1 to V2, I conducted an **in-depth comparative analysis** of configuration options, supported data models, and backward compatibility. This analysis highlighted the key differences and improvements in Jaeger V2, ensuring that users could upgrade with confidence.

## Documentation: The Unsung Hero of Software Engineering

Beyond code, documentation is vital for the success of any project. I contributed to the **creation and optimization of configuration files** like collector-with-kafka.yaml and ingester.yaml, which are crucial for setting up Jaeger's new Kafka-based architecture. Additionally, I documented gaps in backward compatibility and proposed solutions to bridge these gaps, ensuring a smooth user experience.

## Wrapping It Up: A Journey Worth Remembering

The LFX Mentorship has been a transformative experience. It wasn't just about writing code; it was about designing thoughtful architectures, conducting thorough testing, and creating documentation that will guide future contributors. I'm immensely grateful to my mentors for their invaluable support and to the Jaeger community for welcoming me into their world.

But this is just the beginning. Although the official mentorship has ended, I'm excited to continue contributing to Jaeger and helping new contributors navigate their journeys.
