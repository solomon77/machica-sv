import { admin, auth as firebaseAuth, firestore } from "../firebase.js";
import { fetchJson, FetchError } from "../utils/fetch.js"; // 作成したラッパーをインポート
import type { UserProfile, VerifyTokenResult } from "../types/line.js"; // 作成した型をインポート
import { StatusCode } from "hono/utils/http-status";
import type { Context } from "hono";

export async function fbAuth(c: Context) {
  console.log("auth page");
  try {
    const { lineAccessToken } = await c.req.json();

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

    // 3. Firestoreにユーザーが存在するか確認し、存在しなければ登録する
    const userRef = firestore.collection("Users").doc(lineUserId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const { displayName, pictureUrl } = profile;
      const createdAt = admin.firestore.FieldValue.serverTimestamp();

      await userRef.set({ lineUserId, displayName, pictureUrl, createdAt });
    }

    // 4. Firebaseのカスタムトークンを生成
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
}
