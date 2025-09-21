import { Context } from "hono";

export default async function productsApiHandler(c: Context) {
  const {} = c;

  /**
   * 1. stripeの stripe.products.list を取得
   */

  /**
   * 2. stripeの stripe.prices.list を取得
   */

  /**
   * 3. productsとpriceをマージ
   */

  /**
   * 4. フロントに3を返す
   */
}
