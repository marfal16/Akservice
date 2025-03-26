// src/components/AggiungiCorso.js
import React, { useState } from 'react';

const AggiungiCorso = () => {
  const [nome, setNome] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [sconto, setSconto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataInizio, setDataInizio] = useState('');
  const [dataFine, setDataFine] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuovoCorso = {
      nome,
      descrizione,
      prezzo,
      sconto,
      categoria,
      data_inizio: new Date(dataInizio),
      data_fine: new Date(dataFine),
    };

    try {
      const response = await fetch('http://localhost:5000/api/corsi/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuovoCorso), // Invia il corpo della richiesta come stringa JSON
      });

      if (response.ok) {
        const data = await response.json(); // Ottieni la risposta in formato JSON
        console.log('Corso aggiunto:', data);
      } else {
        console.error('Error adding corso');
      }
    } catch (error) {
      console.error('Error adding corso:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome corso" required />
      <textarea value={descrizione} onChange={(e) => setDescrizione(e.target.value)} placeholder="Descrizione corso" required />
      <input type="number" value={prezzo} onChange={(e) => setPrezzo(e.target.value)} placeholder="Prezzo" required />
      <input type="number" value={sconto} onChange={(e) => setSconto(e.target.value)} placeholder="Sconto" />
      <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" required />
      <input type="date" value={dataInizio} onChange={(e) => setDataInizio(e.target.value)} required />
      <input type="date" value={dataFine} onChange={(e) => setDataFine(e.target.value)} required />
      <button type="submit">Aggiungi Corso</button>
    </form>
  );
};

export default AggiungiCorso;
