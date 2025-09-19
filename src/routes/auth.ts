import { Hono } from "hono";
import { auth as firebaseAuth } from "@/firebase";
import { fetchJson, FetchError } from "@/utils/fetch"; // 作成したラッパーをインポート
import type { UserProfile, VerifyTokenResult } from "@/types/line"; // 作成した型をインポート
import { StatusCode } from "hono/utils/http-status";

const app = new Hono();

app.post("/line", async (c) => {
  try {
    const { lineAccessToken } = await c.req.json<{ lineAccessToken: string }>();

    // 1. LINEのアクセストークンを検証 (型安全なラッパーを使用)
    const verifyUrl = `https://api.line.me/oauth2/v2.1/verify?access_token=${lineAccessToken}`;
    const verifyResult = await fetchJson<VerifyTokenResult>(verifyUrl);

    if (verifyResult.client_id !== process.env.LINE_CHANNEL_ID) {
      return c.json({ error: "Invalid LINE token" }, 401);
    }

    // 2. LINEユーザープロファイルを取得 (型安全なラッパーを使用)
    const profileUrl = "https://api.line.me/v2/profile";
    const profile = await fetchJson<UserProfile>(profileUrl, {
      headers: { Authorization: `Bearer ${lineAccessToken}` },
    });

    const lineUserId = profile.userId;

    // (省略) Firestoreへの保存処理など

    // 3. Firebaseのカスタムトークンを生成
    const firebaseToken = await firebaseAuth.createCustomToken(lineUserId);

    return c.json({ firebaseToken });
  } catch (error) {
    if (error instanceof FetchError) {
      // fetchJson内でエラーが発生した場合のハンドリング
      // c.status()でステータスコードを設定
      c.status(error.response.status as StatusCode);
      return c.json({ error: "Failed to communicate with LINE API" });
    }
    console.error("Error in LINE auth:", error);
    // 同様に、Internal Server Errorも修正
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

export const authRoute = app;
