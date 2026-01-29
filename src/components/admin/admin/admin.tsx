"use client";
import { useUsers } from "@/api/admin-api/user/user.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import { useState } from "react";
import UserTable from "../user-table/user-table";
import useSerialNumber from "@/hook/use-serial";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  //! get admin
  const { data: users ,isLoading} = useUsers({ page, limit, search, role: "admin" });

 // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  return (
    <section>
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          {/* //? Header */}
          <Header
            title={"Admins"}
            description={"Manage and search all admins"}
          />
        </div>
      </div>

      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden my-5">
        <SearchField
          placeholder="Search admins..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      <UserTable users={users?.data?.data} serialNumber={serialNumber} isLoading={isLoading} />
    </section>
  );
};

export default Admin;
