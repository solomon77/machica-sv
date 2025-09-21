import { Hono } from "hono";
import { cors } from "hono/cors";
import productsApiHandler from "./features/products/products.api.handler.js";
import { authApiHandler } from "./features/auth/auth.api.handlers.js";
import reservationWebhookHandler from "./features/reservation/reservation.webhook.handler.js";

const app = new Hono();

app.use("*", cors({ origin: [process.env.CLIENT_URL as string] }));

const api = new Hono();
api.post("/auth", authApiHandler);
api.post("/products", productsApiHandler);

const webhook = new Hono();
webhook.post("/reservation", reservationWebhookHandler);

// Feature Routing
// Health Check
app.get("/", (c) => c.text("machica-sv API is running!"));
app.route("/api", api);
app.route("/webhook", webhook);

export default app;
