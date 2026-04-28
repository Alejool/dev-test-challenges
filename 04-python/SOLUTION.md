# Solución — Script en Python

## Errores Encontrados y Corregidos

### 1. Validación de Correo Ingenua
- **Archivo:** `script.py`
- **Causa Raíz:** La función `validate_email` originalmente solo verificaba la presencia del carácter `@` (`"@" in email`). Esto permitía que cadenas inválidas como `"frank@"` o `"@@"` fueran procesadas como correos válidos.
- **Solución:** Se implementó una Expresión Regular robusta (`r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'`) para asegurar que el correo tenga un formato válido, incluyendo un nombre de usuario, dominio y TLD.

### 2. Falta de Deduplicación
- **Archivo:** `script.py`
- **Causa Raíz:** El script contaba el correo de cada usuario individualmente. Si la misma dirección de correo aparecía varias veces (ej., el correo de Alice), se contaba cada ocurrencia en lugar de solo una vez.
- **Solución:** Se introdujo un conjunto (set) `seen_emails` para mantener un registro de las direcciones de correo ya procesadas. Si se encuentra un correo repetido, se ignora.

### 3. Agrupación Incorrecta (Correo Completo vs Dominio)
- **Archivo:** `script.py`
- **Causa Raíz:** La lógica de agrupación usaba la dirección de correo completa como clave para el diccionario de resultados (`domain = email`), lo que resultaba en conteos por correo único en lugar de por dominio.
- **Solución:** Se actualizó la lógica para extraer la parte del dominio dividiendo la cadena del correo en el carácter `@` y tomando la segunda parte (`email.split("@")[1]`).

### 4. Sobrescritura de Conteos en Lugar de Acumulación
- **Archivo:** `script.py`
- **Causa Raíz:** El script usaba `result[domain] = 1`, lo cual reiniciaba el conteo a 1 cada vez que se encontraba un dominio, perdiendo efectivamente los conteos anteriores.
- **Solución:** Se cambió la lógica para incrementar el conteo existente usando `result[domain] = result.get(domain, 0) + 1`.

---

# Solution — Python Script

## Bugs Found & Fixed

### 1. Naive Email Validation
- **File:** `script.py`
- **Root Cause:** The `validate_email` function originally only checked for the presence of the `@` character (`"@" in email`). This allowed invalid strings like `"frank@"` or `"@@"` to be processed as valid emails.
- **Fix:** Implemented a robust Regular Expression (`r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'`) to ensure the email has a valid format, including a username, domain, and TLD.

### 2. Lack of Deduplication
- **File:** `script.py`
- **Root Cause:** The script counted every user's email individually. If the same email address appeared multiple times (e.g., Alice's email), it was counted for every occurrence instead of just once.
- **Fix:** Introduced a `seen_emails` set to keep track of already processed email addresses. If an email is encountered again, it is skipped.

### 3. Incorrect Grouping (Full Email vs Domain)
- **File:** `script.py`
- **Root Cause:** The grouping logic used the full email address as the key for the results dictionary (`domain = email`), which resulted in counts per unique email rather than per domain.
- **Fix:** Updated the logic to extract the domain part by splitting the email string at the `@` character and taking the second part (`email.split("@")[1]`).

### 4. Overwriting Counts Instead of Accumulating
- **File:** `script.py`
- **Root Cause:** The script used `result[domain] = 1`, which reset the count to 1 every time a domain was encountered, effectively losing previous counts.
- **Fix:** Changed the logic to increment the existing count using `result[domain] = result.get(domain, 0) + 1`.
