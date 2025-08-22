"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { Leaf, Menu, User, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

function UserNav() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
            <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href="/account">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline text-lg">PSG Nursery</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!loading && <UserNav />}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg transition-colors hover:text-accent",
                        pathname === link.href ? "text-accent" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t">
                  {!loading && !user ? (
                    <>
                      <Link href="/login" className="flex items-center w-full text-lg">
                        <Button variant="ghost" className="w-full justify-start">Login</Button>
                      </Link>
                      <Link href="/signup" className="flex items-center w-full text-lg mt-2">
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Sign Up</Button>
                      </Link>
                    </>
                  ) : !loading && user ? (
                     <Link href="/account" className="flex items-center w-full text-lg mt-2">
                      <Button variant="outline" className="w-full justify-start"><User className="mr-2 h-5 w-5"/>My Account</Button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
