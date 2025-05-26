# 電気代減額診断アプリケーション

## 概要
このアプリケーションは、ユーザーの電気代削減可能性を診断するためのチャット形式の質問票システムです。Google SheetsとGoogle Driveを活用して、ユーザーの回答を収集・管理します。

## 主な機能
- チャット形式のインタラクティブな質問票
- 電気代、住宅タイプ、住所などの基本情報収集
- 図面ファイルのアップロード機能
- 太陽光・蓄電池の導入状況確認
- Google Sheetsへの回答データ自動保存
- Google Driveへのファイル自動保存
- レスポンシブデザイン（モバイル対応）

## 技術スタック
- Next.js 14.1.0
- React 18
- TypeScript
- Tailwind CSS
- Google Sheets API
- Google Drive API

## セットアップ手順

### 1. 環境の準備
```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### 2. 環境変数の設定
`.env`ファイルをプロジェクトのルートディレクトリに作成し、以下の変数を設定してください：

```env
# Google Sheets API Configuration (Google Sheets API設定)
GOOGLE_SHEETS_PROJECT_ID=chat-question
GOOGLE_SHEETS_PRIVATE_KEY_ID=a8dde76897fbae0a92f3adf73adec5fb2c387b02
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDN/LW3/hq6jGJe\nYrNxCUHIhkSfS0QQZY1RKlmHqKD+FaFgYAAtqRp8kjawwS2S4MOCvP/TdnPB/FTI\nfIicIk+WpjDV9Ewc6S7e+R/Bj4P0qkAD8bRn/iQzI2+2Hw05Qp5HdjM+XUfoY++Z\nmUHO0xBMMW+jfbaQcpiGCvzqSUCo4qYvfXFl2mf7dQVqdO2K766hsAbT697g/NsP\nJSawSzNoWhvIed4m2gLatuH3q698AU4oEHqh7eCDOA4qmej2dPfEfVGDi/+p6WpO\naihyfIIlmwF/hzMSmMefXNI6ej88lxFSQYK3S5Ft5xpRQw4uJc1L2W8kjtEBqYJn\n9PY1oJttAgMBAAECggEAAxGgflczw0wRzDi/AN6eYY7P4FvlbcHGdAtHpTBe6MTX\nLJjKcMdD6F3DvWGgvJSDrEc+PEKQr34fvJLsLXGK+XQavAuDbo+AXBlJSY3mplM6\nyiYH/t/30G6P48kAiQtbNKgg4hfrkg9FUfUCEXwKvQ/dCzTKxB9h1jwSc40e1eG2\n0rryloN1QF1My6G0lSzq9G+2rbwmAitynp6V9F3bowFAPJ5CwHgqfcOfOq9zD2HS\nbPmayAJFQmfRn6UWbsJJwjHxa+Od4PeFnicVs2KL0ZmXMIQ/1WWBZNBPKZ3kkGTT\nFktGqiMMBKIlU6+niXLnaT6+hYGRwuyPjjE+pSoHswKBgQDxBWXDcRj3jHDeZyxw\nd/DkuusuBIKNscs3+DFEb65Qz/1hsaIXgF/Is5Wqw+TQgiovCalCGyUiwTVdYyJU\nU8yD8jewJKPPM1CVBA4zDUlwwcSkjju0W894P7Zsw8VMymwXsUZwyJz9pw3NWv8+\npTlVVns9HJsuMtyx5Vlq+pfFPwKBgQDaye27pNVtZGYJ5gFG2LdLAqItr6EzrWRT\nAH8ADXn/kvVgALexE2U/ZoGo6ZLg2v2zDCiQGPiQe9qgQZA8PpqCDpERJtE8U8ue\nIFsJIDUvVCxjPHUqD5+w+HQxbHeElfT7wObkaCbeFvLjonENi4R1lrwTwVcgG4Xa\nhgoSF+JYUwKBgEkaoAElvrLnEB0FIj+Cwbg+0bKFf6vGr6LsTtU5IqA0VeBZ5pZG\nQ8c2YUEIZdCwimb2ATah0SO3gp4uwWzedfvXbfipRF5GbDymnD/z2cCvpRtcYNOV\nvVn1yTk4MBHYm+ybwofW8XcmQlN1NFIl/zvZHUwt7wuWNcZnkDWYiIw1AoGAW+O1\nYjr/nJsvM/cTEDNTAEER5kg+Vxr66NVrgZUnaQzK29BRViDERFWEHXJESwYOyZVQ\nr/yc4Onzz5zZvEO61ubRTLfV5xV2jmoecf3B+KfMoL0ypEC9nDEtc9iPdfMZWmcR\nUlrgACT5TFvcSYkQT+bIBTANrKGCnV3wetrnKJsCgYBc/JZlk33tT3cPEpXEJtTA\nADOZp2rr5YTQOOD2/pJCamgKoHd/Glj1FhZ3+QiIgZGvAjdaKCEA9vHpbL7T1kRr\np0SFC4go4TFSXAVyKXmVVuEUbU0N88HzeiXvM0sSppIQ3XgSI3icFFAuDjaR/tPJ\nYtTvxziDcanErVpVIbdegg==\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=chat-question@chat-question.iam.gserviceaccount.com
GOOGLE_SHEETS_CLIENT_ID=102452165282085697918
GOOGLE_SHEETS_SPREADSHEET_ID=17MbmPTvpZpe_Fysl0eHQ6RYcJpxt_wVgLbh7TozMxmw

