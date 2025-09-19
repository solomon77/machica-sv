import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('Stripe environment variables are not set. The Stripe client may not work.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
  typescript: true,
});
