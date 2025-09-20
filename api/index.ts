import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { authRoute } from '@/routes/auth';
import { lineRoute } from '@/routes/line';
import { stripeRoute } from '@/routes/stripe';

// Configures the Vercel runtime
export const config = {
  runtime: 'nodejs',
};

const app = new Hono().basePath('/api');

// Register routes
app.route('/auth', authRoute);
app.route('/stripe', stripeRoute);
app.route('/line', lineRoute);

// Health check endpoint for deployment verification
app.get('/__health', (c) => c.text('vercel-cors-fix-final-test'));

app.get('/', (c) => c.text('machica-sv API'));

export default handle(app);
