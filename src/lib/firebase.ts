import admin from 'firebase-admin';

// Ensure you have set the FIREBASE_SERVICE_ACCOUNT_JSON environment variable in Vercel
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_JSON as string
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
export const firestore = admin.firestore();
export const auth = admin.auth();
