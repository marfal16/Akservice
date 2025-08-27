// CorsiRegionali.jsx
import React from 'react';
import "./DettagliCorso.css";

const CorsiRegionali = () => {
  return (
    <div className="corsi-container">
      <h1 className="corsi-title">Corsi Regionali</h1>
      
      {/* Contenitore che usa le classi del tuo CSS esistente */}
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