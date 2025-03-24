import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importa i componenti dalle rotte
import Home from './app/routes/home';
import About from './app/routes/about';

function App() {
  // Stato per memorizzare i dati dei clienti
  const [clienti, setClienti] = useState([]);

  // Recupero dei dati dal backend
  useEffect(() => {
    fetch('https://akservice-b5ge.onrender.com/clienti')
      .then((response) => response.json())
      .then((data) => setClienti(data))
      .catch((error) => console.error('Errore durante il recupero dei clienti:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Benvenuto nel mio sito web!</h1>
        <nav>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home clienti={clienti} />} />
          <Route path="/about" element={<about />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
