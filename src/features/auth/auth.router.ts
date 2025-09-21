import { Hono } from "hono";
import { fbAuthHandler } from "./auth.api.handlers.js";

const authRouter = new Hono();

// フロントエンドからのLINE認証リクエストを処理
authRouter.post("/line", fbAuthHandler);

export { authRouter };
