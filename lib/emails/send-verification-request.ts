import LoginLink from "@/components/emails/verification-link";

import { sendEmail } from "@/lib/resend";

import { generateChecksum } from "../utils/generate-checksum";

export const sendVerificationRequestEmail = async (params: {
  email: string;
  url: string;
}) => {
  console.log('🔐 [sendVerificationRequestEmail] Starting...');
  console.log('🔐 [sendVerificationRequestEmail] Email:', params.email);
  console.log('🔐 [sendVerificationRequestEmail] URL:', params.url);
  
  const { url, email } = params;
  const checksum = generateChecksum(url);
  const verificationUrlParams = new URLSearchParams({
    verification_url: url,
    checksum,
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify?${verificationUrlParams}`;
  console.log('🔐 [sendVerificationRequestEmail] Verification URL:', verificationUrl);
  
  const emailTemplate = LoginLink({ url: verificationUrl });
  try {
    console.log('🔐 [sendVerificationRequestEmail] Calling sendEmail...');
    await sendEmail({
      to: email as string,
      subject: "Welcome to Papermark!",
      react: emailTemplate,
      test: process.env.NODE_ENV === "development",
    });
    console.log('✅ [sendVerificationRequestEmail] Email sent successfully!');
  } catch (e) {
    console.error('❌ [sendVerificationRequestEmail] Error:', e);
  }
};
