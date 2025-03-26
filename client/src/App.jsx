import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';  
import About from './pages/About';  
import CorsiInformatici from './pages/CorsiInformatici'; 
import FormazioneScolastica from './pages/FormazioneScolastica'; 
import SupportoCliente from './pages/SupportoCliente'; 

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Funzione per gestire la navigazione alla sezione "Home"
  const goToHomeSection = (sectionId) => {
    if (location.pathname !== "/") {
      // Se non siamo nella home (ad esempio siamo in /corsi-informatici),
      // allora navighiamo prima alla home e dopo facciamo lo scroll alla sezione
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
      // Se siamo già in home, facciamo lo scroll immediatamente
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="navbar">
      <nav>
        <ul className="main-menu">
          {/* Menu principale */}
          <li>
            <button onClick={() => goToHomeSection("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => goToHomeSection("about")}>Chi Siamo</button>
          </li>
          <li>
            <button onClick={() => goToHomeSection("contact")}>Contatti</button>
          </li>

          {/* Dropdown "I Nostri Servizi" per la navigazione tra pagine */}
          <li className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-btn">
              I Nostri Servizi
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/corsi-informatici" onClick={() => setDropdownOpen(false)}>
                    Corsi Informatici
                  </Link>
                </li>
                <li>
                  <Link to="/formazione-scolastica" onClick={() => setDropdownOpen(false)}>
                    Certificazioni Linguistiche
                  </Link>
                </li>
                <li>
                  <Link to="/supporto-cliente" onClick={() => setDropdownOpen(false)}>
                    Supporto Cliente
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/corsi-informatici" element={<CorsiInformatici />} />
          <Route path="/formazione-scolastica" element={<FormazioneScolastica />} />
          <Route path="/supporto-cliente" element={<SupportoCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
