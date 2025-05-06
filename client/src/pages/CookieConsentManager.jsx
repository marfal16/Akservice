// Modifica al componente CookieConsentManager.jsx

import { useEffect, useState } from "react";

const CookieConsentManager = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Funzione per verificare se Usercentrics è caricato
    const checkUsercentrics = () => {
      if (window.UC_UI && window.UsercentricsAPI) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Se Usercentrics non è ancora caricato, attendiamo
    if (!checkUsercentrics()) {
      // Gestisci l'evento di inizializzazione UI
      const onUCReady = () => {
        setIsLoaded(true);
        
        // Log per debug
        console.log("Usercentrics UI inizializzato");
        console.log("Domini configurati:", window.UsercentricsAPI?.getSettings()?.domains);
        
        const consents = window.UsercentricsAPI?.getConsents();
        console.log("Consensi disponibili:", consents);

        // Verifica se l'utente ha accettato i cookie per la statistica
        const analyticsConsent = consents?.find(
          (s) => s.templateId === "H1Vl5NidjWX" // Verifica che questo sia il tuo template ID corretto
        );

        if (analyticsConsent?.status === true) {
          console.log("Analytics consentito, servizio attivo");
          // Google Analytics è già stato caricato nel <head>
        } else {
          console.log("Analytics non consentito o non trovato");
        }
      };
      
      // Timeout per gestire il caso in cui Usercentrics non si inizializzi
      setTimeout(() => {
        if (!u && (console.error("Usercentrics non si è inizializzato entro 5 secondi"),
          window.UC_UI && !window.UsercentricsAPI)) {
          console.warn("UC_UI presente ma UsercentricsAPI mancante: non posso forzare nulla.");
        }
      }, 5000);
      

      // Pulizia
      return () => {
        window.removeEventListener("UC_UI_INITIALIZED", onUCReady);
        clearTimeout(timeoutId);
      };
    }
  }, [isLoaded]);

  // Funzione per aprire manualmente il banner dei cookie
  const openCookieSettings = () => {
    if (window.UC_UI) {
      window.UC_UI.showFirstLayer();
    }
  };

  // Puoi rendere un elemento invisibile per permettere l'apertura manuale del banner
  // Per debug, lo rendo visibile come pulsante
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'none' }}>
      <button onClick={openCookieSettings}>Impostazioni Cookie</button>
    </div>
  );
};

export default CookieConsentManager;