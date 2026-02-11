"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Menu } from "antd";
import { Plus, Search } from 'lucide-react'
import { DASHBOARD_CREATE_ORDER, DASHBOARD_HISTORY } from "@/app/constants/frontendRoute";

const links = [
  { name: 'Crear orden', href: DASHBOARD_CREATE_ORDER, icon: Plus },
  { name: 'Historial', href: DASHBOARD_HISTORY, icon: Search },
]



export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {links.map((link) => {
        return (
          <div style={{ marginBottom: 16 }} key={link.href}>
            <Link href={link.href}>
              <Button
                type={isActive(link.href) ? 'primary' : 'default'}
                block
                size="large"
                icon={<link.icon/>}
                style={{
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {link.name}
              </Button>
            </Link>
          </div>
        )
      })}



    </>
  );
}
