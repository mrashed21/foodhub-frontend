import { cookies } from "next/headers";

export async function proxyGET(url: string) {
  const cookieStore = cookies();

  const res = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
