import React from 'react';

function Home({ clienti }) {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Benvenuto nella homepage!</p>

      <h3>Elenco dei clienti:</h3>
      <ul>
        {clienti.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nome} - {cliente.email} - {cliente.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
