---
title: "navigating exception management in typescript"
date: "2024-04-09"
excerpt: "five hard won rules for throwing, wrapping, and surviving errors in typescript without losing your stack trace."
url: "https://medium.com/tech-iiitg/navigating-through-exception-management-in-typescript-32f5239988a9"
doodles: [bug, warning, shield, braces, code, terminal]
---

We've all been there: knee-deep in code, everything seems to be going smoothly, and then bam! An error pops up out of nowhere, ready to ruin our day.

Dealing with errors is just part of the gig, and having a solid game plan for handling them can make all the difference between a smooth sailing project and a hair-pulling nightmare.

Now, I know what you're thinking: "But isn't error handling just for TypeScript?" Well, sure, that's our focus today, but these principles are like a good cup of coffee — they work wonders no matter what language you're coding in.

1. Make sure every error you throw is a legit Error — no fakes allowed!
2. Hold onto your stack trace tight — it's your breadcrumb trail when things go awry
3. Keep your error messages consistent — it's like having a uniform for your bugs
4. Serve up just the right amount of context — don't overload, but don't skimp either
5. Save those error throws for the real deal problems — not the expected bumps in the road

Did that grab your attention? If it did, then keep on reading! We're about to uncover some error-handling secrets that'll make your coding life a whole lot smoother. Let's dive in!

## Make sure every error you throw is a legit Error — no fakes allowed!

In the vast and sometimes quirky world of JavaScript, here's a little secret you might not know: you can throw just about anything, not just Error instances.

```typescript
function throwNumber() {
  throw 234
}

try {
  throwNumber()
} catch (err) {
  console.log(err) // 234
}
```

Although this is fun and allows some clever use cases, this is not a good idea! Indeed, there are a few issues:

- There is no stack trace attached, so the thrown "error" loses much of its usefulness
- On the caller side, almost always, actual *Error* instances are expected. It's not unusual to see naive usage of *err.message* in the wild without checking the type of *err* first

To ensure you're fully protected against this issue, make it a golden rule to always throw Errors in your codebase. It's a good idea to keep this rule in mind, but why not take it a step further? Enforce it by setting up an ESLint rule.

Even more crucially, before you start working with an error that you've caught, always double-check to ensure it's truly an *Error* object. To do this, ensure that you've activated the `useUnknownInCatchVariables` flag in your `tsconfig.json` file. Note that this flag is automatically enabled if you're operating in *strict* mode. This way, the error variable in your *catch* block will be treated as *unknown* instead of *any*, providing an extra layer of safety. We cannot misuse an error without ensuring its type first. Out of the box, it's not practical to use though:

```typescript
try {
  runFragileOperation();
} catch (err) {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.log('An unknown error occurred');
    // Handle the scenario where err is not an instance of Error
    // For example, you can log the type of err
    console.log('Error type:', typeof err);
  }
}
```

Constantly having to check the type of an error with an if block in a catch block is cumbersome. Moreover, what do you do if it's not an Error?

To tackle this situation, have an ensureError function that makes sure an error is an Error. If it's not, the thrown value is wrapped in an Error. The implementation looks like this:

