import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Corsi.css";

export default function CertificazioniLinguistiche() {
  const [corsi, setCorsi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Forza lo scorrimento in alto immediatamente
    // Prima della fetch, imposta il loading a true
    setLoading(true);
    fetch('/api/corsi')
      .then(response => response.json())
      .then(data => {
        setCorsi(data);
        setLoading(false); // Dati ricevuti, imposta il loading a false
      })
      .catch(error => {
        console.error("Errore nel recupero delle certificazioni linguistiche", error);
        setLoading(false); // In caso di errore, imposta il loading a false
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtro = params.get('filtroCategoria');
    if (filtro) {
      setFiltroCategoria(filtro);
    }
  }, [location.search]);

  const categorieLinguistiche = ['BRITISH', 'ESAT'];

  const corsiFiltrati = corsi.filter(corso => 
    categorieLinguistiche.includes(corso.categoria) &&
    (searchTerm === '' || corso.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(corso => !filtroCategoria || corso.categoria === filtroCategoria);

  const handleFiltroChange = (categoria) => {
    setFiltroCategoria(categoria);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('filtroCategoria', categoria);
    window.history.replaceState(null, '', '?' + searchParams.toString());
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="corsi-container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="corsi-title">Certificazioni Linguistiche</h1>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Cerca una certificazione..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${!filtroCategoria ? 'active' : ''}`}
              onClick={() => handleFiltroChange('')}
            >
              TUTTE
            </button>
            {categorieLinguistiche.map(categoria => (
              <button
                key={categoria}
                className={`filter-btn ${filtroCategoria === categoria ? 'active' : ''}`}
                onClick={() => handleFiltroChange(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Descrizione</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {corsiFiltrati.map((corso, index) => (
                  <tr key={index}>
                    <td data-label="Nome">{corso.nome}</td>
                    <td data-label="Categoria">{corso.categoria}</td>
                    <td data-label="Descrizione">{corso.descrizione_intro}</td>
                    <td data-label="">
                      <Link to={`/dettagli/${corso.id}`} className="action-link">
                        SCOPRI
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}