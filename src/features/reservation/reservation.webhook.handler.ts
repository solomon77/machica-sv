import { Context } from "hono";

export default async function reservationWebhookHandler(c: Context) {
  const {} = c;

  /**
   * 1. stripeの checkout.session.completeを受信
   */

  /**
   * 2. switchbot api でワンタイムキーを作成
   */

  /**
   * 3. firestoreにワンタイムキーを保存
   * ※ フロント側でこのdocをリッスンするリスナーを貼っておく
   */

  /**
   * 4. cloud tasksにリマインダーをスケジューリング
   * - 予約1時間前: 予約時間リマインダー
   * - 予約終了時刻: 終了時刻リマインダー＆延長確認
   */

  /**
   * 5. line messaging api でワンタイムキーを送信
   */
}
