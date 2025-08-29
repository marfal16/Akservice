//const pool = require('../../utils/db');
const pool = require('../utils/db');

module.exports = async (req, res) => {
  console.log('Dati della richiesta (req):', req.query);
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  // Vercel passa i parametri dinamici (es. :id) in req.query
  const { id } = req.query;
  console.log('ID estratto dalla query:', id);

  try {
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    console.log('Esecuzione della query con ID:', parseInt(id));
    const result = await pool.query('SELECT * FROM corsi WHERE id = $1', [parseInt(id)]);
    console.log('Risultato della query:', result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Corso non trovato" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel recupero del Corso", err);
    res.status(500).json({ error: "Errore del server" });
  }
}; 
