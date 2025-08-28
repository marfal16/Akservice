const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { amount, email, name, corso } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'L\'importo è richiesto e deve essere valido.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      payment_method_types: ['card'],
      receipt_email: email,
      metadata: {
        nome: name || '',
        corso: corso || '',
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Errore durante la creazione del PaymentIntent:', error.message);
    console.error(error.stack); 
    res.status(500).json({ error: 'Errore interno del server.' });
  }
};