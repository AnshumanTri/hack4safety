"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { mockUser } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("police_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    if (email && password) {
      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("police_user", JSON.stringify(mockUser))
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("police_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
