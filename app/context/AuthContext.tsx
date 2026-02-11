"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"
import { LoginDto } from "../types/auth"
import { useRouter } from "next/navigation"
import { DASHBOARD_CREATE_ORDER, LOGIN } from "../constants/frontendRoute"
import { TOKEN_KEY } from "../constants/auth"
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (values: LoginDto) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);


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
        try {
            const data = await authService.login(values);
            const jwt = data.accessToken ?? data.access_token ?? data.token;
            if (!jwt) {
                throw new Error("No token received from server");
            }
            localStorage.setItem(TOKEN_KEY, jwt);
            setToken(jwt);
            router.push(DASHBOARD_CREATE_ORDER);
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || "Login failed";
            console.error("Login error:", message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        router.push(LOGIN);
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