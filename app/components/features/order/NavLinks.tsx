"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Menu } from "antd";

const links = [
  { name: 'Crear orden', href: '/dashboard/create-order' },
  { name: 'Historial', href: '/dashboard/history' },
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
