"use client";

import { useProviderOrders } from "@/api/provider-api/order/order.api";
import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import ProviderOrderTable from "./order-table";

interface Option extends SelectOption {}

const statusOptions: Option[] = [
  { label: "Placed", value: "placed" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const VendorOrder = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Option | null>(null);

  const { data, isLoading } = useProviderOrders({
    page,
    limit,
    search: search || undefined,
    status: status?.value as any,
  });

  const serialNumber = useSerialNumber(page, limit);
  const orders = data?.data;

  return (
    <section className="space-y-6 w-full">
      {/* Header */}
      <Header title="Orders" description="Manage and search all orders" />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 max-w-4xl">
        <SearchField
          placeholder="Search by invoice, customer name, email"
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />

        <div className="w-52">
          <CustomSelect<Option>
            placeholder="Filter by status"
            options={statusOptions}
            value={status}
            onChange={(v) => {
              setPage(1);
              setStatus(v as Option);
            }}
            isClearable
          />
        </div>
      </div>

      {/* Orders table will go here */}
      <ProviderOrderTable
        orders={orders}
        isLoading={isLoading}
        serialNumber={serialNumber}
      />
    </section>
  );
};

export default VendorOrder;
