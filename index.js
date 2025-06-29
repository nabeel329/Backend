const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 