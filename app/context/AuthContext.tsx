"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"
import { LoginDto } from "../types/auth"
import { useRouter } from "next/navigation"
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (values: LoginDto) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem(TOKEN_KEY);
        if (stored) {
            setToken(stored)
        }
        setLoading(false)
    }, [])

    const login = async (values: LoginDto) => {
        const data = await authService.login(values);
        const jwt = data.access_token ?? data.token;
        localStorage.setItem(TOKEN_KEY, jwt);
        router.push('/dashboard/create-order');
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        router.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                loading,
                login,
                logout
            }}
        >
            {children
        }</AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}