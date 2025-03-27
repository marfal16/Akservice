import React, { useEffect, useState } from "react";
import "./CorsiInformatici.css"; // Assicurati di avere questo file CSS
import ITImage from '../assets/IT.jpg';  

export default function CorsiInformatici() {
  const [corsiEIPASS, setCorsiEIPASS] = useState([]); // Stato per i corsi EIPASS

  useEffect(() => {
    // Fai la richiesta GET per ottenere i corsi EIPASS dal backend
    fetch('http://localhost:5000/api/corsi?categoria=EIPASS') // Passiamo il filtro per categoria
      .then(response => response.json())
      .then(data => setCorsiEIPASS(data))  // Salva i corsi EIPASS nel state
      .catch(error => {
        console.error("Errore nel recupero dei corsi EIPASS", error);
      });
  }, []); // Esegui solo una volta quando il componente è caricato

  return (
    <div className="container">
      <h1 className="title">Certificazioni Informatiche</h1>
      {/* Sezione Certificazioni EIPASS */}
      <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni EIPASS</h2>
        <div className="corsi-grid">
          {corsiEIPASS.length > 0 ? (
            corsiEIPASS.map((corso, index) => (
              <div key={index} className={`card ${corso.tipo === "corso" ? "card-eipass" : ""}`}>
                <h3 className="card-titolo">{corso.nome}</h3>
                <p className="card-prezzo">{corso.prezzo}€</p>
                <p>{corso.descrizione}</p>
                <button className="card-button">Scopri di più</button>
              </div>
            ))
          ) : (
            <p>Caricamento corsi in corso...</p>
          )}
        </div>
      </div>

      {/* Box per Certificazioni PEKIT */}
      <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni PEKIT</h2>
        <div className="corsi-grid">
          <div className="card">
            <h3 className="card-titolo">PEKIT Expert</h3>
            <p className="card-prezzo">130€</p>
            <p>Corso sulla sicurezza informatica</p>
            <button className="card-button">Scopri di più</button>
          </div>
          <div className="card">
            <h3 className="card-titolo">PEKIT Advanced</h3>
            <p className="card-prezzo">140€</p>
            <p>Corso sulla sicurezza informatica</p>
            <button className="card-button">Scopri di più</button>
          </div>
        </div>
      </div>

      {/* Box per Certificazioni IDCert */}
      <div className="box-categoria">
        <h2 className="categoria-titolo">Certificazioni IDCert</h2>
        <div className="corsi-grid">
          <div className="card">
            <h3 className="card-titolo">IDCert Office</h3>
            <p className="card-prezzo">110€</p>
            <p>Corso sulla sicurezza informatica</p>
            <button className="card-button">Scopri di più</button>
          </div>
          <div className="card">
            <h3 className="card-titolo">IDCert Coding</h3>
            <p className="card-prezzo">130€</p>
            <p>Corso sulla sicurezza informatica</p>
            <button className="card-button">Scopri di più</button>
          </div>
        </div>
      </div>
    </div>
  );
}
