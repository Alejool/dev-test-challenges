import re

users = [
    {"name": "Alice", "email": "alice@gmail.com"},
    {"name": "Bob",   "email": "bob@yahoo.com"},
    {"name": "Carol", "email": "alice@gmail.com"},   # duplicate
    {"name": "Dave",  "email": "dave@gmail.com"},
    {"name": "Eve",   "email": "not-an-email"},      # invalid
    {"name": "Frank", "email": "frank@"},            # invalid
    {"name": "Grace", "email": ".grace@gmail.com"},  # invalid (starts with dot)
    {"name": "Heidi", "email": "heidi.@gmail.com"},  # invalid (ends with dot)
    {"name": "Ivan",  "email": "ivan..b@gmail.com"}, # invalid (double dot)
    {"name": "Judy",  "email": "judy@gmail..com"},   # invalid (double dot in domain)
]

def validate_email(email):
    # Improved regex according to simplified RFC 5322 standard:
    # 1. One @ symbol
    # 2. Local part + domain
    # 3. Allowed chars: . _ % + -
    # 4. No starting/ending with .
    # 5. No double dots ..
    # 6. Domain with valid TLD (min 2 chars)
    pattern = r'^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$'
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