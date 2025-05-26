import { getGoogleCredentials } from '../lib/env';

// Google Drive API Configuration
export const driveConfig = {
  credentials: getGoogleCredentials().drive,
  folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
  scopes: ['https://www.googleapis.com/auth/drive.file']
} 