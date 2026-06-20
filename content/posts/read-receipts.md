---
title: "read receipts 101: decoding the ticks"
date: "2025-01-07"
excerpt: "how whatsapp's blue ticks really work, and how i'd rebuild a real-time read-receipt system from scratch."
url: "https://medium.com/@menteharshith/read-receipts-101-decoding-the-ticks-57e7624e95d9"
doodles: [chat, checks, database, wifi, lock, network]
---

Ever wondered how WhatsApp knows exactly when your friend has read your message? Those double blue ticks seem magical, but there's a lot of computer science wizardry behind the scenes.

So, what if we wanted to replicate this feature? We'll explore the nuts and bolts: from designing the architecture and protocols to handling databases and optimizations. Let's break it down step-by-step and build our own version of read receipts, all while keeping it fun and relatable.

Every message has 3 lives:

- *Sent*: Off to the server it goes!
- *Delivered*: Landed safely on their device
- *Read*: Eyes on it — mission complete!

## 1. Architecture Overview: How Read Receipts Work Behind the Scenes

Let's break it down into a story of teamwork between your device, the server, and some clever tech magic:

### 1.1. Client-Server Model

- The **client** (e.g., a mobile or desktop app) communicates with a centralized server to manage message state and synchronization
- The **server** handles message delivery, stores metadata, and updates read receipts

### 1.2. Real-Time Communication

- **WebSocket Protocol**: Enables persistent, bidirectional communication between the client and the server, ensuring low-latency updates for message statuses

### 1.3. Encryption

- While the message content is encrypted (E2EE), metadata like read receipts remains accessible to the server for processing

## 2. Building the Read Receipt System

Let's dive into the technical details of implementing a read receipt system from scratch. This involves designing a robust database, creating a workflow for message states, and setting up real-time communication using WebSockets.

### 2.1. Designing the Database

To manage the state of messages efficiently, a well-structured database schema is crucial. This schema will store important message metadata, including the message ID, sender/recipient information, status, and timestamps.

**Key Fields:**

- MessageID: A unique identifier for each message. We use a hashing algorithm like **SHA-256** to generate a unique ID for every message
- SenderID: The user who sent the message
- RecipientID: The user receiving the message
- Status: The current state of the message, which can be one of the following:
  - *SENT*: The message has been sent to the server
  - *DELIVERED*: The message has reached the recipient's device
  - *READ*: The recipient has opened the message
- Timestamp: The Unix timestamp for when the message changes state (e.g., when it's sent, delivered, or read)

### 2.2. Building the Workflow

Let's break down the sequence of events that happen when a message is sent, delivered, and read:

**Message Sent:**

1. The sender's app generates a **MessageID** (using a hashing algorithm like SHA-256)
2. The message content is sent to the server, and its **status** is initially set to *SENT*
3. The server stores the message and its status in the database

**Message Delivered:**

1. The server pushes the message to the recipient's app via a background process
2. Upon successful delivery, the recipient's app sends a **delivery acknowledgment** back to the server
3. The server then updates the message **status** to *DELIVERED* and stores the timestamp for this state transition

**Message Read:**

1. When the recipient opens the message, the app sends a **read acknowledgment** to the server
2. The server updates the message **status** to *READ*, and the timestamp for this event is recorded
3. A notification is sent to the sender, indicating that the message has been read

### 2.3. Implementing WebSocket Communication

For real-time updates, **WebSocket** is the go-to technology. It allows a persistent, two-way communication channel between the server and the client, ensuring low-latency updates for message statuses.

**Server Setup:**

- Maintain **persistent WebSocket connections** for each active user. This ensures that the server can push updates in real-time to any client currently connected

**Event Handling:**

- On state changes (e.g., from DELIVERED to READ), the server **triggers events** that notify the client
- These events update the user interface and alert the sender when their message is read

For instance:
- When a message is **delivered**, the recipient's app is immediately notified, and the sender's app can see the change in status
- When the message is **read**, the sender's app gets a notification, and the recipient's app shows the message as "read"

By using WebSockets, you ensure that these updates happen almost instantaneously, providing a seamless experience for both users.

## 3. Challenges and Considerations

As with any real-time system, implementing a robust read receipt mechanism comes with its set of challenges. Let's take a closer look at some key hurdles and how we can address them, keeping scalability and performance in mind.

### 3.1. Offline Users: Handling Messages and Updates

One of the most common challenges in a messaging system is dealing with users who are **offline** when messages are sent or updated. Here's how we can handle this:

- **Queueing Messages**: When a user is offline, we need to store their messages temporarily on the server until they reconnect. This means that the server must handle a **message queue** for each user, ensuring that the unread messages are delivered once the user is back online
- **Delayed Status Updates**: Similarly, if a user is offline when their message reaches the recipient, we need to **queue the delivery and read updates**. Once the recipient is back online, the system can push the appropriate status updates (DELIVERED or READ) to both the recipient and the sender, ensuring consistency
- This requires a well-designed queueing mechanism that checks the online/offline status of users and processes updates accordingly. Tools like **Redis** can be leveraged to store pending messages in memory, allowing for fast retrieval when the user reconnects

### 3.2. Latency: Optimizing for Real-Time Updates

Real-time communication is at the heart of the read receipt system, and **low-latency updates** are crucial for a seamless user experience. However, several factors can introduce delays:

- **WebSocket Connections**: While WebSockets provide a persistent, low-latency connection, the **quality of the connection** (e.g., network conditions, server load) can still affect how quickly updates are pushed to the client
- **Optimizing for Latency**: To keep things snappy, it's essential to:
  - **Minimize the payload**: Only send the necessary data (e.g., status updates) rather than large chunks of information
  - **Use a CDN or edge servers**: If your app spans multiple regions, implementing a Content Delivery Network (CDN) or edge servers can reduce the distance between the user and the server, thereby lowering latency
- We can implement **connection health monitoring** to track the state of each WebSocket connection and optimize performance. Additionally, strategies like **message batching** can help reduce network congestion and improve efficiency

### 3.3. Scalability: Managing Billions of Messages Daily

As the number of users grows, so does the number of messages. Managing billions of messages per day while keeping the system fast and responsive is no small task. Here's how we can address the scalability challenge:

- **Load Balancing**: With billions of messages, it's crucial to distribute the load evenly across multiple servers to avoid bottlenecks. Implementing **load balancers** that dynamically distribute requests will ensure that no single server is overwhelmed
- **Partitioning Data**: Using **sharding** (dividing data into smaller, more manageable chunks) can significantly improve the system's scalability. By splitting the message data based on factors like **user ID** or **region**, we can ensure that each database or server handles a smaller subset of the data, reducing the load on any single server
- **Horizontal Scaling**: As traffic increases, we need to scale our infrastructure horizontally (adding more servers). This ensures that the system can handle the increased demand while maintaining performance
- We can leverage cloud services like **AWS** or **Google Cloud**, which provide automated scaling options. Additionally, using distributed databases like **Cassandra** or **MongoDB** can help store and manage data across multiple nodes

And there you have it! We've walked through the nuts and bolts of building a real-time read receipt system — handling offline users, keeping things snappy with low latency, and ensuring your system can scale to the moon (or at least handle billions of messages daily).

While this blog covered the essentials, there's always room for more optimizations and fine-tuning. But hey, you've got the foundation, and with this knowledge, you're already well on your way to creating a message tracking system that's fast, reliable, and ready for the big leagues.

Now, go forth and impress your users with seamless, real-time updates. Just don't forget to leave a "read" receipt for this blog post. Happy coding!
