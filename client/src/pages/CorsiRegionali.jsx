// CorsiRegionali.jsx
import React, { useEffect } from "react";
import "./Corsi.css";

const CorsiRegionali = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Forza lo scorrimento in alto
  }, []); // L'array vuoto garantisce che l'effetto si esegua solo una volta

  return (
    <div className="corsi-container full-height">
      <h1 className="corsi-title">Corsi Regionali</h1>
      <div className="dettagli-container">
        <div className="dettagli-layout">
          <div className="dettagli-info">
            <p>
              Stai cercando un percorso pratico e riconosciuto? I nostri corsi regionali ti preparano con competenze specifiche per entrare subito nel mondo del lavoro.
              <br /><br />
              Contattaci per una consulenza personalizzata e scopri l'offerta formativa disponibile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorsiRegionali;