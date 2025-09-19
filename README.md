# Machica Server (machica-sv)

これは、物理スペース予約システム「Machica」のサーバーサイドAPIです。
フロントエンドである `machica-reservation` (LIFFアプリ) からのリクエストを処理し、各種外部サービスとの連携を行います。

## ✨ 主な責務

- **認証ブリッジ**: LINEの認証情報とFirebase Authenticationを連携させ、カスタムトークンを発行します。
- **決済処理**: Stripeと連携し、決済セッションの作成や、支払い完了のWebhookを処理します。
- **スマートロック連携**: 予約と決済が完了した際に、SwitchBot APIを介してスマートロックのワンタイムパスワードを自動発行します。
- **通知機能**: LINE Messaging APIを利用して、予約完了通知やワンタイムパスワードをユーザーに送信します。

## 🏛️ アーキテクチャ

- **Framework**: Hono
- **Language**: TypeScript
- **Platform**: Node.js
- **Hosting**: Vercel (Serverless Functions)

## 🔄 APIエンドポイント

- `POST /api/auth/line`: LINEアクセストークンを検証し、Firebaseカスタムトークンを返します。
- `POST /api/stripe/checkout-sessions`: 予約内容に基づき、Stripeの決済セッションを作成します。
- `POST /api/stripe/webhooks`: Stripeからのイベント（決済完了など）を処理します。決済完了後、SwitchBotのパスワード発行とLINE通知をトリガーします。
- `POST /api/line/message`: 指定されたユーザーにLINEメッセージを送信します。
- `POST /api/switchbot/generate-password`: (予定) 予約情報に基づき、ワンタイムパスワードを発行します。

## 開発セットアップ

1.  **依存関係のインストール:**
    ```bash
    yarn install
    ```

2.  **環境変数の設定:**
    `.env.local` ファイルを作成し、Firebaseサービスアカウント、LINE、Stripe、SwitchBotのAPIキーなど、必要な環境変数を設定してください。

3.  **開発サーバーの起動:**
    Vercel CLIを利用してローカルサーバーを起動します。
    ```bash
    vercel dev
    ```