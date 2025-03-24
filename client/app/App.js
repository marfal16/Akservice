import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Importa React Router

import './App.css';  // Assicurati che il CSS sia nella stessa cartella

// Componenti di esempio (crea questi file se non esistono ancora)
import Home from './app/pages/Home';  
import About from './app/pages/About'; 

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
    <Router>
      <div className="App">
        <h1>Benvenuto nel mio sito web!</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <Home clienti={clienti} />  // Passa i dati dei clienti alla homepage
          } />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Elenco dei clienti (solo visibile sulla homepage) */}
        <h2>Elenco dei clienti:</h2>
        <ul>
          {clienti.map((cliente) => (
            <li key={cliente._id}>
              {cliente.nome} - {cliente.email} - {cliente.telefono}
            </li>
          ))}
        </ul>
      </div>
    </Router>
  );
}

export default App;
