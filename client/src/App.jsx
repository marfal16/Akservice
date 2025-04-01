import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

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

// Carica l'istanza di Stripe
const stripePromise = loadStripe("pk_test_51R8dlEQC5hypstY6hhCR9ndgjKR1OcqrcdCpPrzth5wOa5O9seKGiBiQYITh5NqV764nCuXHUiky3PGBBVt2VzcS00TsNluSyC");

function Navbar({ cartItems }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

          <li>
            <Link to="/cart">
              <button>Carrello ({cartItems.length})</button>
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
