import { NextRequest } from "next/server";

const BACKEND_BASE = "https://backend-foodhub-mrashed21.vercel.app/api/v1/";

async function forward(req: NextRequest, method: string, path: string[]) {
  const url = BACKEND_BASE + path.join("/") + "?" + req.nextUrl.searchParams;

  const res = await fetch(url, {
    method,
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      origin: req.headers.get("origin") ?? "",
      "user-agent": req.headers.get("user-agent") ?? "",
      "content-type": "application/json",
    },
    body: method === "GET" || method === "HEAD" ? undefined : await req.text(),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function GET(req: NextRequest, { params }: any) {
  return forward(req, "GET", params.path);
}

export async function PATCH(req: NextRequest, { params }: any) {
  return forward(req, "PATCH", params.path);
}

export async function POST(req: NextRequest, { params }: any) {
  return forward(req, "POST", params.path);
}

export async function DELETE(req: NextRequest, { params }: any) {
  return forward(req, "DELETE", params.path);
}
