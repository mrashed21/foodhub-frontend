"use client";

import { useAdminOrders } from "@/api/admin-api/admin-order/order.api";
import { useUsers } from "@/api/admin-api/user/user.api";
import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import AdminOrdersTable from "./all-order-table";

interface Option extends SelectOption {}

const statusOptions: Option[] = [
  { label: "Placed", value: "placed" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Option | null>(null);

  const [userId, setUserId] = useState<string | undefined>();

  console.log(userId);
  //   order data
  const { data, isLoading } = useAdminOrders({
    page,
    limit,
    search: search || undefined,
    status: status?.value as any,
    provider: userId,
  });

  const serialNumber = useSerialNumber(page, limit);
  const orders = data?.data;

  //   providerdata
  //! get provider
  const { data: users } = useUsers({
    page: 1,
    limit: 9999,
    search,
    role: "provider",
  });

  //! category options
  const usersOptions =
    users?.data?.data?.map((item: any) => ({
      label: item.name,
      value: item.providerId,
    })) || [];

  console.log(usersOptions);
  console.log(users);
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

        <div className="min-w-52">
          <CustomSelect<SelectOption>
            placeholder="Select provider"
            options={usersOptions}
            isClearable
            onChange={(opt) => {
              if (!opt || Array.isArray(opt)) {
                setUserId(undefined);
                return;
              }
              setUserId(opt.value as string);
            }}
          />
        </div>
      </div>

      {/* Orders table will go here */}
      <AdminOrdersTable
        orders={orders}
        isLoading={isLoading}
        serialNumber={serialNumber}
      />
    </section>
  );
};

export default AllOrders;
