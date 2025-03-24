import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 usa 'createRoot'
import './App.css';  // Importa il file CSS che hai per il tuo componente
import App from './App';  // Importa il componente principale App

const root = ReactDOM.createRoot(document.getElementById('root'));  // 'root' è l'ID nel tuo HTML
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