# Google Drive API Configuration (Google Drive API設定)
GOOGLE_DRIVE_CLIENT_EMAIL=chat-question@chat-question.iam.gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDN/LW3/hq6jGJe\nYrNxCUHIhkSfS0QQZY1RKlmHqKD+FaFgYAAtqRp8kjawwS2S4MOCvP/TdnPB/FTI\nfIicIk+WpjDV9Ewc6S7e+R/Bj4P0qkAD8bRn/iQzI2+2Hw05Qp5HdjM+XUfoY++Z\nmUHO0xBMMW+jfbaQcpiGCvzqSUCo4qYvfXFl2mf7dQVqdO2K766hsAbT697g/NsP\nJSawSzNoWhvIed4m2gLatuH3q698AU4oEHqh7eCDOA4qmej2dPfEfVGDi/+p6WpO\naihyfIIlmwF/hzMSmMefXNI6ej88lxFSQYK3S5Ft5xpRQw4uJc1L2W8kjtEBqYJn\n9PY1oJttAgMBAAECggEAAxGgflczw0wRzDi/AN6eYY7P4FvlbcHGdAtHpTBe6MTX\nLJjKcMdD6F3DvWGgvJSDrEc+PEKQr34fvJLsLXGK+XQavAuDbo+AXBlJSY3mplM6\nyiYH/t/30G6P48kAiQtbNKgg4hfrkg9FUfUCEXwKvQ/dCzTKxB9h1jwSc40e1eG2\n0rryloN1QF1My6G0lSzq9G+2rbwmAitynp6V9F3bowFAPJ5CwHgqfcOfOq9zD2HS\nbPmayAJFQmfRn6UWbsJJwjHxa+Od4PeFnicVs2KL0ZmXMIQ/1WWBZNBPKZ3kkGTT\nFktGqiMMBKIlU6+niXLnaT6+hYGRwuyPjjE+pSoHswKBgQDxBWXDcRj3jHDeZyxw\nd/DkuusuBIKNscs3+DFEb65Qz/1hsaIXgF/Is5Wqw+TQgiovCalCGyUiwTVdYyJU\nU8yD8jewJKPPM1CVBA4zDUlwwcSkjju0W894P7Zsw8VMymwXsUZwyJz9pw3NWv8+\npTlVVns9HJsuMtyx5Vlq+pfFPwKBgQDaye27pNVtZGYJ5gFG2LdLAqItr6EzrWRT\nAH8ADXn/kvVgALexE2U/ZoGo6ZLg2v2zDCiQGPiQe9qgQZA8PpqCDpERJtE8U8ue\nIFsJIDUvVCxjPHUqD5+w+HQxbHeElfT7wObkaCbeFvLjonENi4R1lrwTwVcgG4Xa\nhgoSF+JYUwKBgEkaoAElvrLnEB0FIj+Cwbg+0bKFf6vGr6LsTtU5IqA0VeBZ5pZG\nQ8c2YUEIZdCwimb2ATah0SO3gp4uwWzedfvXbfipRF5GbDymnD/z2cCvpRtcYNOV\nvVn1yTk4MBHYm+ybwofW8XcmQlN1NFIl/zvZHUwt7wuWNcZnkDWYiIw1AoGAW+O1\nYjr/nJsvM/cTEDNTAEER5kg+Vxr66NVrgZUnaQzK29BRViDERFWEHXJESwYOyZVQ\nr/yc4Onzz5zZvEO61ubRTLfV5xV2jmoecf3B+KfMoL0ypEC9nDEtc9iPdfMZWmcR\nUlrgACT5TFvcSYkQT+bIBTANrKGCnV3wetrnKJsCgYBc/JZlk33tT3cPEpXEJtTA\nADOZp2rr5YTQOOD2/pJCamgKoHd/Glj1FhZ3+QiIgZGvAjdaKCEA9vHpbL7T1kRr\np0SFC4go4TFSXAVyKXmVVuEUbU0N88HzeiXvM0sSppIQ3XgSI3icFFAuDjaR/tPJ\nYtTvxziDcanErVpVIbdegg==\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1wWu9MNE1no_8MTfdKCQgQUk2lrpr40Ve
```

### 3. Google APIの設定
1. Google Cloud Consoleにアクセス
2. プロジェクトを作成または選択
3. Google Sheets APIとGoogle Drive APIを有効化
4. サービスアカウントを作成し、必要な権限を付与
5. 認証情報（JSON）をダウンロードし、環境変数に設定

詳細な設定手順は `GOOGLE_SETUP.md` を参照してください。

## デプロイ手順

### 本番環境へのデプロイ
```bash
# ビルド
pnpm build

