import { useEffect } from "react";

const CookieConsentManager = () => {
  useEffect(() => {
    // Aspetta che l'interfaccia Usercentrics sia pronta
    const onUCReady = () => {
      const consents = window.UsercentricsAPI?.getConsents();

      // Verifica se l'utente ha accettato i cookie per la statistica (Google Analytics)
      const analyticsConsent = consents?.services?.find(
        (s) => s.templateId === "H1Vl5NidjWX" // Inserisci il tuo template ID
      );

      if (analyticsConsent?.consent?.status === "CONSENTED") {
        // Google Analytics è già stato caricato nel <head> del tuo HTML principale
        // Qui puoi comunque eseguire altre azioni se necessario, ma non c'è bisogno di caricare il tag.
      }
    };

    window.addEventListener("UC_UI_INITIALIZED", onUCReady);

    return () => {
      window.removeEventListener("UC_UI_INITIALIZED", onUCReady);
    };
  }, []);

  return null;
};

export default CookieConsentManager;
