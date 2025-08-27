const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { paymentIntentId, name, email, corso } = req.body;

  try {
    const updatedIntent = await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
      metadata: {
        nome: name,
        corso: corso,
      },
    });

    res.status(200).json({
      message: 'PaymentIntent aggiornato con successo',
      updatedIntent,
    });
  } catch (error) {
    console.error('Errore aggiornamento paymentIntent:', error);
    res.status(500).json({ error: 'Errore aggiornamento paymentIntent' });
  }
};