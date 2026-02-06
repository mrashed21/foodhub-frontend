"use client";
import { BASE_URL } from "@/api/base-url";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: session } = authClient.useSession(); // ✅ session চেক করুন

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `${BASE_URL}/user?role=admin&page=${page}&limit=${limit}&search=${search}`,
        {
          method: "GET",
          credentials: "include", // ✅ এটা আছে
          headers: {
            "Content-Type": "application/json",
            // যদি token localStorage এ থাকে তাহলে:
            // "Authorization": `Bearer ${token}`
          },
        },
      );

      const data = await response.json();
      console.log("all user: ", data);
    };

    if (session) {
      // ✅ session থাকলে তবেই fetch করুন
      fetchUsers();
    }
  }, [page, limit, search, session]);

  // //! get admin
  // const { data: users, isLoading } = useUsers({
  //   page,
  //   limit,
  //   search,
  //   role: "admin",
  // });

  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  return (
    <section>
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      {/* <UserTable
        users={users?.data?.data}
        serialNumber={serialNumber}
        isLoading={isLoading}
      /> */}
    </section>
  );
};

export default Admin;
