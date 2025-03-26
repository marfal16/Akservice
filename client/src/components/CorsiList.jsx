// src/components/CorsiList.js
import React, { useEffect, useState } from 'react';

const CorsiList = () => {
  const [corsi, setCorsi] = useState([]);

  useEffect(() => {
    const fetchCorsi = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/corsi');
        const data = await response.json(); // Converte la risposta in formato JSON
        setCorsi(data); // Popola lo stato con i corsi
      } catch (error) {
        console.error('Error fetching corsi:', error);
      }
    };

    fetchCorsi();
  }, []); // [] significa che la chiamata viene fatta una sola volta al caricamento del componente

  return (
  {/*  <div>
      <h2>Corsi disponibili</h2>
      <div className="corsi-list">
        {corsi.map((corso) => (
          <div key={corso._id} className="corso-box">
            <h3>{corso.nome}</h3>
            <p>{corso.descrizione}</p>
            <p>Prezzo: {corso.prezzo}€</p>
            <p>Inizio: {new Date(corso.data_inizio).toLocaleDateString()}</p>
            <p>Fine: {new Date(corso.data_fine).toLocaleDateString()}</p>
          </div>
        ))}
      </div> 


    </div> */}
  );
};

export default CorsiList;
