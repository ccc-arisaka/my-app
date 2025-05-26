import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// Handle GET requests
export async function GET() {
  return NextResponse.json({ status: 'API is running' });
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    console.log('Received request to send results');
    const data = await request.json();
    console.log('Data received:', data);

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('SMTP configuration:', {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER,
      recipient: process.env.RECIPIENT_EMAIL
    });

    // Format the email content
    const emailContent = `
新しい診断結果が届きました：

お名前: ${data.name}
電話番号: ${data.phone}
郵便番号: ${data.postalCode}
住所: ${data.address}
電気代: ${data.electricityBill}
住宅タイプ: ${data.housingType}
予想される年間削減額: ${data.estimatedSavings}円

診断日時: ${new Date().toLocaleString('ja-JP')}
    `;

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: '新しい診断結果が届きました',
      text: emailContent,
    };

    console.log('Attempting to send email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { 
      status: 500 
    });
  }
} 