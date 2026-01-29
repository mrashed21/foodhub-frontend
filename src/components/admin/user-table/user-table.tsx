"use client";

import { useState } from "react";
import { toast } from "sonner";

import { UserInterface, useUpdateUser } from "@/api/admin-api/user/user.api";

import TableSkeleton from "@/components/custom/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/hook/date-format";

//! Types

type ActiveUserAction = {
  id: string;
  action: "activate" | "suspend";
} | null;

const UserTable = ({
  users,
  serialNumber,
  isLoading,
}: {
  users: UserInterface[];
  serialNumber: (index: number) => number;
  isLoading: boolean;
}) => {
  const [activeUser, setActiveUser] = useState<ActiveUserAction>(null);

  const { mutateAsync: updateUserStatus, isPending } = useUpdateUser();

  const hasProvider = users?.some((u) => u.role === "provider");

  //! Helpers

  const confirmAction = async () => {
    if (!activeUser) return;

    try {
      await updateUserStatus({
        payload: {
          id: activeUser.id,
          status: activeUser.action,
        },
      });

      toast.success(
        activeUser.action === "activate"
          ? "User activated successfully"
          : "User suspended successfully",
      );

      setActiveUser(null);
    } catch (error) {
      toast.error("Failed to update user status");
      setActiveUser(null);
    }
  };

  if (isLoading) {
    return <TableSkeleton columns={10} rows={5} />;
  }

  if (!users || users.length === 0) {
    return <div className="py-6 text-center">No users found</div>;
  }

  return (
    <>
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
              <TableHead>Status</TableHead>
              <TableHead className="pr-10 text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="pl-5">{serialNumber(index)}</TableCell>

                <TableCell className="font-medium">{user.name}</TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || "-"}</TableCell>

                <TableCell className="capitalize">{user.role}</TableCell>

                {hasProvider && (
                  <TableCell>
                    {user.role === "provider" ? user.provider_name || "-" : "-"}
                  </TableCell>
                )}

                <TableCell>{formatDate(user.createdAt)}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      user.status === "activate" ? "default" : "destructive"
                    }
                    className="capitalize"
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-end">
                  {user.status === "activate" ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setActiveUser({
                          id: user.id,
                          action: "suspend",
                        })
                      }
                    >
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() =>
                        setActiveUser({
                          id: user.id,
                          action: "activate",
                        })
                      }
                    >
                      Activate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* //? Confirmation Modal  */}

      <AlertDialog open={!!activeUser} onOpenChange={() => setActiveUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>

            <AlertDialogDescription>
              {activeUser?.action === "suspend"
                ? "This will suspend the user and restrict access."
                : "This will activate the user account."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={confirmAction} disabled={isPending}>
              {isPending ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserTable;
