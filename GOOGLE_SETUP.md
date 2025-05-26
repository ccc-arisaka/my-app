# Google API セットアップ手順

## アカウント情報
- Gmailアカウント：foolsenv@gmail.com
- パスワード：ase323k!jgfewal

## セットアップ手順

1. Google Cloud Consoleにアクセス
   - https://console.cloud.google.com にアクセス
   - 上記のアカウントでログイン

2. プロジェクトの確認
   - プロジェクト「chat-question」が既に作成されています
   - このプロジェクトには必要なAPI（Google Sheets API、Google Drive API）が有効化されています

3. サービスアカウントの確認
   - 左側のメニューから「IAM と管理」→「サービスアカウント」を選択
   - サービスアカウント「chat-question@chat-question.iam.gserviceaccount.com」が既に設定されています

4. 認証情報の設定
   - `config/sheets.ts` と `config/drive.ts` に以下の情報が設定されています：
     - サービスアカウントの認証情報
     - Google DriveのフォルダID
     - Google SheetsのスプレッドシートID

## 重要な注意事項
- このアカウントは診断アプリケーション専用です
- パスワードは安全に管理してください
- アカウント情報を公開しないでください
- 必要に応じてパスワードを変更してください

## トラブルシューティング
- APIの使用制限に達した場合は、Google Cloud Consoleで制限を確認してください
- ファイルのアップロードやスプレッドシートへの書き込みに問題がある場合は、サービスアカウントの権限を確認してください 