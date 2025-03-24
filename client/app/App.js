import React, { useState, useEffect } from 'react';
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
      <h1>Benvenuto nel mio sito web!</h1>
      <p>Questa è la homepage.</p>

      <h2>Elenco dei clienti:</h2>
      <ul>
        {/* Mappa attraverso i clienti e visualizzali */}
        {clienti.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nome} - {cliente.email} - {cliente.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
