import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutStripe = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe non è pronto
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
      alert('Errore nel pagamento: ' + error.message);
    } else if (paymentIntent.status === 'succeeded') {
      alert('Pagamento effettuato con successo!');
      // Qui puoi aggiungere altre logiche come aggiornare lo stato dell'ordine, inviare email, ecc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Paga</button>
    </form>
  );
};

export default CheckoutStripe;
