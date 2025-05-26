import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets APIクライアントを初期化
export async function initSheetsClient(credentials: any) {
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

// ヘッダー行を確認し、必要なら作成
async function ensureHeaderRow(client: any, spreadsheetId: string) {
  try {
    const response = await client.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:J1',
    });

    // ヘッダーが既にある場合は何もしない
    if (response.data.values && response.data.values.length > 0) {
      return;
    }

    // ヘッダー行を作成
    const headers = [
      'タイムスタンプ',
      '電気代',
      '住宅タイプ',
      '郵便番号',
      '住所',
      'ファイルアップロード',
      'ファイル名',
      '太陽光状況',
      '名前',
      '電話番号'
    ];

    await client.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:J1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [headers],
      },
    });
  } catch (error) {
    console.error('Error ensuring header row:', error);
    throw error;
  }
}

// スプレッドシートにデータを追加
export async function appendToSheet(
  client: any,
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  try {
    // ヘッダー行を確認
    await ensureHeaderRow(client, spreadsheetId);

    // データを追加 (A2から開始)
    const response = await client.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2:J2',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
} 