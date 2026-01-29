"use client";
import { useUsers } from "@/api/admin-api/user/user.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import UserTable from "../user-table/user-table";

const Provider = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  //! get provider
  const { data: users, isLoading } = useUsers({
    page,
    limit,
    search,
    role: "provider",
  });

  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  return (
    <section>
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* //? Header */}
          <Header
            title={"Providers"}
            description={"Manage and search all providers"}
          />
        </div>
      </div>
      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden my-5">
        <SearchField
          placeholder="Search providers..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      <UserTable
        users={users?.data?.data}
        serialNumber={serialNumber}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Provider;
