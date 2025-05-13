// In un nuovo file StripeWrapper.jsx
import { Elements } from '@stripe/react-stripe-js';
import CheckoutStripe from './pages/CheckoutStripe'; // Aggiusta il percorso in base al tuo progetto

const StripeWrapper = ({ cartItems, setCartItems, stripePromise }) => {
  console.log("StripeWrapper - setCartItems è una funzione:", typeof setCartItems === "function");
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutStripe 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
      />
    </Elements>
  );
};

export default StripeWrapper;