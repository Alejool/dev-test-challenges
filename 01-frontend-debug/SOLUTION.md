# Solution — Frontend Debug

## 🇪🇸 Versión en Español

### Errores Encontrados y Soluciones

1. **Falta de `await` en `api.js`**
   - **Causa:** `fetch` y `response.json()` devuelven promesas. Sin el `await`, el código seguía antes de tener los datos.
   - **Solución:** Agregué `await` en ambas llamadas.

2. **Error de asignación en `app.js` (`userId = ''`)**
   - **Causa:** Se usaba un solo signo `=` dentro del `if`, lo que es asignación más no comparación.
   - **Solución:** Cambié a `===` para una comparación correcta y estricta.

3. **Lógica de Caché rota**
   - **Causa:** El código original usaba `if (!cachedUser)`, lo que hacía que después de la primera búsqueda exitosa, la aplicación nunca volviera a consultar la API para IDs diferentes.
   - **Solución:** Implementé un objeto `Map()` llamado `cache`. Con esto se logra que se almacene cada usuario por su ID y se pueda alternar entre ellos sin repetir peticiones innecesarias.

4. **Vulnerabilidad XSS**
   - **Causa:** El uso de `.innerHTML` con datos provenientes de una API externa permite la inyección de scripts maliciosos.
   - **Solución:** Reemplacé el uso de `.innerHTML` con `textContent` para que los datos se muestren como texto plano y con eso se evita cualquier script inyectado.

5. **Validación frágil**
   - **Causa:** La condición `userId > 0 === false` era confusa y no validaba bien los valores no numéricos.
   - **Solución:** Mejoré la validación usando `isNaN` y verificando que el ID sea positivo.

### Mejoras Adicionales de Robustez

- **Control de Errores con `try/catch`:** Envolví la petición a la API en un bloque `try/catch` para capturar fallos de red o problemas inesperados, evitando que la aplicación se detenga por completo.
- **Validación de Objeto de Usuario:** Verifiqué que el objeto devuelto por la API contenga datos (`Object.keys().length > 0`) antes de intentar renderizarlo. Esto permitió detectar cuando un ID no tiene un usuario asociado, mostrando el mensaje "user not found" en lugar de undefined.
- **Limpieza de Interfaz:** Agregué `resultEl.className = ''` al inicio de un resultado exitoso para eliminar la clase `.error` de búsquedas previas, asegurando que el texto rojo desaparezca cuando la operación es correcta.

---

## 🇺🇸 English Version

### Bugs Found & Fixes

1. **Missing `await` in `api.js`**
   - **Root Cause:** Both `fetch` and `response.json()` return Promises. Without `await`, the code proceeded with unresolved objects.
   - **Fix:** Added `await` to both calls for proper data retrieval.

2. **Assignment Bug in `app.js` (`userId = ''`)**
   - **Root Cause:** A single `=` was used inside the `if` statement, assigning a value instead of comparing it.
   - **Fix:** Changed to `===` for strict comparison.

3. **Broken Cache Logic**
   - **Root Cause:** The original code used `if (!cachedUser)`, meaning that once the first search was successful, the app would never fetch a different user ID again.
   - **Fix:** Implemented a `Map()` object as a cache. This ensures users are stored by their unique ID, allowing the app to switch between cached users without redundant API calls.

4. **XSS Vulnerability**
   - **Root Cause:** Using `.innerHTML` to render external API data directly makes the app vulnerable to script injection.
   - **Fix:** Replaced `.innerHTML` with `textContent` to ensure all data is rendered as plain text, neutralizing any injected scripts.

5. **Brittle Validation**
   - **Root Cause:** The expression `userId > 0 === false` was unclear and didn't properly handle non-numeric strings.
   - **Fix:** Improved validation by checking for empty strings and using `isNaN` to ensure a valid numeric ID.

### Additional Robustness Improvements

- **Error Handling with `try/catch`:** Wrapped the API fetch in a `try/catch` block to handle network failures or unexpected issues, preventing the app from crashing.
- **User Object Validation:** I verify that the object returned by the API contains data (`Object.keys().length > 0`) before attempting to render it. This allows the app to detect when an ID has no associated user, displaying "user not found" instead of empty fields.
- **UI Reset:** Added `resultEl.className = ''` upon a successful lookup to remove the `.error` class from previous failed attempts, ensuring the red text disappears when the operation succeeds.
