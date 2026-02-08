import { JSXElementConstructor, ReactElement } from "react";

import { render } from "@react-email/components";
import { Resend } from "resend";
import nodemailer from "nodemailer";

import { log, nanoid } from "@/lib/utils";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Create nodemailer transporter for SMTP (Gmail, Outlook, etc.)
const createSMTPTransporter = () => {
  console.log('🔧 [createSMTPTransporter] Checking SMTP configuration...');
  console.log('🔧 [createSMTPTransporter] SMTP_HOST:', process.env.SMTP_HOST);
  console.log('🔧 [createSMTPTransporter] SMTP_PORT:', process.env.SMTP_PORT);
  console.log('🔧 [createSMTPTransporter] SMTP_USER:', process.env.SMTP_USER);
  console.log('🔧 [createSMTPTransporter] SMTP_PASS:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('🔧 [createSMTPTransporter] SMTP_FROM:', process.env.SMTP_FROM);
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️ [createSMTPTransporter] SMTP not configured, will use Resend if available');
    return null;
  }
  
  console.log('✅ [createSMTPTransporter] Creating SMTP transporter...');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const smtpTransporter = createSMTPTransporter();
console.log('🔧 [Module Init] SMTP Transporter created:', !!smtpTransporter);
console.log('🔧 [Module Init] Resend client created:', !!resend);

export const sendEmail = async ({
  to,
  subject,
  react,
  marketing,
  system,
  verify,
  test,
  cc,
  scheduledAt,
  unsubscribeUrl,
}: {
  to: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  system?: boolean;
  verify?: boolean;
  test?: boolean;
  cc?: string | string[];
  scheduledAt?: string;
  unsubscribeUrl?: string;
}) => {
  console.log('📧 [sendEmail] Starting email send process...');
  console.log('📧 [sendEmail] To:', to);
  console.log('📧 [sendEmail] Subject:', subject);
  console.log('📧 [sendEmail] Test mode:', test);
  console.log('📧 [sendEmail] Marketing:', marketing);
  console.log('📧 [sendEmail] System:', system);
  console.log('📧 [sendEmail] Verify:', verify);
  console.log('📧 [sendEmail] SMTP configured:', !!smtpTransporter);
  console.log('📧 [sendEmail] Resend configured:', !!resend);
  
  const plainText = await render(react, { plainText: true });
  const htmlContent = await render(react);

  // Use SMTP if configured, otherwise fall back to Resend
  if (smtpTransporter) {
    console.log('📧 [sendEmail] Using SMTP transporter');
    try {
      const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
      console.log('📧 [sendEmail] From email:', fromEmail);
      console.log('📧 [sendEmail] Sending via SMTP...');
      
      const info = await smtpTransporter.sendMail({
        from: marketing
          ? `Marc from Papermark <${fromEmail}>`
          : system
            ? `Papermark <${fromEmail}>`
            : verify
              ? `Papermark <${fromEmail}>`
              : `Marc from Papermark <${fromEmail}>`,
        to: test ? "test@example.com" : to,
        cc: cc,
        subject,
        text: plainText,
        html: htmlContent,
      });

      console.log('✅ [sendEmail] SMTP email sent successfully!');
      console.log('✅ [sendEmail] Message ID:', info.messageId);
      return { id: info.messageId };
    } catch (exception) {
      console.error('❌ [sendEmail] SMTP error:', exception);
      log({
        message: `SMTP error when sending email: ${exception}`,
        type: "error",
        mention: true,
      });
      throw exception;
    }
  }

  // Fall back to Resend
  console.log('📧 [sendEmail] Using Resend');
  if (!resend) {
    console.error('❌ [sendEmail] Neither SMTP nor Resend is configured!');
    throw new Error("Neither SMTP nor Resend is configured");
  }

  try {
    console.log('📧 [sendEmail] Sending via Resend...');
    const { data, error } = await resend.emails.send({
      from: marketing
        ? "Marc from Papermark <marc@ship.papermark.io>"
        : system
          ? "Papermark <system@papermark.io>"
          : verify
            ? "Papermark <system@verify.papermark.io>"
            : !!scheduledAt
              ? "Marc Seitz <marc@papermark.io>"
              : "Marc from Papermark <marc@papermark.io>",
      to: test ? "delivered@resend.dev" : to,
      cc: cc,
      replyTo: marketing ? "marc@papermark.io" : undefined,
      subject,
      react,
      scheduledAt,
      text: plainText,
      headers: {
        "X-Entity-Ref-ID": nanoid(),
        ...(unsubscribeUrl ? { "List-Unsubscribe": unsubscribeUrl } : {}),
      },
    });

    if (error) {
      console.error('❌ [sendEmail] Resend error:', error);
      log({
        message: `Resend returned error when sending email: ${error.name} \n\n ${error.message}`,
        type: "error",
        mention: true,
      });
      throw error;
    }

    console.log('✅ [sendEmail] Resend email sent successfully!');
    console.log('✅ [sendEmail] Data:', data);
    return data;
  } catch (exception) {
    console.error('❌ [sendEmail] Unexpected error:', exception);
    log({
      message: `Unexpected error when sending email: ${exception}`,
      type: "error",
      mention: true,
    });
    throw exception;
  }
};
