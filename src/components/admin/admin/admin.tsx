// "use client";
// import { BASE_URL } from "@/api/base-url";
// import Header from "@/components/custom/header";
// import { SearchField } from "@/components/custom/search-field";
// import useSerialNumber from "@/hook/use-serial";
// import { authClient } from "@/lib/auth-client";
// import { useEffect, useState } from "react";

// const Admin = () => {
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState("");

//   const { data: session } = authClient.useSession(); // ✅ session চেক করুন

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch(
//         `${BASE_URL}/user?role=admin&page=${page}&limit=${limit}&search=${search}`,
//         {
//           method: "GET",
//           credentials: "include", // ✅ এটা আছে
//           headers: {
//             "Content-Type": "application/json",
//             // যদি token localStorage এ থাকে তাহলে:
//             // "Authorization": `Bearer ${token}`
//           },
//         },
//       );

//       const data = await response.json();
//       console.log("all user: ", data);
//     };

//     if (session) {
//       // ✅ session থাকলে তবেই fetch করুন
//       fetchUsers();
//     }
//   }, [page, limit, search, session]);

//   // //! get admin
//   // const { data: users, isLoading } = useUsers({
//   //   page,
//   //   limit,
//   //   search,
//   //   role: "admin",
//   // });

//   // *dynamic serial with page, limit
//   const serialNumber = useSerialNumber(page, limit);

//   return (
//     <section>
//       {/* //? Header  */}
//       <div className="w-full max-w-full overflow-hidden">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           {/* //? Header */}
//           <Header
//             title={"Admins"}
//             description={"Manage and search all admins"}
//           />
//         </div>
//       </div>

//       {/* //? Search  */}
//       <div className="w-full max-w-sm overflow-hidden my-5">
//         <SearchField
//           placeholder="Search admins..."
//           onSearch={(v) => {
//             setPage(1);
//             setSearch(v);
//           }}
//         />
//       </div>

//       {/* <UserTable
//         users={users?.data?.data}
//         serialNumber={serialNumber}
//         isLoading={isLoading}
//       /> */}
//     </section>
//   );
// };

// export default Admin;

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
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const { data: session, isPending } = authClient.useSession();

  console.log("session: ", session);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("🔍 Fetching users...");
        console.log("Session:", session);

        const response = await fetch(
          `${BASE_URL}/user?role=admin&page=${page}&limit=${limit}&search=${search}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers));

        const data = await response.json();

        if (!response.ok) {
          console.error("❌ Error:", data);
          setError(data.message || "Failed to fetch users");
          return;
        }

        console.log("✅ Success:", data);
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        // setError("Network error");
      }
    };

    if (session) {
      fetchUsers();
    } else if (!isPending) {
      console.log("⚠️ No session found");
    }
  }, [page, limit, search, session, isPending]);

  const serialNumber = useSerialNumber(page, limit);

  // Loading state
  if (isPending) {
    return <div>Loading session...</div>;
  }

  // Not logged in
  if (!session) {
    return <div>Please login first</div>;
  }

  return (
    <section>
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Header
            title={"Admins"}
            description={"Manage and search all admins"}
          />
        </div>
      </div>

      <div className="w-full max-w-sm overflow-hidden my-5">
        <SearchField
          placeholder="Search admins..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      {/* Debug info */}
      <div className="my-4 p-4 bg-gray-100 rounded">
        <p>Session: {session?.user?.email || "No session"}</p>
        <p>Session User ID: {session?.user?.id || "N/A"}</p>
        {error && <p className="text-red-600">Error: {error}</p>}
      </div>

      {/* <UserTable
        users={users?.data?.data}
        serialNumber={serialNumber}
        isLoading={isPending}
      /> */}
    </section>
  );
};

export default Admin;
