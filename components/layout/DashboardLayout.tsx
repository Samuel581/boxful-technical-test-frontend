"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Button, Menu } from "antd";

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
  const router = useRouter();
  const pageTitle = getPageTitle(pathname);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={SIDEBAR_WIDTH}
        style={{
          background: "#ffffff",
          borderRight: "1px solid #f0f0f0",
          padding: "24px 16px",
        }}
      >
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

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#595959",
            letterSpacing: "0.05em",
            marginBottom: 16,
          }}
        >
          MENÚ
        </div>

        <div style={{ marginBottom: 16 }}>
          <Link href="/dashboard/create-order">
            <Button
              type="primary"
              block
              size="large"
              style={{
                backgroundColor: "#4242B5",
                borderColor: "#4242B5",
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>+</span>
              Crear orden
            </Button>
          </Link>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 14,
            color: "#262626",
          }}
          items={[
            {
              key: "/dashboard/history",
              icon: (
                <span style={{ marginRight: 8, opacity: 0.85 }}>
                  &#9776;
                </span>
              ),
              label: "Historial",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            height: TOP_BAR_HEIGHT,
            padding: "0 24px",
            background: "#f5f5f5",
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
          <span
            style={{
              fontSize: 14,
              color: "#262626",
            }}
          >
            Tu nombre
          </span>
        </Header>
        <Content
          style={{
            padding: 24,
            background: "#ffffff",
            minHeight: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
