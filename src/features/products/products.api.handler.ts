import { Context } from "hono";
import { stripe } from "../../lib/stripe";

export default async function productsApiHandler(c: Context) {
  try {
    /**
     * 1. Stripeから有効な商品と価格を取得
     */
    const [stripeProducts, stripePrices] = await Promise.all([
      stripe.products.list({ active: true }),
      stripe.prices.list({ active: true }),
    ]);

    /**
     * 2. 商品と価格をマージ
     */
    const productsWithPrices = stripeProducts.data.map((pd) => {
      const prices = stripePrices.data.filter((pr) => pr.product === pd.id);
      return { ...pd, prices };
    });

    /**
     * 3. マージしたデータをクライアントに返す
     */
    return c.json(productsWithPrices);
  } catch (error) {
    console.error("Stripeからの商品取得中にエラーが発生しました:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
