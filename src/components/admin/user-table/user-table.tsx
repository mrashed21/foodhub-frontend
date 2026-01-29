import { UserInterface } from "@/api/admin-api/user/user.api";
import TableSkeleton from "@/components/custom/table-skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = ({
  users,
  serialNumber,
  isLoading,
}: {
  users: UserInterface[];
  serialNumber: (index: number) => number;
  isLoading: boolean;
}) => {
  const hasProvider = users?.some((u) => u.role === "provider");

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleSuspend = (id: string) => {
    console.log("Suspend:", id);
  };

  const handleActivate = (id: string) => {
    console.log("Activate:", id);
  };

  if (isLoading) {
    return <TableSkeleton columns={10} rows={5} />;
  }

  if (users?.length === 0) {
    return <div className="text-center py-6">No users found</div>;
  }

  return (
    <section className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-5">S.N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>

            {hasProvider && <TableHead>Provider Name</TableHead>}

            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="pl-5">{serialNumber(index)}</TableCell>
              <TableCell className="font-medium">{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone || "-"}</TableCell>
              <TableCell className="capitalize">{user?.role}</TableCell>

              {hasProvider && (
                <TableCell>
                  {user?.role === "provider" ? user?.provider_name || "-" : "-"}
                </TableCell>
              )}

              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>{formatDate(user.updatedAt)}</TableCell>

              <TableCell>
                <span
                  className={`text-sm font-medium ${
                    user?.status === "activate"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user?.status}
                </span>
              </TableCell>

              <TableCell className="text-right">
                {user?.status === "activate" ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleSuspend(user.id)}
                  >
                    Suspend
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => handleActivate(user.id)}>
                    Activate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default UserTable;
