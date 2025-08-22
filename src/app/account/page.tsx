"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    setName(user?.displayName || '');
    setEmail(user?.email || '');
  }, [user, loading, router]);


  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
       <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Skeleton className="h-10 w-36" />
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">My Account</CardTitle>
              <CardDescription>Manage your profile and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="destructive" className="w-full md:w-auto" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
