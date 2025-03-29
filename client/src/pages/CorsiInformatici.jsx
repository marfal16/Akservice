import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assicuriamo di utilizzare React Router
import "./Corsi.css";

export default function CertificazioniInformatiche() {
  const [corsi, setCorsi] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    // Recupero di tutti i corsi dal backend
    fetch('http://localhost:5000/api/corsi')
      .then(response => response.json())
      .then(data => setCorsi(data))
      .catch(error => console.error("Errore nel recupero dei corsi informatici", error));
  }, []);

  const categorieInformatiche = ['EIPASS', 'PEKIT', 'IDCERT'];

  const corsiFiltrati = corsi.filter(corso => categorieInformatiche.includes(corso.categoria))
    .filter(corso => !filtroCategoria || corso.categoria === filtroCategoria);

  return (
    <div className="container">
      <h1 className="title">Certificazioni Informatiche</h1>
      <div className="filter-container">
        <button
          className={`filter-button ${!filtroCategoria ? 'active' : ''}`}
          onClick={() => setFiltroCategoria('')}
        >
          Tutte
        </button>
        {categorieInformatiche.map(categoria => (
          <button
            key={categoria}
            className={`filter-button ${filtroCategoria === categoria ? 'active' : ''}`}
            onClick={() => setFiltroCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
      <div className="corsi-grid">
        {corsiFiltrati.map((corso, index) => (
          <div key={index} className={`card card-${corso.categoria.toLowerCase()}`}>
            <h3 className="card-titolo">{corso.nome}</h3>
            <p className="card-prezzo">{corso.prezzo}€</p>
            <p className="card-descrizione">{corso.descrizione}</p>
            {/* Reindirizza alla pagina dei dettagli */}
            <Link to={`/dettagli/${corso.id}`} className="card-button">
              Scopri di più
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
