"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer } from "react";
import { Spin } from "antd";
import { LOGIN } from "@/app/constants/frontendRoute";

export default function ProtectedRoute({
    children,
}: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace(LOGIN)
        }
    }, [loading, isAuthenticated, router])

    if (loading) {
        return (
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                minHeight: "100vh"
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
      }
  
      return <>{children}</>;
}