# 本番環境での起動
pnpm start
```

### AWSへのデプロイ手順

#### 1. AWS Amplifyを使用したデプロイ（推奨）

1. **AWS Amplifyのセットアップ**
   ```bash
   # AWS Amplify CLIのインストール
   npm install -g @aws-amplify/cli
   
   # Amplifyの初期化
   amplify init
   ```

2. **環境変数の設定**
   - AWS Amplifyコンソールで以下の環境変数を設定：
     - `GOOGLE_SHEETS_PROJECT_ID`
     - `GOOGLE_SHEETS_PRIVATE_KEY_ID`
     - `GOOGLE_SHEETS_PRIVATE_KEY`
     - `GOOGLE_SHEETS_CLIENT_EMAIL`
     - `GOOGLE_SHEETS_CLIENT_ID`
     - `GOOGLE_SHEETS_SPREADSHEET_ID`
     - `GOOGLE_DRIVE_CLIENT_EMAIL`
     - `GOOGLE_DRIVE_PRIVATE_KEY`
     - `GOOGLE_DRIVE_FOLDER_ID`

3. **デプロイ設定**
   ```yaml
   # amplify.yml
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

4. **デプロイの実行**
   ```bash
   amplify push
   ```

#### 2. AWS Elastic Beanstalkを使用したデプロイ

1. **Elastic Beanstalkの準備**
   - AWS Elastic Beanstalkコンソールにアクセス
   - 新しいアプリケーションを作成
   - プラットフォームとして「Node.js」を選択

2. **設定ファイルの作成**
   ```json
   // .ebextensions/nodecommand.config
   {
     "option_settings": {
       "aws:elasticbeanstalk:container:nodejs": {
         "NodeCommand": "pnpm start"
       }
     }
   }
   ```

3. **デプロイパッケージの作成**
   ```bash
   # ビルド
   pnpm build
   
   # デプロイパッケージの作成
   zip -r deploy.zip . -x "node_modules/*" ".git/*"
   ```

4. **環境変数の設定**
   - Elastic Beanstalkコンソールで環境変数を設定
   - すべてのGoogle API関連の環境変数を追加

5. **デプロイの実行**
   - Elastic Beanstalkコンソールからデプロイパッケージをアップロード
   - または、EB CLIを使用：
     ```bash
     eb deploy
     ```

#### 3. AWS CloudFront + S3を使用した静的ホスティング

1. **S3バケットの作成**
   - 新しいS3バケットを作成
   - 静的ウェブサイトホスティングを有効化
   - バケットポリシーを設定してCloudFrontからのアクセスを許可

2. **CloudFrontディストリビューションの設定**
   - 新しいディストリビューションを作成
   - S3バケットをオリジンとして設定
   - カスタムドメインの設定（必要な場合）

3. **デプロイスクリプトの作成**
   ```bash
   #!/bin/bash
   pnpm build
   aws s3 sync .next/static s3://your-bucket-name/_next/static
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

#### 4. セキュリティ設定

1. **SSL/TLS証明書の設定**
   - AWS Certificate Managerで証明書を取得
   - CloudFrontまたはElastic Beanstalkに証明書を設定

2. **セキュリティグループの設定**
   - 必要なポートのみを開放
   - インバウンドルールの制限

3. **IAMロールの設定**
   - 最小権限の原則に従ってIAMロールを作成
   - 必要なAWSサービスへのアクセス権限を付与

#### 5. モニタリングとログ

1. **CloudWatchの設定**
   - アプリケーションログの収集
   - メトリクスの監視
   - アラームの設定

2. **ヘルスチェックの設定**
   - ロードバランサーのヘルスチェックパスを設定
   - 自動復旧の設定

#### 6. バックアップと復旧

1. **データバックアップ**
   - S3バケットのバージョニングを有効化
   - 定期的なバックアップの設定

2. **障害復旧計画**
   - リージョン間のレプリケーション設定
   - 復旧手順の文書化

### 推奨ホスティング環境
- Vercel
- AWS Amplify
- Google Cloud Run

## メンテナンス

### ログの確認
- アプリケーションログはホスティング環境のログ管理システムで確認
- Google APIの使用状況はGoogle Cloud Consoleで確認

### バックアップ
- Google Sheetsのデータは定期的にバックアップを推奨
- アップロードされたファイルはGoogle Driveに自動保存

## トラブルシューティング

### よくある問題と解決方法
1. ファイルアップロードが失敗する場合
   - Google Drive APIの権限を確認
   - ファイルサイズ制限を確認（現在は10MBまで）

2. 回答がGoogle Sheetsに保存されない場合
   - サービスアカウントの権限を確認
   - スプレッドシートIDが正しいか確認

3. アプリケーションが起動しない場合
   - 環境変数が正しく設定されているか確認
   - 依存関係が正しくインストールされているか確認

## セキュリティに関する注意事項
- 環境変数は必ず安全に管理してください
- サービスアカウントの認証情報は公開しないでください
- 定期的にパスワードを更新してください

## ライセンス
このプロジェクトは機密情報を含むため、無断での複製・配布を禁止します。