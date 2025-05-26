import { getGoogleCredentials } from '../lib/env';

// Google Sheets API Configuration
export const sheetsConfig = {
  credentials: getGoogleCredentials().sheets,
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  sheetName: 'Responses'
}; 