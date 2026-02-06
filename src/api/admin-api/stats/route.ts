import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  const res = await fetch(
    "https://backend-foodhub-mrashed21.vercel.app/api/v1/stats/admin",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
