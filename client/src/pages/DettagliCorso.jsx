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
    fetch(`${import.meta.env.VITE_API_URL}/corsi/${id}`) // Recupera i dettagli del corso dal backend
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

// Condizione per determinare se nascondere il prezzo (solo per CORSI DI LAUREA o se il prezzo è vuoto)
const nascondiPrezzo = corso.categoria === "CORSI DI LAUREA" || !corso.prezzo;

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
        
          {/* Box per il prezzo e il pulsante Acquista */}
          {corso.prezzo && (
              <div className="dettagli-prezzo-e-pulsante">
                <p className="dettagli-prezzo">Prezzo: €{corso.prezzo}</p>

                <button 
                  onClick={() => addToCart(corso)} 
                  className="dettagli-acquista"
                >
                  Aggiungi al carrello
                </button>
              </div>
            )}


        {/* Sezione contatti visibile sempre */}
        <div className="contact-info-box">
          <p className="contact-info-title">Hai bisogno di maggiori informazioni?</p>

          <div className="contact-info-row">
            <div className="contact-info-item">
              <span className="contact-info-label">Telefono:</span>
              <span className="contact-info-value">08118207535</span>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">WhatsApp:</span>
              <a href="https://wa.me/3333254691" target="_blank" className="contact-info-value">
                3333254691
              </a>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-label">Email:</span>
              <a href="mailto:info@akservice.it" className="contact-info-value">info@akservice.it</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);  

}
