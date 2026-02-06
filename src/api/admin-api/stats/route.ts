import { proxyGET } from "@/api/_proxy";

export async function GET() {
  return proxyGET(
    "https://backend-foodhub-mrashed21.vercel.app/api/v1/stats/admin",
  );
}
