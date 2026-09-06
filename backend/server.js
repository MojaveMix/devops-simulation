const express = require('express');
const cors = require('cors');
const db = require('./db');
const initializeDatabase = require('./initDb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create item
app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId, name, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ id: req.params.id, name, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
