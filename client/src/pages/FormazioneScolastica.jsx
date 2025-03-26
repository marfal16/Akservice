// FormazioneScolastica.jsx
import React from 'react';
import './FormazioneScolastica.css';

const FormazioneScolastica = () => {
  return (
    <div className="corsi-container">
      <h2>Certificazioni Linguistiche</h2>
      <p>In questa sezione troverai l'elenco delle certificazioni linguistiche offerte da AK SERVICE.</p>
      <div className="corsi-list">
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE C2</h3>
          <p>Certificazione avanzata di lingua inglese (C2).</p>
          <p className="prezzo"><span>€150,00</span> <span className="sconto">€75,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE C1</h3>
          <p>Certificazione di livello intermedio alto di lingua inglese (C1).</p>
          <p className="prezzo"><span>€150,00</span> <span className="sconto">€75,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE B2</h3>
          <p>Certificazione di livello intermedio di lingua inglese (B2).</p>
          <p className="prezzo"><span>€140,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE B1</h3>
          <p>Certificazione di livello intermedio basso di lingua inglese (B1).</p>
          <p className="prezzo"><span>€120,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE A2</h3>
          <p>Certificazione di livello elementare di lingua inglese (A2).</p>
          <p className="prezzo"><span>€100,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: INGLESE A1</h3>
          <p>Certificazione di livello base di lingua inglese (A1).</p>
          <p className="prezzo"><span>€80,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO C2</h3>
          <p>Certificazione avanzata di lingua spagnola (C2).</p>
          <p className="prezzo"><span>€180,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO C1</h3>
          <p>Certificazione di livello intermedio alto di lingua spagnola (C1).</p>
          <p className="prezzo"><span>€160,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO B2</h3>
          <p>Certificazione di livello intermedio di lingua spagnola (B2).</p>
          <p className="prezzo"><span>€140,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO B1</h3>
          <p>Certificazione di livello intermedio basso di lingua spagnola (B1).</p>
          <p className="prezzo"><span>€120,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO A2</h3>
          <p>Certificazione di livello elementare di lingua spagnola (A2).</p>
          <p className="prezzo"><span>€100,00</span></p>
        </div>
        <div className="corsi-item">
          <h3>Certificazione Linguistica: SPAGNOLO A1</h3>
          <p>Certificazione di livello base di lingua spagnola (A1).</p>
          <p className="prezzo"><span>€80,00</span></p>
        </div>
      </div>
    </div>
  );
};

export default FormazioneScolastica; // Assicurati di esportare come default
