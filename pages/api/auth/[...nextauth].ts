import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { identifyUser, trackAnalytics } from "@/lib/analytics";
import { sendVerificationRequestEmail } from "@/lib/emails/send-verification-request";
import { sendWelcomeEmail } from "@/lib/emails/send-welcome";
import hanko from "@/lib/hanko";
import prisma from "@/lib/prisma";
import { CreateUserEmailProps, CustomUser } from "@/lib/types";
import { generateChecksum } from "@/lib/utils/generate-checksum";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

// This function can run for a maximum of 180 seconds
export const config = {
  maxDuration: 180,
};

export const authOptions: NextAuthOptions = {
  pages: {
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        console.log('🔑 [NextAuth] sendVerificationRequest called');
        console.log('🔑 [NextAuth] Identifier:', identifier);
        console.log('🔑 [NextAuth] URL:', url);
        console.log('🔑 [NextAuth] SEND_EMAILS:', process.env.SEND_EMAILS);
        console.log('🔑 [NextAuth] NODE_ENV:', process.env.NODE_ENV);
        
        // Fix the callbackUrl to redirect to /documents instead of /login
        const urlObj = new URL(url);
        const currentCallbackUrl = urlObj.searchParams.get('callbackUrl');
        
        // If callbackUrl points to /login, change it to /documents
        if (currentCallbackUrl && currentCallbackUrl.includes('/login')) {
          const callbackUrlObj = new URL(currentCallbackUrl);
          callbackUrlObj.pathname = '/documents';
          urlObj.searchParams.set('callbackUrl', callbackUrlObj.toString());
          url = urlObj.toString();
          console.log('🔧 [NextAuth] Fixed callbackUrl to redirect to /documents');
          console.log('🔧 [NextAuth] New URL:', url);
        }
        
        // Always send emails if SEND_EMAILS is true, otherwise only in production
        const shouldSendEmail = process.env.SEND_EMAILS === "true" || process.env.NODE_ENV === "production";
        console.log('🔑 [NextAuth] Should send email:', shouldSendEmail);
        
        if (!shouldSendEmail) {
          console.log('⚠️ [NextAuth] Email sending disabled, generating verification URL only');
          const checksum = generateChecksum(url);
          const verificationUrlParams = new URLSearchParams({
            verification_url: url,
            checksum,
          });
          const verificationUrl = `${process.env.NEXTAUTH_URL}/verify?${verificationUrlParams}`;
          console.log("[Login URL]", verificationUrl);
          return;
        } else {
          console.log('📧 [NextAuth] Calling sendVerificationRequestEmail...');
          await sendVerificationRequestEmail({
            url,
            email: identifier,
          });
          console.log('✅ [NextAuth] sendVerificationRequestEmail completed');
        }
      },
    }),
  ].filter(Boolean) as any[],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        // For Vercel deployments, only set domain if it's the main papermark.io domain
        domain: VERCEL_DEPLOYMENT && process.env.NEXTAUTH_URL?.includes("papermark.io") 
          ? ".papermark.io" 
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!token.email) {
        return {};
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      (session.user as CustomUser) = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
  events: {
    async createUser(message) {
      const params: CreateUserEmailProps = {
        user: {
          name: message.user.name,
          email: message.user.email,
        },
      };

      await identifyUser(message.user.email ?? message.user.id);
      await trackAnalytics({
        event: "User Signed Up",
        email: message.user.email,
        userId: message.user.id,
      });

      await sendWelcomeEmail(params);
    },
    async signIn(message) {
      await identifyUser(message.user.email ?? message.user.id);
      await trackAnalytics({
        event: "User Signed In",
        email: message.user.email,
      });
    },
  },
};

export default NextAuth(authOptions);
