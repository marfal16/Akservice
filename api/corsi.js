const pool = require('./utils/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const result = await pool.query('SELECT * FROM corsi');
    console.log('Corsi trovati');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Errore nel recupero dei corsi:', err);
    res.status(400).send('Errore nel recupero dei corsi');
  }
};