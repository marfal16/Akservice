/*const pool = require('./utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const result = await pool.query('SELECT * FROM corsi');
    console.log('Corsi trovati. OK');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Errore Nel recupero dei corsi:', err);
    res.status(400).send('Errore nel recupero dei corsi');
  }
};*/

const pool = require('./utils/db');

module.exports = async (req, res) => {
  const { url, method } = req;

  // Match su /api/corsi/:id
  const match = url.match(/^\/api\/corsi\/(\d+)$/);

  if (method === 'GET' && match) {
    const id = parseInt(match[1], 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID non valido' });
    }

    try {
      const result = await pool.query('SELECT * FROM corsi WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Corso non trovato' });
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('Errore nel recupero del corso:', err);
      return res.status(500).json({ error: 'Errore del server' });
    }
  }

  // Match su /api/corsi
  if (method === 'GET' && url === '/api/corsi') {
    try {
      const result = await pool.query('SELECT * FROM corsi');
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error('Errore nel recupero dei corsi:', err);
      return res.status(500).json({ error: 'Errore del server' });
    }
  }

  // Altri metodi o URL non gestiti
  return res.status(404).json({ error: 'Endpoint non valido' });
};
