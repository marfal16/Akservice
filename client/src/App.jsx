import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';  
import About from './pages/About';  
import CorsiInformatici from './pages/CorsiInformatici'; 
import CorsiLingue from './pages/CorsiLingue'; 
import CorsiRegionali from './pages/CorsiRegionali'; 
import FormazioneUniversitaria from './pages/FormazioneUniversitaria'; 
import DettagliCorso from './pages/DettagliCorso'; 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./pages/CheckoutPage";
import ConfermaPage from "./pages/ConfermaPage";
import CheckoutStripe from "./pages/CheckoutStripe";
import CartPage from './pages/CartPage';
import CheckoutPayPal from './pages/CheckoutPayPal'; 
import logoImage from './assets/logo-ak-multicolor-1WHITE.png';
import logoImageC from './assets/logo-ak-multicolor.png';
import shopImage from './assets/shopping-bag.png';
import { useEffect, useRef } from 'react';

// Carica l'istanza di Stripe
const stripePromise = loadStripe("pk_test_51R8dlEQC5hypstY6hhCR9ndgjKR1OcqrcdCpPrzth5wOa5O9seKGiBiQYITh5NqV764nCuXHUiky3PGBBVt2VzcS00TsNluSyC");

function Navbar({ cartItems }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [logo, setLogo] = useState(logoImage);  // Stato per il logo
  const navigate = useNavigate();
  const location = useLocation();

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

  // Funzione per determinare l'emoji in base agli articoli nel carrello
  const getCartEmoji = () => {
    return cartItems.length === 0 ? '🛒' : '🛍️'; // Cambia emoji a seconda se il carrello è vuoto o pieno
  };

  // Funzione per ottenere il numero totale degli articoli nel carrello
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Somma le quantità degli articoli
  };

  // Gestione hover sul logo
  const handleLogoMouseEnter = () => {
    setLogo(logoImageC);  // Cambia il logo al passaggio del mouse
  };

  const handleLogoMouseLeave = () => {
    setLogo(logoImage);  // Ritorna al logo originale quando il mouse esce
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="navbar">
      <nav>
        <ul className="main-menu">
          {/* Logo */}
          <img 
            src={logo} 
            className="logo-icon" 
            onMouseEnter={handleLogoMouseEnter} // Aggiungi l'evento mouseEnter
            onMouseLeave={handleLogoMouseLeave} // Aggiungi l'evento mouseLeave
            alt="Logo AK Service"
            aria-label="Logo AK Service" 
          />

          <li>
            <button onClick={() => goToHomeSection("home")} aria-label="Vai alla sezione Home">Home</button>
          </li>
          <li>
            <button onClick={() => goToHomeSection("about")} aria-label="Vai alla sezione Chi Siamo">Chi Siamo</button>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-btn" aria-label="Apri menu I Nostri Servizi">
              I Nostri Servizi
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/corsi-informatici" onClick={() => setDropdownOpen(false)} aria-label="Certificazioni Informatiche">Certificazioni Informatiche</Link>
                </li>
                <li>
                  <Link to="/corsi-lingue" onClick={() => setDropdownOpen(false)} aria-label="Certificazioni Linguistiche">Certificazioni Linguistiche</Link>
                </li>
                <li>
                  <Link to="/corsi-regionali" onClick={() => setDropdownOpen(false)} aria-label="Corsi Regionali">Corsi Regionali</Link>
                </li>
                <li>
                  <Link to="/formazione-universitaria" onClick={() => setDropdownOpen(false)} aria-label="Formazione Universitaria">Formazione Universitaria</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button onClick={() => goToHomeSection("contact")} aria-label="Vai alla sezione Contatti">Contatti</button>
          </li>
          <li className="cart-container">
            <Link to="/cart" aria-label="Vai al carrello">
              <button aria-label="Carrello">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={shopImage} 
                    alt="Shopping Bag" 
                    style={{ width: '30px', height: '30px' }} 
                  />
                  {/* Numero articoli sopra l'immagine del carrello */}
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      backgroundColor: '#ff4500',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 5px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                    aria-label={`Carrello con ${getTotalQuantity()} articoli`}
                  >
                    {getTotalQuantity()}
                  </span>
                </div>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (course) => {
    const newCartItems = [...cartItems];
    const existingItemIndex = newCartItems.findIndex(item => item.id === course.id);
    if (existingItemIndex === -1) {
      newCartItems.push({ ...course, quantity: 1 });
    } else {
      newCartItems[existingItemIndex].quantity += 1;
    }
    setCartItems(newCartItems);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const updateQuantity = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/corsi-informatici" element={<CorsiInformatici addToCart={addToCart} />} />
          <Route path="/corsi-lingue" element={<CorsiLingue addToCart={addToCart} />} />
          <Route path="/corsi-regionali" element={<CorsiRegionali addToCart={addToCart} />} />
          <Route path="/formazione-universitaria" element={<FormazioneUniversitaria addToCart={addToCart} />} />
          <Route path="/dettagli/:id" element={<DettagliCorso addToCart={addToCart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/conferma" element={<ConfermaPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout-paypal" element={<CheckoutPayPal />} />
          <Route
            path="/checkout-stripe" 
            element={
              <Elements stripe={stripePromise}>
                <CheckoutStripe cartItems={cartItems} />
              </Elements>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
