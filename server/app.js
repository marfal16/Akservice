const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Aggiungi questa linea
const app = express();
const port = process.env.PORT || 5000;

// Modello Cliente (definito nel file 'cliente.js')
const Cliente = require('./models/cliente');

// Middleware per leggere il body in formato JSON
app.use(express.json());

// Usa CORS per permettere le richieste dal frontend
app.use(cors());  // Consente richieste da qualsiasi dominio, per la sicurezza puoi specificare l'origin come nel secondo esempio sopra

// Connessione a MongoDB Atlas
const uri = "mongodb+srv://marfal:Database2025@database.tclph.mongodb.net/gestionale?retryWrites=true&w=majority&appName=DataBase";
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas', err));

// Rotte CRUD per i clienti
app.post('/clienti', async (req, res) => {
  const { nome, email, telefono } = req.body;
  const cliente = new Cliente({ nome, email, telefono });
  await cliente.save();
  res.status(201).send(cliente);
});

app.get('/clienti', async (req, res) => {
  try {
    const clienti = await Cliente.find();
    res.json(clienti);
  } catch (err) {
    res.status(500).send('Errore nel recuperare i clienti');
  }
});

app.put('/clienti/:id', async (req, res) => {
  try {
    const { nome, email, telefono } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, { nome, email, telefono }, { new: true });

    if (!cliente) {
      return res.status(404).send('Cliente non trovato');
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).send('Errore del server');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Server attivo! 🚀');
});
