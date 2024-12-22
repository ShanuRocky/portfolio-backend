import express, { json } from 'express';
import cors from 'cors';
import { pool, initializeDatabase } from './db/index.js';
import { searchSymbols , getCurrentPrices } from './services/stockService.js';
import { port } from './config.js';

const app = express();
app.use(cors());
app.use(json());

initializeDatabase();

app.get('/api/stocks/search', async (req, res) => {
    try {
      const { query } = req.query;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      const results = await searchSymbols(query);
      res.json(results);
    } catch (error) {
      console.error('Failed to search stocks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Get all stocks with real-time prices
app.get('/api/stocks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stocks');
    const tickers = rows.map(stock => stock.ticker);
    const currentPrices = await getCurrentPrices(tickers);
    
    const stocks = rows.map( stock => ({
      id: stock.id,
      name: stock.name,
      ticker: stock.ticker,
      quantity: stock.quantity,
      buyPrice: parseFloat(stock.buy_price),
      currentPrice: currentPrices[stock.ticker]
    }));
    res.json(stocks);
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new stock
app.post('/api/stocks', async (req, res) => {
  const { name, ticker, quantity, buyPrice } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO stocks (name, ticker, quantity, buy_price) VALUES (?, ?, ?, ?)',
      [name, ticker, quantity, buyPrice]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Failed to add stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update stock
app.put('/api/stocks/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ticker, quantity, buyPrice } = req.body;
  try {
    await pool.query(
      'UPDATE stocks SET name = ?, ticker = ?, quantity = ?, buy_price = ? WHERE id = ?',
      [name, ticker, quantity, buyPrice, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to update stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete stock
app.delete('/api/stocks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM stocks WHERE id = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to delete stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});