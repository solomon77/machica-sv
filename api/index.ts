import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { authRoute } from '../src/routes/auth.js';
import { lineRoute } from '../src/routes/line.js';
import { stripeRoute } from '../src/routes/stripe.js';

// Configures the Vercel runtime
export const config = {
  runtime: 'nodejs',
};

const app = new Hono();

// Register routes
app.route('/auth', authRoute);
app.route('/stripe', stripeRoute);
app.route('/line', lineRoute);

// Health check endpoint for deployment verification
app.get('/__health', (c) => c.text('vercel-cors-fix-final-test'));

app.get('/', (c) => c.text('machica-sv API'));

export default handle(app);
