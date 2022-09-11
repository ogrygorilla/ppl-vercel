import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async (req, res) => {
  const { id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(id.toString(), {
    expand: ["payment_intent"],
  });
  res.status(200).json({ session });
};