```typescript
function ensureError(value: unknown): Error {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {}

  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`)
  return error
}
```

With this, manipulating caught errors is more straightforward:

```typescript
function performOperationSafely() {
  try {
    runFragileOperation();
  } catch (error) {   // err is unknown
    if (error instanceof Error) {
      console.log(error.message); // this will fail if we're not checking the `err` type
    } else {
      console.log('An unknown error occurred');
    }
  }
}
```

Here are a few reasons why this approach is awesome:

- It handles everything that might go wrong, and as long as the info can be turned into a JSON string, we won't lose any details
- If necessary, it creates an Error instance right away, including a stack trace. This makes it super easy to pass the error along with the most relevant stack trace
- It makes our code look much cleaner: just one short line, and you know you're dealing with an Error. Since we have to use this in every catch block, it's a big deal
- This simple function has made our error handling code a whole lot simpler

## Hold onto your stack trace tight

Try identifying the problem in this code snippet.

```typescript
try {
  runFragileOperation()
} catch (err) {
  const error = ensureError(err)

  throw new Error(`Running fragile operation failed: ${error.message}`)
}
```

Did you know that retaining the stack trace of the initial error can be incredibly useful for debugging? It provides valuable context that can help pinpoint the root cause of the issue. With the introduction of the cause property in Node.js 16.9.0 and most modern browsers since mid-2021, you can now attach the original error to a new Error object seamlessly. This feature allows you to preserve the stack trace while handling errors, making debugging much more efficient and straightforward. So, next time you encounter an error, consider leveraging the cause property to maintain the full context and make your debugging process smoother.

Also, let us explore why we are throwing a new Error instead of throwing up the original error. Imagine you have a situation where you're catching an error in one part of your code and then re-throwing it in another part. If you simply re-throw the original error, it will retain its original stack trace and context. However, this might not always be desirable.

For instance, if the error is caught at a lower level of your application and then re-thrown at a higher level, the original stack trace might not accurately reflect the context of where the error is being handled at the higher level. This can make debugging more challenging as you might not have visibility into the exact chain of events that led to the error.

By throwing a new Error and including the original error as its cause, you're effectively creating a new error with its own stack trace that reflects the context of where it's being thrown. This can provide better insights into the flow of your application and make it easier to trace back the root cause of the error.

```typescript
try {
    // Attempt the fragile operation
    runFragileOperation();
} catch (err) {
    // Ensure the caught error is an Error object
    const error = ensureError(err);

    // Check if fallback mechanism is enabled
    if (config.fallbackEnabled) {
        try {
            // Attempt to execute fallback operation
            runFallback();
        } catch {
            // In a real-world scenario, it's crucial to maintain the stack trace of the fallback error for effective debugging.
            // However, for this example, we discard the fallback's stack trace and re-throw the original error.
            throw error;
        }
    } else {
        // If fallback mechanism is disabled, throw the original error
        throw error;
    }
}
```

Indeed, when re-throwing the original error without wrapping it in a new Error object, we do lose some benefits:

1. Clarity of Error Messages: The error message might become less informative. For example, if the original error message was something like "ECONNRESET" (indicating a connection reset error), it might not be very user-friendly or informative to someone using your function. Wrapping the original error in a new Error object allows you to provide a more descriptive error message tailored to your function's context, such as "Calling API failed"
2. Lack of Differentiation: Without wrapping the original error, it becomes harder to differentiate between errors thrown from different parts of your code. In the case of re-throwing the original error from multiple catch blocks, the resulting stack trace would look identical, making it difficult to determine which throw ended up throwing the error. This can make debugging more challenging, as it reduces the visibility into the flow of errors through your code

## Keep your error messages consistent

In this example, let's say runFragileOperation() encounters a network error resulting in an ECONNRESET error. Without wrapping the original error in a new Error object and providing a clear error message, monitoring and error tracking platforms may interpret every occurrence of ECONNRESET as a single error instance. As a result, it might incorrectly conclude that the error is infrequent, potentially leading to inaccurate insights and metrics.

Additionally, re-throwing the original error without differentiation between errors thrown from the primary operation and fallback operation can further complicate error tracking. Error tracking platforms might struggle to distinguish between errors originating from different parts of the codebase, leading to confusion in identifying the root cause of issues and determining the appropriate remediation steps.

Therefore, it's crucial to carefully consider error message clarity and differentiation when designing error handling mechanisms, especially in contexts where error monitoring and tracking play a significant role in maintaining system reliability and performance.

## Serve up just the right amount of context

When handling errors, it's essential to ensure that error messages are informative and clear. In the example provided, if the original error thrown by runFragileOperation() is not wrapped in a new Error object with a descriptive message, such as "Calling API failed", monitoring and error tracking platforms might struggle to accurately identify and categorize error occurrences. This can lead to misleading insights and metrics, potentially obscuring the true frequency and impact of errors.

Moreover, by re-throwing the original error without differentiating between errors originating from the primary operation and fallback operation, it becomes challenging for error tracking platforms to distinguish between various types of errors and accurately attribute them to their respective sources. As a result, diagnosing and resolving issues becomes more complex, impacting system reliability and performance.

Therefore, it's crucial to strike the right balance between providing sufficient context through clear error messages and maintaining differentiation between errors thrown from different parts of the codebase. This ensures that error monitoring and tracking platforms can effectively analyze and respond to errors, ultimately enhancing the reliability and performance of the system.

## Save those error throws for the real deal problems

In TypeScript, it's essential to reserve throwing errors for situations where it's truly necessary, typically representing critical or unrecoverable issues. Unlike some other programming languages, TypeScript doesn't enforce error handling, meaning there's no guarantee that thrown errors will be caught and handled.

Throwing errors should be considered a last resort, reserved for scenarios where the program encounters exceptional conditions that cannot be safely recovered from, such as critical system failures or invalid program states that prevent further execution.

Given that TypeScript doesn't enforce error handling through function signatures, developers need to be mindful of potential uncaught exceptions and ensure appropriate error handling mechanisms are in place, such as try-catch blocks or error propagation to higher-level error handling functions.

By judiciously using error throws and implementing robust error handling strategies, developers can enhance the reliability and maintainability of their TypeScript codebases, ensuring that critical issues are properly addressed while minimizing the risk of unexpected runtime failures.
