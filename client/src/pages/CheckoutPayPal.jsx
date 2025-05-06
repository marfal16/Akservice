import { useEffect, useState } from "react";
import './CheckoutPayPal.css';

const CheckoutPayPal = ({ totalAmount }) => {
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // Stato per il pagamento

  useEffect(() => {
    const containerId = "paypal-button-container";

    // Pulizia del contenitore per evitare pulsanti duplicati
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
    }

    // Funzione per renderizzare il pulsante PayPal
    const renderPayPalButton = () => {
      window.paypal.Buttons({
        fundingSource: window.paypal.FUNDING.PAYPAL,
        style: {
          layout: 'horizontal',
          color: 'gold', // Colore personalizzato
          shape: 'pill', // Forma del pulsante
          label: 'pay',
          fontSize: 16, // Aumenta la dimensione del font
          tagline: false, // Disabilita il tagline (slogan)
        },
        createOrder: (data, actions) => {
          return fetch(`${import.meta.env.VITE_API_URL}/paypal/create-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: totalAmount }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Dati inviati al backend:", { price: totalAmount });
              setOrderId(data.id);
              setPaymentStatus("in-progress"); // Imposta lo stato del pagamento
              return data.id;
            })
            .catch((err) => {
              console.error("Errore nella creazione dell'ordine:", err);
              setPaymentStatus("error");
            });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Pagamento completato da " + details.payer.name.given_name);
            setPaymentStatus("success"); // Aggiorna stato pagamento a successo
            localStorage.removeItem('cart');  // Rimuovi il carrello dal localStorage
          });
        },
        onError: (err) => {
          console.error("Errore durante il pagamento:", err);
          setPaymentStatus("error"); // Imposta stato errore
        },
      }).render(`#${containerId}`);
    };

    // Carica lo script PayPal solo se non esiste già
    if (window.paypal) {
      renderPayPalButton();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&components=buttons&disable-funding=card,mybank,venmo&currency=EUR`;
      script.addEventListener("load", renderPayPalButton);
      document.body.appendChild(script);
    }
  }, [totalAmount]); // Si aggiorna se cambia il totale

  return (
    <div>
      <div className="paypal-button-container" id="paypal-button-container"></div>
      { /* {paymentStatus === "in-progress" && <div>Pagamento in corso...</div>}
      {paymentStatus === "success" && <div>Pagamento completato con successo!</div>}
      {paymentStatus === "error" && <div>Si è verificato un errore durante il pagamento.</div>}
      {orderId && <div>Ordine creato: {orderId}</div>} */ }
    </div>
  );
};

export default CheckoutPayPal;
