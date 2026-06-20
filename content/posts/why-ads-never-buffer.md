---
title: "why do ads never buffer? (and can our videos learn from them?)"
date: "2025-01-26"
excerpt: "why ads stream in crisp 1080p while your show buffers — and what video streaming can steal from ad tech."
url: "https://medium.com/@menteharshith/why-do-ads-never-buffer-and-can-our-videos-learn-from-them-cb1bb2121465"
doodles: [gauge, wifi, server, cloud, bolt, network]
---

Ever noticed how ads seem to stream seamlessly in 1080p or higher, while the content you're waiting for struggles to load at even 480p? While this might feel like a conspiracy to force you into watching ads, there's a deep interplay of technology, optimization strategies, and business priorities at work here. Let's try to dissect this phenomenon layer by layer, from the network stack to streaming algorithms and backend architecture and look at the possible answers to our doubt.

## 1. Adaptive Bitrate Streaming: How Videos Are Delivered

Modern video streaming platforms use **Adaptive Bitrate Streaming (ABR)** to dynamically adjust video quality based on the user's available bandwidth and network conditions. Here's how it works:

- Videos are encoded into multiple bitrates and resolutions (e.g., 240p, 480p, 720p, 1080p)
- A manifest file (e.g., an **M3U8** for HLS or an **MPD** for DASH) describes these video chunks
- The **client player** selects the most appropriate resolution based on real-time measurements of available bandwidth, latency, and buffering history

### Why Ads Always Play in High Quality

- **Preloaded Buffering:** Ads are often short (15–30 seconds) and are completely preloaded before playback begins. This eliminates the need for dynamic adjustments during playback, allowing them to always play at the highest available quality
- **Prioritization in ABR:** Some platforms prioritize ad segments over content in ABR decision-making, temporarily allocating more bandwidth to ensure smooth ad playback
- **Fixed Bitrate Encoding:** Ads are usually encoded at a fixed high bitrate (e.g., 1080p or 4K) without fallback options for lower resolutions, as advertisers want their content to appear crisp and professional

### Why Content Buffers

- **Progressive Quality Adjustment:** Video content often starts at a lower resolution, incrementally increasing as the platform tests bandwidth stability. This avoids buffering during playback
- **Longer Duration, Higher Variability:** A full movie or episode requires sustained bandwidth, unlike short ads, increasing the likelihood of encountering bandwidth fluctuations
- **Background Adaptation:** Platforms monitor the user's connection over time and adjust the stream, potentially lowering quality during network congestion

## 2. Content Delivery Networks (CDNs) and Caching

Streaming platforms use **CDNs** to reduce latency and ensure scalability. CDNs replicate and cache video chunks in geographically distributed servers, bringing the content closer to the user.

### How Ads Leverage CDNs

- **High Cache Hit Rate:** Ads are served to millions of users simultaneously, leading to near 100% cache hit rates at CDN edge servers. This ensures minimal latency
- **Preloaded on Edge Servers:** Platforms often preload ads on CDN edge nodes before campaigns go live, ensuring immediate delivery when requested

### Why Content May Lag

- **Cache Misses:** Rarely watched content or new releases may not yet be cached at the closest CDN node, leading to slower delivery
- **Longer Load Times:** Video content consists of numerous chunks, each requiring its own request-response cycle, while ads are typically a single chunk or a few segments
- **Bandwidth Throttling:** Some platforms intentionally throttle content delivery speeds to optimize costs or regulate traffic, but ads remain exempt to protect revenue streams

## 3. Ad Revenue vs. User Experience: Business Prioritization

For streaming platforms, ads are a major source of revenue. Ensuring that ads play without buffering is crucial for maintaining advertiser trust and generating income.

### Revenue-Driven Optimization

- **Ad Tracking Pixels:** To track impressions and engagement, ads must load and play flawlessly. Failed ad playback means lost revenue
- **Ad Load Priority:** In multi-threaded delivery systems, ad requests are prioritized over content requests. This ensures that the ad plays even if the content buffers
- **Dedicated Bandwidth Allocation:** Platforms may allocate a fixed portion of their available bandwidth to ad delivery, guaranteeing smooth playback

## 4. Network Protocols: Ads vs. Content

Streaming platforms use advanced protocols like **HTTP/2** and **QUIC (HTTP/3)** to reduce latency and improve video delivery.

### How Ads Take Advantage

- **QUIC Prioritization:** Ads are often delivered over newer, faster protocols like QUIC, which optimize packet retransmissions and improve delivery speed over unreliable networks
- **Smaller Payloads:** Ads are shorter and have fewer segments, reducing the chances of packet loss or retransmission delays
- **Prefetching with DNS:** Some platforms resolve and prefetch ad-related DNS queries even before the user clicks "play," while content-related DNS queries are deferred

