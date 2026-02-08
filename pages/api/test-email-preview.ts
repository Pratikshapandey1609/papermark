import { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/components";
import LoginLink from "@/components/emails/verification-link";
import { generateChecksum } from "@/lib/utils/generate-checksum";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Only available in development" });
  }

  try {
    // Generate a sample verification URL
    const sampleUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?token=sample-token&email=test@example.com`;
    const checksum = generateChecksum(sampleUrl);
    const verificationUrlParams = new URLSearchParams({
      verification_url: sampleUrl,
      checksum,
    });
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify?${verificationUrlParams}`;

    // Render the email template
    const emailTemplate = LoginLink({ url: verificationUrl });
    const htmlContent = await render(emailTemplate);
    const plainText = await render(emailTemplate, { plainText: true });

    // Return HTML for preview
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email Preview</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          .preview { border: 1px solid #ddd; padding: 20px; margin: 20px 0; }
          .tabs { margin-bottom: 20px; }
          .tab { padding: 10px 20px; cursor: pointer; background: #f0f0f0; border: none; }
          .tab.active { background: #4CAF50; color: white; }
          .content { display: none; }
          .content.active { display: block; }
          pre { background: #f5f5f5; padding: 15px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📧 Email Preview</h1>
          <p>This is what the verification email looks like:</p>
          
          <div class="tabs">
            <button class="tab active" onclick="showTab('html')">HTML Version</button>
            <button class="tab" onclick="showTab('text')">Plain Text Version</button>
            <button class="tab" onclick="showTab('info')">Email Info</button>
          </div>

          <div id="html" class="content active">
            <h2>HTML Email</h2>
            <div class="preview">
              ${htmlContent}
            </div>
          </div>

          <div id="text" class="content">
            <h2>Plain Text Email</h2>
            <pre>${plainText}</pre>
          </div>

          <div id="info" class="content">
            <h2>Email Information</h2>
            <pre>
From: Papermark &lt;${process.env.SMTP_FROM || process.env.SMTP_USER}&gt;
To: [Recipient Email]
Subject: Welcome to Papermark!

Verification URL: ${verificationUrl}

SMTP Configuration:
- Host: ${process.env.SMTP_HOST}
- Port: ${process.env.SMTP_PORT}
- User: ${process.env.SMTP_USER}
- From: ${process.env.SMTP_FROM}
            </pre>
          </div>
        </div>

        <script>
          function showTab(tabName) {
            // Hide all content
            document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
            
            // Show selected content
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
          }
        </script>
      </body>
      </html>
    `);
  } catch (error: any) {
    console.error("❌ [test-email-preview] Error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate preview",
    });
  }
}
