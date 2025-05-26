import { initSheetsClient, appendToSheet } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';
import { sheetsConfig } from '@/config/sheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await initSheetsClient(sheetsConfig.credentials);
    await appendToSheet(client, sheetsConfig.spreadsheetId, 'Sheet1', [Object.values(data)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    );
  }
} 