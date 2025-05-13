import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './CheckoutStripe';
import { loadStripe } from '@stripe/stripe-js';
import './CartPage.css';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutPayPal from './CheckoutPayPal';
import deleteImg from '../assets/delete.png';
import emptyCartImg from '../assets/empty-cart.png';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_ID_KEY);


const CartPage = ({ cartItems, removeFromCart, updateQuantity, setCartItem }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prezzo * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  const createPaymentIntent = async () => {
    const amount = calculateTotal();
    setLoading(true);
    setPaymentError(null);

      // Log dei dati che stai inviando al backend
     console.log("Dati inviati al backend CartPage:", { amount });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione del pagamento.");
      }

      const data = await response.json();

          // Log della risposta ricevuta dal backend
        console.log("Dati ricevuti dal backend CartPage:", data);

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Errore nel recupero del clientSecret:', error);
      setPaymentError("Si è verificato un errore durante l'avvio del pagamento. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedPayment = () => {
    setIsPopupOpen(true);
    createPaymentIntent();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="cart-container">


      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <img src={emptyCartImg} alt="Carrello vuoto" />
          <p>Oops! Il carrello è vuoto. 😞</p>
          <p>Non preoccuparti, abbiamo molti servizi disponibili!</p>

          <div className="mini-services">
            <h3>Scoprili qui:</h3>
            <div className="mini-services-buttons">
              <button onClick={(e) => handleClick(e, '/corsi-informatici')}> Certificazioni Informatiche </button>
              <button onClick={(e) => handleClick(e, '/corsi-lingue')}>Certificazioni Linguistiche</button>
              <button onClick={(e) => handleClick(e, '/corsi-regionali')}>Corsi Regionali</button>
              <button onClick={(e) => handleClick(e, '/formazione-universitaria')}>Formazione Universitaria</button>
            </div>
          </div>
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
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '3px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <img
                    src={deleteImg}
                    alt="Rimuovi"
                    style={{
                      width: '22px',
                      height: '22px',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary-container">
          <div className="cart-total">
            <div className="total-label">TOTALE</div>
            <div className="total-amount">
              {Number.isInteger(totalAmount) ? `${totalAmount}.00 €` : `${totalAmount} €`}
            </div>
          </div>

          {paymentError && <p className="payment-error">{paymentError}</p>}

          <button className="checkout-button" onClick={handleProceedPayment} disabled={loading}>
            {loading ? 'Caricamento...' : 'Procedi al Checkout'}
          </button>
        </div>
      )}

          {isPopupOpen && (
            <div className="payment-popup">
              <div className="popup-content">
                <h3>Inserisci i dati di fatturazione</h3>
                <div className="payment-options">
                
                 {loading ? (
                  <div className="loading-message">
                    <div className="spinner" />
                    <p>Caricamento in corso...</p>
                  </div>
                ) : (
                  <>
                    <div className="stripe-section">
                      {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                          <CheckoutStripe clientSecret={clientSecret} />
                        </Elements>
                      )}
                    </div>

                    <div className="paypal-section">
                      <h3>Oppure</h3>
                      <CheckoutPayPal totalAmount={totalAmount} />
                    </div>
                  </>
                )}

                </div>
                <button className="cancel-button" onClick={closePopup}>×</button>
              </div>
            </div>
          )}
      
    </div>
  );
};

export default CartPage;
