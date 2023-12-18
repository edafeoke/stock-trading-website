// src/server.js
const express = require('express');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Load database configuration
const sequelize = new Sequelize(require('./config/database')[process.env.NODE_ENV || 'development']);

// Load models
const Stock = require('./models/stock')(sequelize, DataTypes);

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Endpoint to get stock data
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;

    // Check if the stock is in the database
    const stock = await Stock.findOne({
      where: { symbol },
    });

    if (stock) {
      // If the stock is in the database, return the data
      res.json(stock.toJSON());
    } else {
      // If the stock is not in the database, fetch data from the API
      const apiKey = 'YOUR_API_KEY';
      const apiUrl = `https://api.example.com/stock/${symbol}?apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const stockData = response.data; // Adjust based on the actual API response structure

      // Save the stock data to the database
      const createdStock = await Stock.create(stockData);

      res.json(createdStock.toJSON());
    }
  } catch (error) {
    console.error('Error handling stock request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
