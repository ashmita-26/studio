"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
  setupRecaptcha: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<UserCredential>;
  updateUserProfile: (user: User, profile: { displayName?: string, photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Extend window type for reCAPTCHA
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }
    // Manually update user state after profile update
    setUser(auth.currentUser);
    return userCredential;
  };

  const setupRecaptcha = (phoneNumber: string) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
    return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  }

  const confirmOtp = (confirmationResult: ConfirmationResult, otp: string) => {
    return confirmationResult.confirm(otp);
  }
  
  const updateUserProfile = (user: User, profile: { displayName?: string, photoURL?: string }) => {
     return updateProfile(user, profile);
  }

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    setupRecaptcha,
    confirmOtp,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
