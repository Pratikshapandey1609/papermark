import { useVisitorUserAgent } from "@/lib/swr/use-stats";

import VisitorUserAgentBase from "./visitor-useragent-base";

export default function VisitorUserAgent({ viewId }: { viewId: string }) {
  const { userAgent, error } = useVisitorUserAgent(viewId);

  if (error) {
    return <div>No useragent info</div>;
  }

  if (!userAgent) {
    return <div>Loading...</div>;
  }

  return <VisitorUserAgentBase userAgent={userAgent} />;
}
