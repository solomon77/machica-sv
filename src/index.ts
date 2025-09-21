import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRouter } from "./features/auth/auth.router.js";

const app = new Hono();

app.use("*", cors({ origin: [process.env.CLIENT_URL as string] }));

// Health Check
app.get("/", (c) => c.text("machica-sv API is running!"));

// Feature Routing
app.route("/api/auth", authRouter);

export default app;
