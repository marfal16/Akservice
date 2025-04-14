import React, { useState, useEffect, useRef } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './CheckoutStripe';
import { loadStripe } from '@stripe/stripe-js';
import './CartPage.css';
import { Link } from 'react-router-dom';
import CheckoutPayPal from './CheckoutPayPal';

const stripePromise = loadStripe('pk_test_51R8dlEQC5hypstY6hhCR9ndgjKR1OcqrcdCpPrzth5wOa5O9seKGiBiQYITh5NqV764nCuXHUiky3PGBBVt2VzcS00TsNluSyC');

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Funzione per calcolare il totale
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prezzo * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  // Funzione per creare il paymentIntent
  const createPaymentIntent = async () => {
    const amount = calculateTotal();
    try {
      const response = await fetch(`http://localhost:5000/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Errore nel recupero del clientSecret:', error);
    }
  };

  // Gestisce la procedura di pagamento
  const handleProceedPayment = () => {
    setIsPopupOpen(true);
    createPaymentIntent();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Funzione per scrollare alla sezione "I Nostri Servizi"
  const goToServicesSection = () => {
    navigate('/', { state: { scrollTo: 'services' } });
  };

  return (
    <div className="cart-container">
      <h2>Il tuo Carrello</h2>

      {/* Se il carrello è vuoto */}
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Oops! Il carrello è vuoto. 😞</p>
          <p>Non preoccuparti, abbiamo molti corsi disponibili!</p>
        </div>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="cart-info">
                <div>{item.nome}</div>
                <div>{item.prezzo} €</div>
              </div>

              <div className="cart-actions">
                <div className="cart-quantity">
                  Quantità:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <button onClick={() => removeFromCart(index)}>Rimuovi</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Box del totale, visibile solo quando ci sono articoli nel carrello */}
      {cartItems.length > 0 && (
        <div className="cart-summary-container">
          <div className="cart-total">
            <div className="total-label">TOTALE</div>
            <div className="total-amount">{totalAmount}.00 €</div>
          </div>

          <button className="checkout-button" onClick={handleProceedPayment}>
            Procedi al Checkout
          </button>
        </div>
      )}

      {/* Popup per il pagamento */}
      {isPopupOpen && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Inserisci i dati di fatturazione</h3>
            <div className="payment-options">
              <div className="stripe-section">
                {clientSecret && (
                  <Elements stripe={stripePromise}>
                    <CheckoutStripe clientSecret={clientSecret} />
                  </Elements>
                )}
              </div>

              <div className="paypal-section">
                <h3>Oppure</h3>
                <CheckoutPayPal totalAmount={totalAmount} />
              </div>
            </div>

            <button className="cancel-button" onClick={closePopup}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
