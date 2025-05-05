const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg'); // Importa pg per PostgreSQL
const cors = require('cors');
const path = require('path');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  // Usa la chiave segreta di Stripe dal .env
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


// Middleware
app.use(express.json());
app.use(cors());

// Stringa di connessione di Render (sostituisci con la tua stringa reale)
const connectionString = process.env.DB_CONNECTION_STRING; // Usa la stringa di connessione dal .env


// Configura PostgreSQL con la stringa di connessione
const pool = new Pool({
  connectionString: connectionString, // Usa la stringa di connessione completa
  ssl: { rejectUnauthorized: false }    // Necessario per Render
});

// Controlla la connessione
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

  // Rotta per aggiungere un nuovo corso
app.post('/api/corsi/add', async (req, res) => {
  const { nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO corsi (nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, descrizione, prezzo, sconto, categoria, data_inizio, data_fine]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Errore nel salvataggio del corso:', err);
    res.status(400).send('Errore nel salvataggio del corso');
  }
});


// Rotta per ottenere tutti i corsi
app.get('/api/corsi', async (req, res) => {
  try {
    console.log('Richiesta GET ricevuta per corsi...');
    const result = await pool.query('SELECT * FROM corsi');
    
    if (result.rows.length === 0) {
      console.log('Nessun corso trovato.');
    } else {
      console.log('Corsi recuperati:', result.rows);
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Errore nel recupero dei corsi:', err);
    res.status(400).send('Errore nel recupero dei corsi');
  }
});

app.get('/api/corsi/:id', async (req, res) => {
  const { id } = req.params; // Ottieni l'ID dall'URL
  try {
    // Assicurati che l'ID sia un numero
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID non valido" });
    }

    const result = await pool.query('SELECT * FROM corsi WHERE id = $1', [parseInt(id)]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Corso non trovato" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Errore nel recupero del corso", err);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Endpoint per creare un PaymentIntent basato sull'importo totale
app.post('/api/checkout', async (req, res) => {
  console.log('Richiesta POST ricevuta:', req.body);  // Log iniziale

  try {
    const { amount, email, name, corso } = req.body; // Prendi anche email e altri dettagli opzionali

    console.log("Dati ricevuti dal frontend:", req.body); // Log dei dati ricevuti

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'L importo è richiesto e deve essere valido.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      payment_method_types: ['card'],
      receipt_email: email, // 👈 Permette a Stripe di inviare la ricevuta
      metadata: {
        nome: name || '',
        corso: corso || '',
      },
    });

    console.log("PaymentIntent creato:", paymentIntent);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Errore durante la creazione del PaymentIntent:', error.message);
    res.status(500).json({ error: 'Errore interno del server.' });
  }
});

app.post('/api/update-payment-info', async (req, res) => {
  const { paymentIntentId, name, email, corso } = req.body;

  try {
    const updatedIntent = await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
      metadata: {
        nome: name,
        corso: corso,
      },
    });

    console.log("PaymentIntent aggiornato:", updatedIntent);
    res.status(200).json({
      message: 'PaymentIntent aggiornato con successo',
      updatedIntent, // opzionale: utile se vuoi usarlo nel frontend
    });
  } catch (error) {
    console.error('Errore aggiornamento paymentIntent:', error);
    res.status(500).json({ error: 'Errore aggiornamento paymentIntent' });
  }
});


const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.SandboxEnvironment("AbxjPZEQo6RardE0zjOjBgxVgGPILW6w1-AB8jMBPAD_oWZdBb1m-cI3FJVnVvMEMrXcWfwxp3vC5apX", 
  "EE0f12-fIDAIpQBhSrVGr1EqCe3dyQBuz6u7CM-L-OKlF5WY0uuuQv89PhV1lWiOzyUpNsCMOPvprDmf");
const client = new paypal.core.PayPalHttpClient(environment);

app.post("/api/paypal/create-order", async (req, res) => {
  const { price } = req.body; // Recupera l'importo dal body della richiesta

  if (!price) {
    return res.status(400).json({ error: "L'importo è richiesto" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: price, // Usa l'importo dinamico ricevuto dal frontend
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id }); // Restituisci l'ID dell'ordine al frontend
  } catch (err) {
    console.error("Errore durante la creazione dell'ordine:", err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});


// SOLO IN PRODUZIONE: Servire il frontend React
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}


// Avvio del server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});