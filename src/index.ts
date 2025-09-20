import { Hono } from "hono";
// import { handle } from "hono/vercel";

import { fbAuth } from "./routes/auth.js";
import { cors } from "hono/cors";
// import { lineRoute } from "../src/routes/line.js";
// import { stripeRoute } from "../src/routes/stripe.js";

// Configures the Vercel runtime
// export const config = {
//   runtime: "nodejs",
// };

const app = new Hono();

// Add CORS middleware
app.use(
  "*",
  cors({
    origin: [
      "https://asobiba-machica-test.web.app", // Staging Frontend
      "http://localhost:5173", // Local Development
    ],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
  })
);

// // Register routes
app.post("/line", fbAuth);
// app.route("/stripe", stripeRoute);
// app.route("/line", lineRoute);

// // Health check endpoint for deployment verification
// app.get("/__health", (c) => c.text("vercel-cors-fix-final-test"));

app.get("/", (c) => c.text("machica-sv API"));

export default app;
