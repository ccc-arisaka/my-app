// Environment variable processing utilities

export function processPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  
  // Handle different newline formats
  return key
    .replace(/\\n/g, '\n')  // Handle escaped newlines
    .replace(/\\\\n/g, '\n') // Handle double-escaped newlines
    .replace(/\\r\\n/g, '\n') // Handle Windows-style newlines
    .replace(/\\r/g, '\n');   // Handle carriage returns
}

export function getGoogleCredentials() {
  return {
    sheets: {
      type: "service_account",
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
      private_key: processPrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY),
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.replace(/@/g, '%40')}`,
      universe_domain: "googleapis.com"
    },
    drive: {
      client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      private_key: processPrivateKey(process.env.GOOGLE_DRIVE_PRIVATE_KEY)
    }
  };
} 