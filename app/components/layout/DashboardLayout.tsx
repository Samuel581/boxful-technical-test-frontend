"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Button } from "antd";
import NavLinks from "@/app/components/features/order/NavLinks";
import { useAuth } from "@/app/context/AuthContext";
import { DASHBOARD, DASHBOARD_CREATE_ORDER, DASHBOARD_HISTORY } from "@/app/constants/frontendRoute";
import { COLOR_PAGE_BG, COLOR_BORDER, COLOR_BRAND_ORANGE, COLOR_HEADER_BG, COLOR_TEXT_DARK } from "@/app/constants/colors";

const { Sider, Header, Content } = Layout;

const SIDEBAR_WIDTH = 240;
const TOP_BAR_HEIGHT = 56;
  
const routeTitles: Record<string, string> = {
  [DASHBOARD]: "Dashboard",
  [DASHBOARD_CREATE_ORDER]: "Crear orden",
  [DASHBOARD_HISTORY]: "Historial",
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
          background: COLOR_PAGE_BG,
          borderRight: `1px solid ${COLOR_BORDER}`,
          padding: "24px 16px",
        }}
      >

       {/* Logo */}
        <Link href={DASHBOARD} style={{ display: "block", marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                color: COLOR_BRAND_ORANGE,
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
            background: COLOR_HEADER_BG,
            borderBottom: `1px solid ${COLOR_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: COLOR_TEXT_DARK,
            }}
          >
            {pageTitle}
          </span>
          <Button type="text" onClick={logout} style={{ color: COLOR_TEXT_DARK }}>
            Cerrar sesión
          </Button>
        </Header>
        <Content
          style={{
            padding: 24,
            background: COLOR_PAGE_BG,
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
