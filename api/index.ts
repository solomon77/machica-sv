import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

import { authRoute } from '@/routes/auth';
import { lineRoute } from '@/routes/line';
import { stripeRoute } from '@/routes/stripe';

// Configures the Vercel runtime
export const config = {
  runtime: 'nodejs',
};

const app = new Hono().basePath('/api');

// Add CORS middleware
app.use(
  '*',
  cors({
    origin: [
      'https://asobiba-machica-test.web.app', // Staging Frontend
      'http://localhost:5173', // Local Development
    ],
    allowHeaders: ['Content-Type'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
  })
);

// Register routes
app.route('/auth', authRoute);
app.route('/stripe', stripeRoute);
app.route('/line', lineRoute);

app.get('/', (c) => c.text('machica-sv API'));

export default handle(app);
