import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const backendURL =
    "https://backend-foodhub-mrashed21.vercel.app/api/v1/" +
    params.path.join("/");

  const res = await fetch(backendURL, {
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      origin: req.headers.get("origin") ?? "",
      "user-agent": req.headers.get("user-agent") ?? "",
    },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
