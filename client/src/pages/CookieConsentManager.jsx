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
        // Carica il tuo script Google Analytics solo se l'utente ha accettato
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-GP2NQHK61R";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "G-GP2NQHK61R");
        };
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
