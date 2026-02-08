import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Only available in development" });
  }

  const config = {
    SMTP_HOST: process.env.SMTP_HOST || "NOT SET",
    SMTP_PORT: process.env.SMTP_PORT || "NOT SET",
    SMTP_USER: process.env.SMTP_USER || "NOT SET",
    SMTP_PASS: process.env.SMTP_PASS ? "***" + process.env.SMTP_PASS.slice(-4) : "NOT SET",
    SMTP_FROM: process.env.SMTP_FROM || "NOT SET",
    SMTP_SECURE: process.env.SMTP_SECURE || "NOT SET",
    SEND_EMAILS: process.env.SEND_EMAILS || "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET",
  };

  console.log("📧 [test-email-config] Environment variables:", config);

  return res.status(200).json({
    message: "Email configuration check",
    config,
    smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    resendConfigured: !!process.env.RESEND_API_KEY,
  });
}
