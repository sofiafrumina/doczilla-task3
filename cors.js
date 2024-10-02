const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить запросы с любого источника
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/proxy/todos', (req, res) => {
  request(
    { url: 'https://todo.doczilla.pro/api/todos'},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));
