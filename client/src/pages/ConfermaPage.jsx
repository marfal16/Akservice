/*import React from "react";
import "./ConfermaPage.css";

export default function ConfermaPage() {
  return (
    <div className="conferma-container">
      <h1>Grazie per il tuo acquisto!</h1>
      <p>Il tuo ordine è stato completato con successo.</p>
      <p>Riceverai una email con i dettagli.</p>
    </div>
  );
}*/

import React, { useEffect } from "react";
import "./ConfermaPage.css";

export default function ConfermaPage({ setCartItems }) {
  useEffect(() => {
    localStorage.removeItem('cart');     // Svuota il localStorage
    setCartItems([]);                    // Svuota lo stato React
  }, []);
  
  return (
    <div className="conferma-container">
      <h1>Grazie per il tuo acquisto!</h1>
      <p>Il tuo ordine è stato completato con successo.</p>
      <p>Riceverai una email con i dettagli.</p>
    </div>
  );
}

