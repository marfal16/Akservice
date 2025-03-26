const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Corso = require('./models/corsoModel'); // Importa il modello

const app = express();
const port = process.env.PORT || 5000;

// Middleware per leggere il body in formato JSON
app.use(express.json());

// Usa CORS per permettere le richieste dal frontend
app.use(cors());

// Connessione a MongoDB Atlas
const uri = "mongodb+srv://marfal:Database2025@database.tclph.mongodb.net/gestionale?retryWrites=true&w=majority&appName=DataBase";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas', err));


// SOLO IN PRODUZIONE: Servire il frontend React
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Rotta catch-all per servire index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Rotta per aggiungere un nuovo corso
app.post('/api/corsi/add', async (req, res) => {
  const nuovoCorso = new Corso(req.body);

  try {
    await nuovoCorso.save();
    res.status(201).send(nuovoCorso);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Rotta per ottenere tutti i corsi
app.get('/api/corsi', async (req, res) => {
  try {
    const corsi = await Corso.find();
    res.status(200).json(corsi);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
