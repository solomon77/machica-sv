import { Hono } from 'hono';

// Example: import { auth } from '@/firebase';

const app = new Hono();

/**
 * Handles LINE login verification.
 * Expects a LINE access token in the request body.
 * Verifies the token, gets the user profile, creates a Firebase custom token,
 * and returns it to the client.
 */
app.post('/line', async (c) => {
  // const { lineToken } = await c.req.json();
  // TODO:
  // 1. Verify LINE token with LINE API.
  // 2. Get LINE user profile.
  // 3. Find or create a user in your Firestore database.
  // 4. Generate a Firebase custom token using the LINE user ID.
  // const firebaseToken = await auth.createCustomToken(lineUserId);
  // return c.json({ firebaseToken });

  return c.json({ message: 'Implement LINE auth logic here' });
});

export const authRoute = app;
