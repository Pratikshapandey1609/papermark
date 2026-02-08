import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/resend";
import { render } from "@react-email/components";

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse,
) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Only available in development" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Email address required" });
  }

  try {
    console.log("📧 [test-send-email] Attempting to send test email to:", to);

    // Create a simple test email
    const TestEmail = () => (
      <div>
        <h1>Test Email from Papermark</h1>
        <p>This is a test email to verify SMTP configuration.</p>
        <p>If you received this, your email system is working correctly!</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    );

    await sendEmail({
      to,
      subject: "Test Email from Papermark - " + new Date().toLocaleTimeString(),
      react: <TestEmail />,
      test: false, // Don't use test mode
    });

    console.log("✅ [test-send-email] Email sent successfully!");

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully!",
      to,
    });
  } catch (error: any) {
    console.error("❌ [test-send-email] Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
      details: error.toString(),
    });
  }
}
