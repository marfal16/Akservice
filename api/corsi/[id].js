//const pool = require('../../utils/db');
/*const pool = require('../utils/db');

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
}; */

import pool from "../utils/db.js"; // importa il pool dal db.js in ESM

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const { id } = req.query;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const result = await pool.query("SELECT * FROM corsi WHERE id = $1", [parseInt(id)]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Corso non trovato" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel recupero del corso", err);
    res.status(500).json({ error: "Errore del server" });
  }
}