## 5. The Role of Video Encoding and Compression

### Ads: Optimized for Quality

- Ads are encoded with **higher bitrates** and **complex compression algorithms** (e.g., **H.265/HEVC**) to maintain visual fidelity
- **Smaller Files:** Short durations allow higher quality per second without significantly increasing file size, ensuring smooth delivery

### Content: Trade-Offs Between Quality and Size

- Content encoding balances compression and quality to reduce storage and bandwidth costs
- Longer durations result in larger files, and aggressive compression can lead to artifacts, especially in lower resolutions

## 6. User Context and Analytics

Streaming platforms rely heavily on user analytics to optimize delivery.

### How Ads Use Data

- **Prefetching Algorithms:** Ads are preloaded based on user location, device type, and network speed
- **Client Hints:** Ads often leverage advanced client hints (e.g., viewport size, effective bandwidth) to dynamically choose the highest possible quality

### Content's Adaptive Strategy

- **Network Testing:** Content streaming involves repeated network checks to optimize playback quality over time
- **Device Limitations:** Content delivery considers device constraints (e.g., screen size, battery usage), sometimes prioritizing lower resolutions for mobile users

If the technology used to play ads works so seamlessly, it's only natural to wonder why we can't apply the same principles to actual video playback and improve content streaming. Let's dig into this idea and explore both the challenges and opportunities.

## 7. Challenges in Applying Ad Tech to Video Content

### A. Preloading Limitations

Preloading an entire movie or episode, as is done with ads, is infeasible for two reasons:

1. **Bandwidth Usage:** Preloading gigabytes of data could overwhelm user bandwidth and network infrastructure
2. **Storage Constraints:** Devices, especially mobile phones, may not have enough local storage to preload large videos

### B. Adaptive Bitrate vs. Fixed Resolution

- Videos need **adaptive streaming** to maintain smooth playback in fluctuating network conditions, but ads often skip this step by delivering fixed-quality streams
- Applying fixed-resolution delivery to videos would lead to more buffering if the network can't handle the high bitrate consistently

### C. Cost of CDN Caching

- Ads benefit from high reuse, so they justify the cost of aggressive caching on edge servers. Videos, with a vast and diverse library, would require exponentially larger storage and infrastructure investment to achieve similar caching efficiency

## 8. Can Ad Tech Inspire Better Video Streaming?

Yes! While the exact methods used for ads can't always be directly applied to videos, they inspire innovative ways to enhance video streaming. Here's how:

### A. Intelligent Prefetching

- **Ad-Inspired Approach:** Ads are often preloaded on the client device or CDN edge servers based on user behavior and context
- **Video Application:** Streaming platforms can predict user behavior using machine learning to preload the next few chunks of video content
- **Example:** Netflix uses algorithms to predict what episode or show you're likely to watch next and preloads it in the background

### B. Enhanced CDN Caching

- **Ad-Inspired Approach:** Ads benefit from nearly 100% cache hit rates at CDN edge servers
- **Video Application:** Platforms could optimize caching for popular or trending content by dynamically reallocating cache space based on user demand
- **Example:** Newly released episodes or movies could be prioritized for edge caching during peak demand periods

### C. Fixed High-Resolution Streams for Key Segments

- **Ad-Inspired Approach:** Ads are delivered at fixed high quality to ensure a flawless impression
- **Video Application:** Platforms could apply fixed high-resolution delivery to shorter, critical parts of videos, such as previews or trailers, while falling back to adaptive streaming for the rest

### D. Dedicated Bandwidth Allocation

- **Ad-Inspired Approach:** Ads often receive prioritized bandwidth to prevent interruptions
- **Video Application:** Platforms could reserve bandwidth for certain content types, like intros or live events, ensuring a smoother experience

### E. QUIC and HTTP/3 Protocols

- **Ad-Inspired Approach:** Ads leverage faster protocols like QUIC to reduce latency
- **Video Application:** Streaming platforms could adopt QUIC or HTTP/3 universally, improving latency and reducing buffering for all video types

### F. Distributed Edge Computing

- **Ad-Inspired Approach:** Ads often leverage edge computing to preprocess requests and reduce server load
- **Video Application:** Video platforms could offload more computations (e.g., ABR decision-making or encoding tasks) to edge servers to speed up content delivery

While the magic behind ad tech might not completely solve the challenges of video streaming, it does hold valuable lessons. By borrowing principles like preloading, smarter caching, and efficient delivery protocols, we can get closer to a future where every video streams as flawlessly as those 15-second ads.

So, the next time an ad plays in crystal-clear 1080p while your video buffers, remember — it's not just a technical gap but a challenge engineers are actively solving. Who knows? The day when your favorite show streams with the same perfection as a pre-roll ad might be just around the corner.
