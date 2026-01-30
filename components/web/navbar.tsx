"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const categories = useQuery(api.categories.list);

  return (
    <nav className="w-full py-4 px-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        My<span className="text-primary ">Menu</span>
      </Link>

      {/* Hidden on mobile */}
      <div className="hidden md:flex items-center gap-2">
        <Link className={buttonVariants({ variant: "ghost" })} href="/">
          Home
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/menu">
          Menu
        </Link>
      </div>
      {/* Hidden on mobile */}

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-12 w-12 transition-transform active:scale-90"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
            w-64
            data-[state=open]:animate-in
            data-[state=open]:fade-in
            data-[state=open]:slide-in-from-right
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out
            data-[state=closed]:slide-out-to-right
            data-[state=open]:duration-300
            data-[state=closed]:duration-200"
          >
            <SheetHeader className="bg-secondary">
              <SheetTitle className="text-2xl">หมวดหมู่</SheetTitle>
              <SheetDescription>Navigate through categories</SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              {/* Loading skeleton */}
              {categories === undefined && (
                <div className="space-y-2 px-4">
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                </div>
              )}

              {/* Category list */}
              {categories?.map((cat) => (
                <div key={cat._id}>
                  <Link
                    href={`/menu/${cat.slug}`} // ✅ สำคัญ
                    onClick={() => setOpen(false)}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start text-xl",
                    })}
                  >
                    {cat.name}
                  </Link>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
