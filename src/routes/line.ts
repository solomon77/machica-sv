import { Hono } from 'hono';

// Example: import { lineClient } from '@/line';

const app = new Hono();

/**
 * Sends a message via the LINE Messaging API.
 * Expects a user ID and message content in the request body.
 */
app.post('/message', async (c) => {
  // const { to, text } = await c.req.json();
  // await lineClient.pushMessage({
  //   to,
  //   messages: [{ type: 'text', text }],
  // });
  return c.json({ message: 'Message sent successfully (implement logic)' });
});

export const lineRoute = app;
