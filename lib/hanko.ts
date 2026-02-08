import { tenant } from "@teamhanko/passkeys-next-auth-provider";

// Make Hanko optional - only initialize if credentials are provided
const hanko = (process.env.HANKO_API_KEY && process.env.NEXT_PUBLIC_HANKO_TENANT_ID)
  ? tenant({
      apiKey: process.env.HANKO_API_KEY!,
      tenantId: process.env.NEXT_PUBLIC_HANKO_TENANT_ID!,
    })
  : null;

export default hanko;
