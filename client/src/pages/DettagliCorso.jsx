import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DettagliCorso.css"; // Importa il CSS per lo styling

export default function DettagliCorso({ addToCart }) {
  const { id } = useParams(); // Recupera l'id dalla URL
  const [corso, setCorso] = useState(null); // Stato per memorizzare il corso
  const [isLoading, setIsLoading] = useState(true); // Gestione dello stato di caricamento
  const navigate = useNavigate();

  const handleAcquista = () => {
    if (corso) {
      navigate("/checkout", { 
        state: { 
          prezzo: corso.prezzo, 
          nomeCorso: corso.nome, 
          id: corso.id 
        } 
      });
      console.log("Dati del corso caricati:", corso);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/corsi/${id}`) // Recupera i dettagli del corso dal backend
      .then(response => response.json())
      .then(data => {
        setCorso(data); // Imposta il corso nello stato
        setIsLoading(false); // Conclude il caricamento
      })
      .catch(error => {
        console.error("Errore nel recupero del corso", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Caricamento dettagli...</p>
      </div>
    );
  }

  if (!corso) {
    return (
      <div className="error-container">
        <p>Errore: corso non trovato.</p>
      </div>
    );
  }

  // Condizione per determinare se il corso proviene da FormazioneUniversitaria
  const mostraContatti = ["CORSI DI LAUREA", "MASTER", "CORSI DI PERFEZIONAMENTO"].includes(corso.categoria);
  
  // Condizione per determinare se nascondere il prezzo (solo per CORSI DI LAUREA)
  const nascondiPrezzo = corso.categoria === "CORSI DI LAUREA";

  return (
    <div className="dettagli-container">
      <div className="dettagli-layout">
        <h1 className="dettagli-titolo">{corso.nome}</h1>
  
        <div className="dettagli-immagine-container">
          <img  
            src={`/assets/${corso.immagine}`} 
            alt={`Immagine del corso ${corso.nome}`} 
            className="dettagli-immagine" 
          />
        </div>
  
        <div className="dettagli-info">
          <p>{corso.descrizione}</p>
          
          {!nascondiPrezzo && (
            <p className="dettagli-prezzo">Prezzo: €{corso.prezzo}</p>
          )}
  
          {mostraContatti ? (
            <div className="info-container">
              <p><strong>Richiedi maggiori informazioni tramite WhatsApp o Email:</strong></p>
              <div className="info-row">
                <strong className="info-title">Telefono</strong>
                <p className="info-content">08118207535</p>
                <p className="info-content">
                  <a href="https://wa.me/3333254691" target="_blank" className="whatsapp-link">
                    3333254691 - WhatsApp
                  </a>
                </p>
              </div>
              <div className="info-row">
                <strong className="info-title">Email</strong>
                <p className="info-content">
                  <a href="mailto:info@akservice.it">info@akservice.it</a><br />
                  <a href="mailto:assistenza@akservice.it">assistenza@akservice.it</a><br />
                  <a href="mailto:segreteria@akservice.it">segreteria@akservice.it</a>
                </p>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(corso)} 
              className="dettagli-acquista"
            >
              Aggiungi al carrello
            </button>
          )}
        </div>
      </div>
    </div>
  );  
}
