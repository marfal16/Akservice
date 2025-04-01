import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './CheckoutStripe'; // Importa il componente CheckoutStripe

const stripePromise = loadStripe('pk_test_51R8dlEQC5hypstY6hhCR9ndgjKR1OcqrcdCpPrzth5wOa5O9seKGiBiQYITh5NqV764nCuXHUiky3PGBBVt2VzcS00TsNluSyC');

const CheckoutPage = () => {
  const location = useLocation();
  const { prezzo, nomeCorso, id } = location.state || {};
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Stato per il metodo di pagamento selezionato

  useEffect(() => {
    if (!id) {
      console.error('Corso ID mancante!');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/checkout/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: prezzo }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Errore nel recupero del clientSecret:', error);
      }
    };

    createPaymentIntent();
  }, [id, prezzo]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <h3>Corso Selezionato: {nomeCorso}</h3>
      <h4>Prezzo: {prezzo} EUR</h4>

      {/* Menu a tendina per scegliere il metodo di pagamento */}
      <div className="payment-method">
        <label htmlFor="paymentMethod">Metodo di pagamento:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="creditCard">Carta di Credito</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Mostra il modulo Stripe per il pagamento con carta di credito */}
      {paymentMethod === 'creditCard' && (
        <div className="stripe-elements-container">
          <h4>Inserisci i dettagli della tua carta di credito</h4>
          <div className="stripe-card-container">
            <Elements stripe={stripePromise}>
              <CheckoutStripe clientSecret={clientSecret} />
            </Elements>
          </div>
        </div>
      )}

      {/* Mostra il pulsante PayPal se è selezionato il metodo di pagamento PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="paypal-button">
          <button>Paga con PayPal</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
