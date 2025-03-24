const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port =  process.env.PORT || 5000;  // Usa la porta dell'ambiente o 5000 come fallback;

// Modello Cliente (definito nel file 'cliente.js', se non l'hai ancora fatto)
const Cliente = require('./models/cliente');

// Middleware per leggere il body in formato JSON
app.use(express.json());

// Connessione a MongoDB Atlas (sostituisci <username> e <password> con le tue credenziali)
const uri = "mongodb+srv://marfal:Database2025@database.tclph.mongodb.net/gestionale?retryWrites=true&w=majority&appName=DataBase";

// Connessione con mongoose
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas', err));

// Rotte CRUD per i clienti

// Creare un nuovo cliente
app.post('/clienti', async (req, res) => {
  const { nome, email, telefono } = req.body;
  const cliente = new Cliente({ nome, email, telefono });
  await cliente.save();
  res.status(201).send(cliente);
});

// Leggere tutti i clienti
app.get('/clienti', async (req, res) => {
  try {
    const clienti = await Cliente.find();
    res.json(clienti);
  } catch (err) {
    res.status(500).send('Errore nel recuperare i clienti');
  }
});

// Modificare un cliente
app.put('/clienti/:id', async (req, res) => {
  try {
    const { nome, email, telefono } = req.body;
    // Trova e aggiorna il cliente
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, { nome, email, telefono }, { new: true });
    
    if (!cliente) {
      return res.status(404).send('Cliente non trovato');
    }

    res.status(200).json(cliente);  // Restituisci il cliente aggiornato
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore del server');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Server attivo! 🚀');
});
