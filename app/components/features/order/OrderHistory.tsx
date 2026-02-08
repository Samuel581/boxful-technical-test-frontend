"use client";

import React, { useState } from "react";
import { DatePicker, Button, Table, Space } from "antd";
import type { TableColumnsType } from "antd";

const { RangePicker } = DatePicker;

const PRIMARY_BUTTON_STYLE = {
  backgroundColor: "#4242B5",
  borderColor: "#4242B5",
};

export interface OrderHistoryRecord {
  key: string;
  orderNo: string;
  nombre: string;
  apellidos: string;
  departamento: string;
  municipio: string;
  paquetes: number;
}

const MOCK_DATA: OrderHistoryRecord[] = [
  {
    key: "1",
    orderNo: "3446788",
    nombre: "Julio",
    apellidos: "Almendorez",
    departamento: "San Salvador",
    municipio: "San Salvador",
    paquetes: 4,
  },
  {
    key: "2",
    orderNo: "3446789",
    nombre: "María",
    apellidos: "García López",
    departamento: "La Libertad",
    municipio: "Santa Tecla",
    paquetes: 2,
  },
  {
    key: "3",
    orderNo: "3446790",
    nombre: "Carlos",
    apellidos: "Rodríguez Martínez",
    departamento: "San Salvador",
    municipio: "Soyapango",
    paquetes: 6,
  },
  {
    key: "4",
    orderNo: "3446791",
    nombre: "Ana",
    apellidos: "Hernández Flores",
    departamento: "Santa Ana",
    municipio: "Santa Ana",
    paquetes: 1,
  },
  {
    key: "5",
    orderNo: "3446792",
    nombre: "Luis",
    apellidos: "Pérez Sánchez",
    departamento: "San Miguel",
    municipio: "San Miguel",
    paquetes: 3,
  },
  {
    key: "6",
    orderNo: "3446793",
    nombre: "Gabriela",
    apellidos: "Días López",
    departamento: "San Salvador",
    municipio: "San Salvador",
    paquetes: 5,
  },
];

export default function OrderHistory() {
  const [dateRange, setDateRange] = useState<[unknown, unknown] | null>(null);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [dataSource] = useState<OrderHistoryRecord[]>(MOCK_DATA);

  const columns: TableColumnsType<OrderHistoryRecord> = [
    {
      title: "No. de orden",
      dataIndex: "orderNo",
      key: "orderNo",
      width: 120,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellidos",
      dataIndex: "apellidos",
      key: "apellidos",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
    },
    {
      title: "Municipio",
      dataIndex: "municipio",
      key: "municipio",
    },
    {
      title: "Paquetes en orden",
      dataIndex: "paquetes",
      key: "paquetes",
      width: 140,
      render: (value: number) => (
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
          {value}
        </span>
      ),
    },
  ];

  const rowSelection = {
    type: "radio" as const,
    selectedRowKeys: selectedRowKey ? [selectedRowKey] : [],
    onChange: (_: React.Key[], selectedRows: OrderHistoryRecord[]) => {
      setSelectedRowKey(selectedRows[0]?.key ?? null);
    },
  };

  const handleBuscar = () => {
    console.log("Buscar con rango:", dateRange);
    // TODO: filtrar por fecha
  };

  const handleDescargar = () => {
    console.log("Descargar órdenes", selectedRowKey);
    // TODO: descargar selección o todas
  };

  return (
    <div style={{ background: "#fafafa", padding: 24, borderRadius: 8 }}>
      <Space
        wrap
        size="middle"
        style={{ marginBottom: 24, alignItems: "flex-end" }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#595959",
              marginBottom: 4,
            }}
          >
            Rango de fechas
          </div>
          <RangePicker
            size="large"
            style={{ width: 220 }}
            value={dateRange}
            onChange={(range) => setDateRange(range)}
            placeholder={["Enero", "Julio"]}
            format="DD/MM/YYYY"
          />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleBuscar}
          style={PRIMARY_BUTTON_STYLE}
        >
          Buscar
        </Button>
        <Button size="large" onClick={handleDescargar}>
          Descargar órdenes
        </Button>
      </Space>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
}
