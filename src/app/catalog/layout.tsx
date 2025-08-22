"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { categories } from "@/lib/placeholder-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-2">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/catalog/${category.slug}`}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-foreground/80 transition-all hover:bg-primary/20 hover:text-foreground",
            pathname === `/catalog/${category.slug}` ? "bg-primary/20 text-foreground" : ""
          )}
        >
          <category.icon className="h-5 w-5" />
          {category.name}
        </Link>
      ))}
    </nav>
  );
}


export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4">
        <div className="grid md:grid-cols-[240px_1fr] gap-8 py-8">
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <h3 className="text-xl font-headline font-semibold mb-4 px-4">Categories</h3>
              <SidebarNav />
            </div>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
