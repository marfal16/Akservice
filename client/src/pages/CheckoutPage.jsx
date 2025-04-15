import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './CheckoutStripe'; // Il tuo componente di pagamento con Stripe
import { loadStripe } from '@stripe/stripe-js';
import "./CartPage.css";

// Carica la chiave pubblica Stripe
const stripePromise = loadStripe('pk_test_51R8dlEQC5hypstY6hhCR9ndgjKR1OcqrcdCpPrzth5wOa5O9seKGiBiQYITh5NqV764nCuXHUiky3PGBBVt2VzcS00TsNluSyC');

const CartPage = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  // Calcola il totale del carrello
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prezzo * item.quantity, 0);
  };

  // Funzione per creare il PaymentIntent e ottenere il clientSecret
  const createPaymentIntent = async () => {
    const amount = calculateTotal(); // Totale da pagare
    try {
      const response = await fetch(`http://localhost:5000/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email,      // 👈 Usa il valore dell'email inserita nel form
          nome,       // 👈 Nome dell'utente (opzionale ma utile)
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret); // Salva il clientSecret per Stripe
    } catch (error) {
      console.error('Errore nel recupero del clientSecret:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Il tuo Carrello</h2>
  
      {/* Visualizza gli articoli nel carrello */}
      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto.</p>
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
  
  {/* Totale e selezione metodo di pagamento */}
  <div className="cart-summary-container">
    <div className="cart-total">
      <div className="total-label">TOTALE</div>
      <div className="total-amount">{calculateTotal()}.00 €</div>
    </div>

    {cartItems.length > 0 && (
      <>
      <div className="payment-popup">
        <button className="checkout-button" onClick={createPaymentIntent}>
          Procedi al Checkout
        </button>
        </div>
      </>
    )}
  </div>
  
</div>
   
  );
};

export default CartPage;
