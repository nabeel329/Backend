const express = require('express');
const app = express();
const todoRoutes = require('./routes/todos');

app.use(express.json());
app.use('/', todoRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
