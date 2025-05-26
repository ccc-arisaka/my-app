# AWS デプロイメントガイド

このガイドでは、チャット質問票アプリケーションをAWSにデプロイするための包括的な手順を提供します。

## デプロイメントオプション

### 1. AWS Amplify（推奨）

#### セットアップ
```bash
# AWS Amplify CLIのインストール
npm install -g @aws-amplify/cli

# Amplifyの初期化
amplify init
```

#### 環境変数の設定
AWS Amplifyコンソールで以下の環境変数を設定：
- `GOOGLE_SHEETS_PROJECT_ID`
- `GOOGLE_SHEETS_PRIVATE_KEY_ID`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_CLIENT_ID`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_DRIVE_CLIENT_EMAIL`
- `GOOGLE_DRIVE_PRIVATE_KEY`
- `GOOGLE_DRIVE_FOLDER_ID`

#### ビルド設定
プロジェクトのルートディレクトリに`amplify.yml`を作成：
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### デプロイ
```bash
amplify push
```

### 2. AWS Elastic Beanstalk

#### セットアップ
1. AWS Elastic Beanstalkコンソールにアクセス
2. 新しいアプリケーションを作成
3. プラットフォームとして「Node.js」を選択

#### 設定
`.ebextensions/nodecommand.config`を作成：
```json
{
  "option_settings": {
    "aws:elasticbeanstalk:container:nodejs": {
      "NodeCommand": "pnpm start"
    }
  }
}
```

#### デプロイパッケージの作成
```bash
# ビルド
pnpm build

# デプロイパッケージの作成
zip -r deploy.zip . -x "node_modules/*" ".git/*"
```

#### 環境変数の設定
Elastic Beanstalkコンソールで設定：
- すべてのGoogle API関連の環境変数

#### デプロイ
```bash
# EB CLIを使用
eb deploy

# またはコンソールからパッケージをアップロード
```

### 3. AWS CloudFront + S3静的ホスティング

#### S3セットアップ
1. 新しいS3バケットを作成
2. 静的ウェブサイトホスティングを有効化
3. CloudFrontアクセス用のバケットポリシーを設定

#### CloudFrontセットアップ
1. 新しいディストリビューションを作成
2. S3バケットをオリジンとして設定
3. カスタムドメインの設定（必要な場合）

#### デプロイスクリプト
```bash
#!/bin/bash
pnpm build
aws s3 sync .next/static s3://your-bucket-name/_next/static
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## セキュリティ設定

### SSL/TLS
1. AWS Certificate Managerで証明書を取得
2. CloudFrontまたはElastic Beanstalkに証明書を設定

### セキュリティグループ
1. 必要なポートのみを開放
2. インバウンドルールを制限

### IAMロール
1. 最小権限の原則に従ってIAMロールを作成
2. 必要なAWSサービスへのアクセス権限を付与

## モニタリングとログ

### CloudWatch
1. アプリケーションログの収集を設定
2. メトリクスの監視を設定
3. アラームを設定

### ヘルスチェック
1. ロードバランサーのヘルスチェックパスを設定
2. 自動復旧を設定

## バックアップと復旧

### データバックアップ
1. S3バケットのバージョニングを有効化
2. 定期的なバックアップを設定

### 障害復旧
1. リージョン間のレプリケーションを設定
2. 復旧手順を文書化

## トラブルシューティング

### よくある問題

1. **デプロイ失敗**
   - AWSコンソールでビルドログを確認
   - 環境変数を確認
   - IAM権限を確認

2. **アプリケーションが起動しない**
   - アプリケーションログを確認
   - Node.jsバージョンを確認
   - ポート設定を確認

3. **API統合の問題**
   - Google API認証情報を確認
   - APIクォータと制限を確認
   - ネットワーク接続を確認

### サポートリソース
- AWSドキュメント: https://docs.aws.amazon.com
- AWSサポートセンター: https://aws.amazon.com/support
- AWSヘルスダッシュボード: https://health.aws.amazon.com

## コスト最適化

### ベストプラクティス
1. 適切なインスタンスサイズを使用
2. オートスケーリングを有効化
3. リソース使用量を監視
4. 長期デプロイメントには予約インスタンスを使用

### コスト見積もり
- AWS料金計算ツール: https://calculator.aws
- AWS Cost Explorerでコストを監視

## メンテナンス

### 定期的なタスク
1. 依存関係の更新
2. セキュリティパッチの監視
3. 認証情報の確認とローテーション
4. リソース使用率の確認

### スケーリング
1. オートスケーリンググループを設定
2. ロードバランシングを設定
3. パフォーマンスメトリクスを監視 