# Conceptual Questions — Answers

### Q1. Explain how async/await works internally in JavaScript.
**Answer:** Async/await is syntactic sugar built on top of Promises and Generators. It solves the "callback hell" problem by making asynchronous code look and behave more like synchronous code. Under the hood, when you `await` a Promise, the JavaScript engine suspends the execution of that specific `async` function, allowing other tasks in the event loop to run. Once the Promise resolves, the function is resumed from where it left off with the resolved value. This makes code much more readable and easier to debug compared to nested `.then()` chains.

### Q2. What risks does `innerHTML` introduce, and how do you mitigate them?
**Answer:** The primary risk is Cross-Site Scripting (XSS). If you use `innerHTML` to insert data from an untrusted source (like an API or user input), an attacker can inject `<script>` tags or attributes like `onerror` that execute malicious code in the user's browser. To mitigate this, you should always prefer `textContent` for plain text, or use `document.createElement()` and `appendChild()` for structured content. If you absolutely must use `innerHTML`, you must use a sanitization library like DOMPurify to strip out dangerous elements.

### Q3. What is the difference between `==` and `===` in edge cases?
**Answer:** The `==` (abstract equality) operator performs type coercion before comparison, while `===` (strict equality) compares both the value and the type. For example, `0 == false` is `true` because JavaScript coerces both to numbers, but `0 === false` is `false`. Another common edge case is `"" == 0`, which is `true`, or `null == undefined`, which is `true`. Using `===` is a best practice because it prevents these unexpected and often buggy type conversions.

### Q4. What happens if an API does not validate its input?
**Answer:** Failing to validate input can lead to severe security vulnerabilities like SQL Injection, where an attacker sends malicious queries to the database, or Remote Code Execution (RCE). It can also cause server crashes if the API expects a number but receives a very large string or an object that breaks the logic. To prevent this, always use a schema validation library (like Joi or Zod) to enforce strict types, lengths, and formats for every incoming request.

### Q5. Explain how a webhook differs from polling.
**Answer:** Polling is a "pull" mechanism where the client repeatedly asks the server if there is new data (e.g., every 5 seconds). This is often inefficient as it wastes resources if there are no updates. A webhook is a "push" mechanism where the server sends data to a specific URL provided by the client as soon as an event occurs. You would choose polling when the server doesn't support webhooks, but webhooks are almost always preferred for real-time updates and efficiency.

### Q6. Why should you use separate `dev` and `main` branches?
**Answer:** Using separate branches ensures that the `main` branch always contains stable, production-ready code. The `dev` branch serves as an integration layer where new features can be combined and tested together. This prevents unfinished or buggy code from reaching users, allows multiple developers to work on different features simultaneously without conflict, and provides a clear history of what changes have been finalized and deployed.

### Q7. What causes a memory leak in backend systems?
**Answer:** A memory leak occurs when a program allocates memory but fails to release it when it's no longer needed. In Node.js, a common cause is pushing data into a global array that never gets cleared, or creating closures that keep large objects in scope. For example, a `requestLog = []` array that grows with every hit will eventually crash the server. You can detect this by monitoring the process's RSS (Resident Set Size) or using tools like Chrome DevTools (via `node --inspect`) to take heap snapshots.

### Q8. Why should HTTP status codes match the actual response?
**Answer:** Status codes provide a standardized way for clients (browsers, mobile apps, or other services) to understand the result of a request without parsing the body. If an API returns `200 OK` but the body contains `{"error": "not found"}`, automated systems like retry-mechanisms, load balancers, or monitoring tools will think everything is fine and won't trigger necessary alerts. This leads to "silent failures" that are very difficult to track down in production.

### Q9. What is idempotency in APIs?
**Answer:** An operation is idempotent if performing it multiple times has the same effect as performing it once. For example, a `GET` request is idempotent because it doesn't change state. A `PUT` request to update a user's name to "John" is also idempotent; no matter how many times you run it, the name remains "John". In contrast, a `POST` request to "create an order" is usually not idempotent, as calling it twice would create two separate orders.

### Q10. How would you debug a production issue with no logs?
**Answer:** Without logs, my approach would be to first try and reproduce the issue in a staging environment by mirroring the production data and traffic if possible. If that fails, I would use APM (Application Performance Monitoring) tools like New Relic or Datadog to check for spikes in CPU, memory, or error rates. I might also use "distributed tracing" to see where requests are failing between services. Finally, I would implement minimal, safe logging for the suspected area and deploy a hotfix to gather the necessary data.
