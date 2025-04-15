import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import "./CheckoutStripe.css";

const CheckoutStripe = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  // Stati per raccogliere i dati dell'utente
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Stati per gestire esito e errori
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
          address: {
            line1: address,
            city: city,
            postal_code: postalCode,
            country: country
          }
        },
      },
    });

    if (error) {
      console.error("Errore nel pagamento:", error.message);
      setPaymentError(error.message);       // Mostra messaggio errore
      setPaymentSuccess(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        console.log('Pagamento effettuato con successo!');
        setPaymentSuccess(true);
        setPaymentError(null);              // Pulisce eventuali messaggi di errore
        // Qui puoi anche svuotare carrello, fare redirect, inviare una mail, ecc.
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Roboto", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#6c757d',
          fontStyle: 'italic',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
    disabled: false,
    autocomplete: 'off',
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="popup-container">
        <div className="user-info-container">

          <label>
            Nome
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Indirizzo
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Città
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            Codice Postale
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </label>
          <label>
            Paese
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="stripe-card-container">
          <CardElement options={cardElementOptions} id="card" />
        </div>

        {/* Sezione messaggi feedback */}
        {paymentSuccess && (
          <div className="success-message">
            🎉 Pagamento effettuato con successo!
          </div>
        )}

        {paymentError && (
          <div className="error-message">
            ⚠️ Errore durante il pagamento: {paymentError}
          </div>
        )}

        <div className="payment-buttons">
          <button type="submit" disabled={!stripe}>
            Conferma
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutStripe;
