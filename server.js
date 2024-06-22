const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/filter-words', async (req, res) => {
  const wordsAsString = req.body.words;

  const options = {
    method: 'POST',
    url: 'https://api.apilayer.com/bad_words',
    headers: {
      'apikey': process.env.API_KEY,
    },
    data: wordsAsString,
  };

  try {
    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
