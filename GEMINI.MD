# Project: Machica Server (Backend)

## Synopsis
「Machica」予約システムのバックエンドAPI。Honoフレームワークで構築され、Vercel上で動作する。フロントエンド(`machica-reservation`)にビジネスロジックと外部サービス連携機能を提供する。

## Core Technologies
- **Type**: Serverless API
- **Stack**: Hono, TypeScript, Node.js
- **Hosting**: Vercel

## Key Responsibilities & Integrations
- **Authentication (`/api/auth/line`)**: LINEアクセストークンを検証し、Firebase Admin SDKでFirebaseカスタムトークンを生成する。
- **Payments (`/api/stripe/...`)**: Stripe SDKと連携し、決済セッションの作成とWebhookの処理を行う。
- **Smart Lock (`/api/switchbot/...`)**: SwitchBot APIと連携し、予約に紐づくスマートロックのワンタイムパスワードを発行する。
- **Notifications (`/api/line/message`)**: LINE Bot SDKを利用し、ユーザーへの予約確認やパスワードの通知を行う。

## Core Workflow Trigger
- Stripeの決済完了Webhook (`/api/stripe/webhooks`) を受信した際、SwitchBotのパスワード生成とLINEでの通知という一連のフローを実行することが、このサーバーの最も重要な役割の一つです。
