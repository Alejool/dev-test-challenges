import re

users = [
    {"name": "Alice", "email": "alice@gmail.com"},
    {"name": "Bob",   "email": "bob@yahoo.com"},
    {"name": "Carol", "email": "alice@gmail.com"},   # duplicate
    {"name": "Dave",  "email": "dave@gmail.com"},
    {"name": "Eve",   "email": "not-an-email"},      # invalid
    {"name": "Frank", "email": "frank@"},            # invalid
]

def validate_email(email):
    # FIX #1: Use a regex for email validation
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def group_by_domain(users):
    result = {}
    # FIX #2: Track processed emails to avoid duplicates
    seen_emails = set()
    
    for user in users:
        email = user["email"]
        if validate_email(email) and email not in seen_emails:
            seen_emails.add(email)
            # FIX #3: Extract domain (part after @)
            domain = email.split("@")[1]
            # FIX #4: Increment count instead of setting to 1
            result[domain] = result.get(domain, 0) + 1
            
    return result

output = group_by_domain(users)
print(output)

# Expected output: {"gmail.com": 2, "yahoo.com": 1}