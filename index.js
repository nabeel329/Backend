const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body (needed for POST)
app.use(express.json());

app.get('/categories', async (req, res) => {
  try {
    const response = await axios.get('https://backend.qistbazaar.pk/api//products-categories-minimal');
    res.json(response.data);
  } catch (error) {
    console.error('API fetch failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/homepage-data', async (req, res) => {
  try {
    const response = await axios.get('https://qistbazaar.pk/_next/data/qZ-HmZQA6ZEDBSjz3dlMV/index.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching homepage data:', error.message);
    res.status(500).json({ error: 'Failed to fetch homepage data' });
  }
});

app.post('/send-sms', async (req, res) => {
  try {
    const { user_number } = req.body;

    console.log('Sending SMS to:', user_number);

    const bodyData = {
      user_number: user_number
    };

    const response = await axios.post('https://dawaai.pk/labtests/send_sms', bodyData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


