"use client";

import { useAdminStats } from "@/api/admin-api/stats/stats.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StatsSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AdminStats = () => {
  const { data, isLoading, isError } = useAdminStats();

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load stats</p>;
  }

  const stats = data?.data;

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers },
    { title: "Total Providers", value: stats?.totalProviders },
    { title: "Total Customers", value: stats?.totalCustomers },
    { title: "Total Orders", value: stats?.totalOrders },
    { title: "Pending Orders", value: stats?.totalPendingOrders },
    { title: "Completed Orders", value: stats?.totalCompletedOrders },
    { title: "Cancelled Orders", value: stats?.totalCancelledOrders },
    { title: "Delivered Orders", value: stats?.totalDeliveredOrders },
    { title: "Total Menus", value: stats?.totalMenus },
    { title: "Total Categories", value: stats?.totalCategories },
    { title: "Total Reviews", value: stats?.totalReviews },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((item) => (
        <Card key={item.title}>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              {item.title}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.value ?? 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
