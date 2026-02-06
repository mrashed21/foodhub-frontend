import { cookies } from "next/headers";

async function getAdminStats() {
  try {
    const cookieStore = cookies();

    const res = await fetch(
      "https://backend-foodhub-mrashed21.vercel.app/api/v1/stats/admin",
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Backend error status:", res.status);
      return null;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export default async function AdminStats() {
  const response = await getAdminStats();

  // 🔴 VERY IMPORTANT: null guard
  if (!response || !response.success) {
    return <div className="text-red-500">Failed to load admin stats</div>;
  }

  const stats = response.data;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div>{stats.totalUsers}</div>
      <div>{stats.totalProviders}</div>
      <div>{stats.totalCustomers}</div>
      <div>{stats.totalOrders}</div>
    </div>
  );
}
