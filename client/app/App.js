import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa React Router
import React from 'react';
import Home from './app/pages/Home';  // Assicurati che il percorso sia corretto
import './App.css';  // Assicurati che il CSS sia nella stessa cartella

function App() {
  // Definisci uno stato per memorizzare i dati che ricevi dal backend
  const [clienti, setClienti] = useState([]);

  // Usa useEffect per fare la richiesta al backend quando il componente si carica
  useEffect(() => {
    // Fai la richiesta al tuo server su Render
    fetch('https://akservice-b5ge.onrender.com/clienti')
      .then((response) => response.json())
      .then((data) => {
        setClienti(data); // Memorizza i dati dei clienti nello stato
      })
      .catch((error) => {
        console.error('Errore durante il recupero dei clienti:', error);
      });
  }, []); // L'array vuoto [] assicura che venga eseguito solo una volta al caricamento del componente

  return (
        <div className="App">
          <h1>Benvenuto nella nostra homepage!</h1>
          <Home />  {/* Carica direttamente la pagina Home */}
        </div>
  );
}

export default App;
