"use client";

import { LogOut, Menu, ShoppingCart, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client";
import { SessionUser, User } from "@/types/user-types";
import Container from "../container/container";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Meals", href: "/meals" },
  { label: "Restaurants", href: "/providers" },
];

const getDashboardRoute = (role: User["role"]) => {
  switch (role) {
    case "customer":
      return "/user/orders";
    case "provider":
      return "/vendor";
    case "admin":
      return "/admin";
    default:
      return "/";
  }
};

const Navbar = () => {
  const router = useRouter();
  const { data } = authClient.useSession();
  const user: SessionUser | null = data?.user ?? null;

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCart = () => {
      const cart = JSON.parse(localStorage.getItem("foodhub_cart") || "[]");
      setCartCount(cart.length);
    };

    syncCart();
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary ml-4">
            FoodHub
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {!user || !user.emailVerified ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardRoute(user.role!)}>Dashboard</Link>
                  </DropdownMenuItem>

                  <Separator />

                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                      await authClient.signOut();
                      router.replace("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-4 px-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}

                <Link href="/cart" className="flex items-center gap-2">
                  <div className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-4 min-w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center px-1">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>

                <Separator />

                {!user || !user.emailVerified ? (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={getDashboardRoute(user.role!)}>
                      <Button variant="ghost" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={async () => {
                        await authClient.signOut();
                        router.replace("/");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
