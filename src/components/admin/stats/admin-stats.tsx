"use client";

import { useEffect, useState } from "react";

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) throw new Error();
        setStats(json.data);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return <p>Failed to load admin stats</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Orders: {stats.totalOrders}</p>
    </div>
  );
}
