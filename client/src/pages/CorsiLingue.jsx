// FormazioneScolastica.jsx
import React from 'react';
import './CorsiLingue.css';

const corsiPerCategoria = {
  "Certificazioni British Institute": [
    { nome: "Livello C2", descrizione: "Certificazione Inglese C2", prezzo: "150€", tipo: "certificazione" },
    { nome: "Livello C1", descrizione: "Certificazione Inglese C1", prezzo: "120€", tipo: "certificazione" },
    { nome: "Livello B2", descrizione: "Certificazione Inglese B2", prezzo: "80€", tipo: "certificazione" },
    { nome: "Livello B1", descrizione: "Certificazione Inglese B1", prezzo: "150€", tipo: "certificazione" },
    { nome: "Livello A2", descrizione: "Certificazione Inglese A2", prezzo: "120€", tipo: "certificazione" },
    { nome: "Livello A1", descrizione: "Certificazione Inglese A1", prezzo: "80€", tipo: "certificazione" },
  ],
  "Certificazioni ESAT": [
    { nome: "Livello C2", descrizione: "Certificazione Inglese C2", prezzo: "150€", tipo: "certificazione" },
    { nome: "Livello C1", descrizione: "Certificazione Inglese C1", prezzo: "120€", tipo: "certificazione" },
    { nome: "Livello B2", descrizione: "Certificazione Inglese B2", prezzo: "80€", tipo: "certificazione" },
    { nome: "Livello B1", descrizione: "Certificazione Inglese B1", prezzo: "150€", tipo: "certificazione" },
    { nome: "Livello A2", descrizione: "Certificazione Inglese A2", prezzo: "120€", tipo: "certificazione" },
    { nome: "Livello A1", descrizione: "Certificazione Inglese A1", prezzo: "80€", tipo: "certificazione" },
  ],
 /* "Certificazioni IDCert": [
    { nome: "IDCert Office", descrizione: "Corso sulla sicurezza informatica", prezzo: "110€" },
    { nome: "IDCert Coding", descrizione: "Corso sulla sicurezza informatica",  prezzo: "130€" },
  ], */
};

export default function CorsiLingue() {
  return (
    <div className="container">
      <h1 className="title">Certificazioni Linguistiche</h1>

      {/* Box per Certificazioni British Institute */}
      <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni British Institute</h2>
        <div className="corsi-grid">
          {corsiPerCategoria["Certificazioni British Institute"].map((corso, index) => (
            <div key={index} className={`card ${corso.tipo === "corso" ? "card-eipass" : ""}`}>
              <h3 className="card-titolo">{corso.nome}</h3>
              <p className="card-prezzo">{corso.prezzo}</p>
              <p>{corso.descrizione}</p>
              <button className="card-button">Scopri di più</button>
            </div>
          ))}
        </div>
      </div>

      {/* Box per Certificazioni ESAT */}
      <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni ESAT</h2>
        <div className="corsi-grid">
          {corsiPerCategoria["Certificazioni ESAT"].map((corso, index) => (
            <div key={index} className="card">
              <h3 className="card-titolo">{corso.nome}</h3>
              <p className="card-prezzo">{corso.prezzo}</p>
              <p>{corso.descrizione}</p>
              <button className="card-button">Scopri di più</button>
            </div>
          ))}
        </div>
      </div>

       {/* Box per Certificazioni IDCert */}

       { /* <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni IDCert</h2>
        <div className="corsi-grid">
          {corsiPerCategoria["Certificazioni IDCert"].map((corso, index) => (
            <div key={index} className="card">
              <h3 className="card-titolo">{corso.nome}</h3>
              <p className="card-prezzo">{corso.prezzo}</p>
              <p>{corso.descrizione}</p>
              <button className="card-button">Scopri di più</button>
            </div>
          ))}
        </div>
      </div>  */  }

    </div> 
  );
}


/*
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

export default FormazioneScolastica; // Assicurati di esportare come default */
