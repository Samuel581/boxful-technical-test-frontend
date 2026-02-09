"use client";

import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import type { TableColumnsType } from "antd";
import { ordersSerivice } from "@/app/services/ordersService";
import type { Order } from "@/app/types/order";

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersSerivice.getAll();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const columns: TableColumnsType<Order> = [
    {
      title: "No. de orden",
      dataIndex: "id",
      key: "id",
      width: 140,
      render: (value: string) => value.slice(-8).toUpperCase(),
    },
    {
      title: "Nombre",
      dataIndex: "recipientNames",
      key: "recipientNames",
    },
    {
      title: "Apellidos",
      dataIndex: "recipientLastNames",
      key: "recipientLastNames",
    },
    {
      title: "Departamento",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Municipio",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Paquetes en orden",
      key: "packages",
      width: 140,
      render: (_: unknown, record: Order) => (
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 4,
            backgroundColor: "#f6ffed",
            color: "#52c41a",
            fontWeight: 500,
          }}
        >
          {record.packages.length}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ background: "#fafafa", padding: 24, borderRadius: 8 }}>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
}
