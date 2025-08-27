const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID, 
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  
  const { price } = req.body;

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
          value: price,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error("Errore durante la creazione dell'ordine:", err);
    res.status(500).json({ error: "Errore interno del server" });
  }
};