const pool = require('../../utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  // Vercel passa i parametri dinamici (es. :id) in req.query
  const { id } = req.query;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const result = await pool.query('SELECT * FROM corsi WHERE id = $1', [parseInt(id)]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Corso non trovato" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel recupero del corso", err);
    res.status(500).json({ error: "Errore del server" });
  }
};