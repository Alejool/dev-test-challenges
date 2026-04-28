# Solution — Automation Workflow

## Workflow Logic Explanation

I have designed an **n8n** workflow that addresses all the requirements of the registration process.

### 1. Webhook Entry
The workflow starts with a **Webhook Node** listening for `POST` requests. This captures the `name`, `email`, and `source` from the incoming JSON payload.

### 2. Email Validation
I used an **IF Node** with a Regular Expression to validate the email format. 
- **Regex:** `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
- **Why:** A naive check for `@` is insufficient. This regex ensures there is a valid username, a domain name, and a TLD of at least 2 characters.
- **Outcome:** If invalid, the workflow branches to a **Webhook Response** returning `{"status": "invalid", "message": "Email format is incorrect"}`.

### 3. Duplicate Detection
Before saving, a **Supabase Node** (or similar DB node) performs a `SELECT` query where the `email` column matches the input email.
- **Logic:** An **IF Node** checks the length of the result array.
- **Outcome:** If the count is `> 0`, the workflow returns `{"status": "duplicate", "message": "User already exists"}`.

### 4. Reliable Data Storage (Retry Logic)
If the email is valid and unique, the data is sent to the **Save User** node.
- **Retry Mechanism:** I enabled "Retry on Failure" in the node settings.
- **Config:** 3 retries with a 5-second interval. This handles temporary network glitches or API rate limits.

### 5. Error Logging & Response
The **Save User** node is configured to "Continue on Error" (error output).
- **Success:** Returns `{"status": "saved", "message": "User registered successfully"}`.
- **Failure (after retries):** If it still fails, the error branch triggers an **Error Log** step (saving the error reason to a separate table/file) and returns `{"status": "error", "message": "System error while saving user"}`.

## Exported Workflow
The full configuration can be found in the [workflow.json](./workflow.json) file in this directory.
