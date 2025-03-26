// /models/corsoModel.js
const mongoose = require('mongoose');

// Definizione dello schema per il corso
const corsoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descrizione: { type: String, required: true },
  prezzo: { type: Number, required: true },
  sconto: { type: Number, required: true },
  categoria: { type: String, required: true },
  data_inizio: { type: Date, required: true },
  data_fine: { type: Date, required: true }
});

// Creazione del modello a partire dallo schema
const Corso = mongoose.model('Corso', corsoSchema);

module.exports = Corso;
