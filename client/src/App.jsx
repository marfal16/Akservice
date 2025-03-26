import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import di React Router
import './App.css';

// Componenti delle pagine
import Home from './pages/Home';  
import About from './pages/About';  
import CorsiInformatici from './pages/CorsiInformatici'; 
import FormazioneScolastica from './pages/FormazioneScolastica'; 
import SupportoCliente from './pages/SupportoCliente'; 

import CorsiList from './components/CorsiList';
import AggiungiCorso from './components/AggiungiCorso';

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Chi Siamo</Link></li>
          <li><Link to="/services">I Nostri Servizi</Link></li>
          <li><Link to="/contact">Contatti</Link></li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>  
      <Navbar />
      <div>
        {/* Aggiungi le Routes qui */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/corsi-informatici" element={<CorsiInformatici />} />
          <Route path="/supporto-cliente" element={<SupportoCliente />} /> 
          <Route path="/formazione-scolastica" element={<FormazioneScolastica />} /> 
        </Routes>
      </div>

      <div className="App">
      <h1>Gestione Corsi</h1>
      <AggiungiCorso />
      <CorsiList />
    </div>
    
    </Router>
  );
}

export default App;
