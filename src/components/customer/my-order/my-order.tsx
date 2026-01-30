"use client";

import { useMyOrders } from "@/api/customer-api/order.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";

const MyOrder = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError } = useMyOrders({ page, limit, search });

  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  console.log(data);
  return (
    <section className="space-y-6 w-full">
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          {/* //? Header */}
          <Header
            title={"My Orders"}
            description={"Manage and search your orders"}
          />
         
        </div>
      </div>

      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search order invoice..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      {/* //? Table  */}
      {/* <CategoryTable
        categoryData={data?.data?.data}
        isLoading={isLoading}
        serialNumber={serialNumber}
        handleEdit={handleEdit}
      /> */}
    </section>
  );
};

export default MyOrder;
