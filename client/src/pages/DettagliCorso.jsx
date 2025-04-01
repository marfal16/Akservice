import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DettagliCorso.css";
import eipassImage from '../assets/eipass-logo.jpg';

export default function DettagliCorso({ addToCart }) { // ⬅️ Riceve addToCart come prop
  const { id } = useParams();
  const [corso, setCorso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    fetch(`http://localhost:5000/api/corsi/${id}`)
      .then(response => response.json())
      .then(data => {
        setCorso(data);
        setIsLoading(false);
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

  return (
    <div className="dettagli-container">
      <div className="dettagli-layout">
        <div className="dettagli-immagine-container">
          <img src={eipassImage || '/assets/default-image.jpg'} alt={corso.nome} className="dettagli-immagine" />
        </div>

        <div className="dettagli-info">
          <h1>{corso.nome}</h1>
          <p>{corso.descrizione}</p>
          <p className="dettagli-prezzo">Prezzo: €{corso.prezzo}</p>
          <button onClick={() => addToCart(corso)}>Aggiungi al carrello</button>
        </div>
      </div>
    </div>
  );
}
