import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { driveConfig } from '@/config/drive'

// サービスアカウント認証
const auth = new google.auth.GoogleAuth({
  credentials: driveConfig.credentials,
  scopes: driveConfig.scopes
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'ファイルが提供されていません' },
        { status: 400 }
      )
    }

    // ファイルを一時的に保存
    const buffer = Buffer.from(await file.arrayBuffer())
    const tempFilePath = path.join('/tmp', file.name)
    fs.writeFileSync(tempFilePath, buffer)

    // Google Drive APIクライアントを初期化 (JWTクライアントを使用)
    const authClient = await auth.getClient() as any
    const drive = google.drive({
      version: 'v3',
      auth: authClient
    })

    // ファイルをアップロード
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [driveConfig.folderId]
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(tempFilePath)
      },
      fields: 'id,name,webViewLink'
    })

    // 一時ファイルを削除
    fs.unlinkSync(tempFilePath)

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      fileUrl: response.data.webViewLink
    })
  } catch (error) {
    console.error('Google Driveアップロードエラー:', error)
    return NextResponse.json(
      { error: 'ファイルのアップロードに失敗しました' },
      { status: 500 }
    )
  }
} 