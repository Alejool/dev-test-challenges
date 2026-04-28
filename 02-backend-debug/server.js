const express = require('express');
const app = express();
app.use(express.json());

// FIX #4: Cap requestLog size to prevent memory leak
const requestLog = [];
const MAX_LOG_SIZE = 100; // Limit size of the logs to 100 elements

function logRequest(data) {
  requestLog.push({ ...data, ts: Date.now() });
  if (requestLog.length > MAX_LOG_SIZE) {
    requestLog.shift(); // Remove oldest
  }
}

// Simulated async DB read
async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, value: 'hello' }), 100);
  });
}

// GET /data
// FIX #1: added await
// FIX #6: returns data.value instead of data.result
app.get('/data', async (req, res, next) => {
  try {
    logRequest({ method: 'GET', path: '/data' });

    const data = await getDataFromDB(); // FIX #1

    if (!data) {
      // FIX #2: return 404 if no data
      return res.status(404).json({ error: 'No data found' });
    }

    res.json({ result: data.value }); // FIX #6
  } catch (error) {
    next(error);
  }
});

// POST /save
// FIX #3: added input validation
app.post('/save', (req, res, next) => {
  try {
    const { name, value } = req.body;

    // FIX #3: validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing name' });
    }
    if (typeof value !== 'string' || value.trim() === '') {
      return res.status(400).json({ error: 'Missing or invalid value (must be a non-empty string)' });
    }

    logRequest({ name, value, method: 'POST', path: '/save' });

    res.status(201).json({ saved: true, name, value });
  } catch (error) {
    next(error);
  }
});

// FIX #5: Added global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;