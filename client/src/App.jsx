console.log('App is running');


import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  // Import di React Router
import './App.css';

// Componenti delle pagine
import Home from './pages/Home';  // Assicurati che la Home sia nella cartella 'pages'
import About from './pages/About';  // Assicurati che About sia nella cartella 'pages'

function Navbar() {
  return (
<header className="navbar">
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">Chi Siamo</a></li>
      <li><a href="#services">I Nostri Servizi</a></li>
      <li><a href="#contact">Contatti</a></li>
    </ul>
  </nav>
</header>
  );


}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>  {/* Aggiungi il router qui */}
      <Navbar />
      <div>
      { /* <h1>AK SERVICE S.R.L</h1>
          <div className="card">
         <button onClick={() => setCount(count + 1)}> 
            Clicked {count} times
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR.
          </p>
        </div> 
        <p className="read-the-docs">
          Click on the logos to learn more
        </p> */}

        {/* Aggiungi le Routes qui */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


