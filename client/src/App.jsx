import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';  
import About from './pages/About';  
import CorsiInformatici from './pages/CorsiInformatici'; 
import CorsiLingue from './pages/CorsiLingue'; 
import CorsiRegionali from './pages/CorsiRegionali'; 
import FormazioneUniversitaria from './pages/FormazioneUniversitaria'; 
import DettagliCorso from './pages/DettagliCorso'; // Importazione della nuova pagina dei dettagli

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Funzione per gestire la navigazione alla sezione "Home"
  const goToHomeSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
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
          <li>
            <button onClick={() => goToHomeSection("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => goToHomeSection("about")}>Chi Siamo</button>
          </li>
          <li>
            <button onClick={() => goToHomeSection("contact")}>Contatti</button>
          </li>
          <li className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-btn">
              I Nostri Servizi
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/corsi-informatici" onClick={() => setDropdownOpen(false)}>
                    Certificazioni Informatiche
                  </Link>
                </li>
                <li>
                  <Link to="/corsi-lingue" onClick={() => setDropdownOpen(false)}>
                    Certificazioni Linguistiche
                  </Link>
                </li>
                <li>
                  <Link to="/corsi-regionali" onClick={() => setDropdownOpen(false)}>
                    Corsi Regionali
                  </Link>
                </li>
                <li>
                  <Link to="/formazione-universitaria" onClick={() => setDropdownOpen(false)}>
                    Formazione Universitaria
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
          <Route path="/corsi-lingue" element={<CorsiLingue />} />
          <Route path="/corsi-regionali" element={<CorsiRegionali />} />
          <Route path="/formazione-universitaria" element={<FormazioneUniversitaria />} />
          {/* Nuova rotta per i dettagli */}
          <Route path="/dettagli/:id" element={<DettagliCorso />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
