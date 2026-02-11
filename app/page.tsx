"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { DASHBOARD_CREATE_ORDER, LOGIN } from "@/app/constants/frontendRoute";
import { Spin } from "antd";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace(DASHBOARD_CREATE_ORDER);
      } else {
        router.replace(LOGIN);
      }
    }
  }, [loading, isAuthenticated, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Spin size="large" />
    </div>
  );
}
