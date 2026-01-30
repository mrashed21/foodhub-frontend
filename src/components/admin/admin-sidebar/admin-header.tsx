"use client";

import { LogOut, Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth-client";
import { SessionUser } from "@/types/user-types";

const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    href: "/" + segments.slice(0, index + 1).join("/"),
    label: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));
};

const AdminHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const { data } = authClient.useSession();
  const user: SessionUser | null = data?.user ?? null;

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* 🔥 Sidebar Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <BreadcrumbItem key={item.href}>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="hidden md:inline font-medium">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={async () => {
                await authClient.signOut();
                router.replace("/auth/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default AdminHeader;
