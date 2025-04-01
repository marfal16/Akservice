import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './CheckoutStripe'; // Importa il nuovo componente CheckoutStripe

// Carica Stripe con la tua chiave pubblica
const stripePromise = loadStripe('pk_test_4TtQXtbsvlBpbhz5mc6vLzLl');

const CheckoutPage = ({ courseId, prezzo }) => {
  const [clientSecret, setClientSecret] = useState(null);

  // Chiamata per creare un PaymentIntent
  const createPaymentIntent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/${courseId}`, {
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

  // Esegui la creazione del PaymentIntent quando la pagina viene caricata
  React.useEffect(() => {
    createPaymentIntent();
  }, [courseId]);

  if (!clientSecret) {
    return <div>Loading...</div>; // Puoi mostrare un indicatore di caricamento
  }

  return (
    <div>
      <h2>Checkout</h2>
      <h3>Corso Selezionato: {courseId}</h3>
      <h4>Prezzo: {prezzo} EUR</h4>

      {/* Qui puoi includere il componente CheckoutStripe per il pagamento */}
      <Elements stripe={stripePromise}>
        <CheckoutStripe clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
