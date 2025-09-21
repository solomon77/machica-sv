import { auth as firebaseAuth } from "../../lib/firebase.js";
import { fetchJson, FetchError } from "../../utils/fetch.js";
import type { VerifyTokenResult } from "./auth.types.js";
import type { Context } from "hono";
import {
  createOrUpdateFirebaseAuthUser,
  createOrUpdateUserInDb,
  getLineProfile,
} from "./auth.services.js";
import { StatusCode } from "hono/utils/http-status.js";

export async function authApiHandler(c: Context) {
  try {
    const { lineAccessToken } = await c.req.json();

    // 1. LINEのアクセストークンを検証
    const verifyUrl = `https://api.line.me/oauth2/v2.1/verify?access_token=${lineAccessToken}`;
    const verifyResult = await fetchJson<VerifyTokenResult>(verifyUrl);

    if (verifyResult.client_id !== process.env.LINE_CHANNEL_ID) {
      return c.json({ error: "Invalid LINE token" }, 401);
    }

    // 2. LINEユーザープロファイルを取得
    const profile = await getLineProfile(lineAccessToken);

    // 3. Firebase Authにユーザーを登録/更新
    await createOrUpdateFirebaseAuthUser(profile);

    // 4. Firestoreにユーザーを登録/更新
    await createOrUpdateUserInDb(profile);

    // 5. Firebaseのカスタムトークンを生成
    const firebaseToken = await firebaseAuth.createCustomToken(profile.userId);

    return c.json({ firebaseToken });
  } catch (error) {
    if (error instanceof FetchError) {
      c.status(error.response.status as StatusCode);
      return c.json({ error: "Failed to communicate with LINE API" });
    }
    console.error("Error in LINE auth:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}
