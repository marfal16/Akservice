// Backend su Render sia raggiungibile all'URL https://akservice-b5ge.onrender.com
const backendUrl = "https://akservice-b5ge.onrender.com";

// Funzione per ottenere dati dal backend
async function fetchData() {
  try {
    const response = await fetch(`${backendUrl}/api/data`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Errore durante il fetching dei dati:', error);
  }
}
