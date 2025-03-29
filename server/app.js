const express = require('express');
const { Pool } = require('pg'); // Importa pg per PostgreSQL
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Stringa di connessione di Render (sostituisci con la tua stringa reale)
const connectionString = 'postgresql://admin_maria:CU2zzZItTegzDFa9hD8VHnoMjnbmw8mO@dpg-cvik64juibrs73ftbapg-a.frankfurt-postgres.render.com/akservice';

// Configura PostgreSQL con la stringa di connessione
const pool = new Pool({
  connectionString: connectionString, // Usa la stringa di connessione completa
  ssl: { rejectUnauthorized: false }    // Necessario per Render
});

// Controlla la connessione
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

  // Rotta per aggiungere un nuovo corso
app.post('/api/corsi/add', async (req, res) => {
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
});


// Rotta per ottenere tutti i corsi
app.get('/api/corsi', async (req, res) => {
  try {
    console.log('Richiesta GET ricevuta per corsi...');
    const result = await pool.query('SELECT * FROM corsi');
    
    if (result.rows.length === 0) {
      console.log('Nessun corso trovato.');
    } else {
      console.log('Corsi recuperati:', result.rows);
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Errore nel recupero dei corsi:', err);
    res.status(400).send('Errore nel recupero dei corsi');
  }
});

app.get('/api/corsi/:id', async (req, res) => {
  const { id } = req.params; // Ottieni l'ID dall'URL
  try {
    // Assicurati che l'ID sia un numero
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
});
// SOLO IN PRODUZIONE: Servire il frontend React
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}


// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});