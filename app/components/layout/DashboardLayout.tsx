"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Button } from "antd";
import NavLinks from "@/app/components/features/order/NavLinks";
import { useAuth } from "@/app/context/AuthContext";

const { Sider, Header, Content } = Layout;

const SIDEBAR_WIDTH = 240;
const TOP_BAR_HEIGHT = 56;
  
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/create-order": "Crear orden",
  "/dashboard/history": "Historial",
};

function getPageTitle(pathname: string): string {
  return routeTitles[pathname] ?? "Dashboard";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const { logout } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={SIDEBAR_WIDTH}
        style={{
          background: "#f8f9fa",
          borderRight: "1px solid #f0f0f0",
          padding: "24px 16px",
        }}
      >

       {/* Logo */}
        <Link href="/dashboard" style={{ display: "block", marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#ff6b35",
                borderRadius: 6,
              }}
            />
            <span
              style={{
                color: "#ff6b35",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "-0.02em",
              }}
            >
              boxful
            </span>
          </div>
        </Link>

        <NavLinks />
      </Sider>

      <Layout>
        <Header
          style={{
            height: TOP_BAR_HEIGHT,
            padding: "0 24px",
            background: "#F2EEE6",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#262626",
            }}
          >
            {pageTitle}
          </span>
          <Button type="text" onClick={logout} style={{ color: "#262626" }}>
            Cerrar sesión
          </Button>
        </Header>
        <Content
          style={{
            padding: 24,
            background: "#f8f9fa",
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
