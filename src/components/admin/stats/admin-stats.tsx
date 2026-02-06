import { cookies } from "next/headers";

async function getAdminStats() {
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
    throw new Error("Failed to fetch admin stats");
  }

  return res.json();
}

export default async function AdminStats() {
  const response = await getAdminStats();

  // ✅ IMPORTANT: backend structure অনুযায়ী
  const stats = response.data;

  const statCards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Providers", value: stats.totalProviders },
    { title: "Total Customers", value: stats.totalCustomers },
    { title: "Total Orders", value: stats.totalOrders },
    { title: "Pending Orders", value: stats.totalPendingOrders },
    { title: "Completed Orders", value: stats.totalCompletedOrders },
    { title: "Cancelled Orders", value: stats.totalCancelledOrders },
    { title: "Delivered Orders", value: stats.totalDeliveredOrders },
    { title: "Total Menus", value: stats.totalMenus },
    { title: "Total Categories", value: stats.totalCategories },
    { title: "Total Reviews", value: stats.totalReviews },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((item) => (
        <div key={item.title} className="border rounded p-4">
          <p className="text-sm text-gray-500">{item.title}</p>
          <p className="text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
