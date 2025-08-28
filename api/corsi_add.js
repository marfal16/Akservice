const pool = require('./utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  const { nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO corsi (nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Errore nel salvataggio del corso:', err);
    res.status(400).send('Errore nel salvataggio del corso');
  }
};