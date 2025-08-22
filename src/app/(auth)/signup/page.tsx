"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ConfirmationResult } from "firebase/auth";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const { setupRecaptcha, confirmOtp, updateUserProfile } = useAuth();
  const router = useRouter();

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!window.recaptchaVerifier) {
        setupRecaptcha('recaptcha-container');
      }
      const result = await setupRecaptcha(mobileNumber);
      setConfirmationResult(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    if (!confirmationResult) {
      setError("Please send OTP first.");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await confirmOtp(confirmationResult, otp);
      if(userCredential.user) {
        await updateUserProfile(userCredential.user, { displayName: name });
      }
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Leaf className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Signup Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!confirmationResult ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" placeholder="+91 12345 67890" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <div id="recaptcha-container"></div>
            </>
          ) : (
             <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" placeholder="123456" required value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          {!confirmationResult ? (
             <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSendOtp} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          ) : (
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSignup} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          )}

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
