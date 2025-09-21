import { Context } from "hono";

export default async function reservationApiHandler(c: Context) {
  const {} = c;

  /**
   * 1. firestoreにデータを保存
   */

  /**
   * 2. stripe の checkout.session.create apiを叩く
   */

  /**
   * 3. フロントにstripeの決済セッションIDを送信
   */
}
