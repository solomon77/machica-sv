# machica-sv

This is the server-side application for machica, built with Hono and designed for Vercel.

## Prerequisites

- Node.js (v18 or later)
- Yarn
- Vercel CLI

## Setup

1.  **Install dependencies:**

    The required dependencies are listed in `package.json`. You will need to install them manually.
    ```bash
    yarn install
    ```

2.  **Set up environment variables:**

    - Copy the `.env.example` file to `.env.local`.
    - Fill in the required values in `.env.local`. The Vercel CLI (`vercel dev`) will automatically load these variables for local development.
    - For production, add these environment variables to your Vercel project settings.

## Development

To run the development server, use the Vercel CLI:

```bash
vercel dev
```

The API will be available at `http://localhost:3000/api`.

## API Endpoints

- `GET /api`: Health check.
- `POST /api/auth/line`: Authenticate with LINE.
- `POST /api/stripe/checkout-sessions`: Create a Stripe Checkout session.
- `POST /api/stripe/webhooks`: Handle Stripe webhooks.
- `POST /api/line/message`: Send a message via LINE.
