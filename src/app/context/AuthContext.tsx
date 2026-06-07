"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User } from "../types/user";
import { currentUser as defaultUser } from "../data/users";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mailnest_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("mailnest_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1000));

    if (!email || !password) {
      return { success: false, error: "Please fill in all fields" };
    }
    if (!email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Mock: accept any valid format
    const loggedInUser: User = {
      ...defaultUser,
      email,
    };
    setUser(loggedInUser);
    localStorage.setItem("mailnest_user", JSON.stringify(loggedInUser));
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1200));

    if (!name || !email || !password) {
      return { success: false, error: "Please fill in all fields" };
    }
    if (!email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }
    if (name.length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      phone: "",
      plan: "Basic",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    localStorage.setItem("mailnest_user", JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mailnest_user");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("mailnest_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (!email) {
      return { success: false, error: "Please enter your email" };
    }
    if (!email.includes("@")) {
      return { success: false, error: "Invalid email address" };
    }

    return { success: true };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
