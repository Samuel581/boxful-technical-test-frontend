"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Table, DatePicker, Button, Space, message } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { ordersSerivice } from "@/app/services/ordersService";
import type { Order } from "@/app/types/order";
import { COLOR_SECTION_BG, COLOR_SUCCESS, COLOR_SUCCESS_BG } from "@/app/constants/colors";
import { Download } from "lucide-react";
import { ordersToCsv, downloadCsv } from "@/app/utils/exportOrders";

const PAGE_SIZE_OPTIONS = ["5", "10", "20"];

export default function OrderHistory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;
  });
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    if (start && end) {
      const startDay = dayjs(start);
      const endDay = dayjs(end);
      if (startDay.isValid() && endDay.isValid()) return [startDay, endDay];
    }
    return null;
  });

  const fetchOrders = useCallback(async (
    currentPage: number,
    currentPageSize: number,
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    setLoading(true);
    try {
      const response = await ordersSerivice.getAll({
        page: currentPage,
        limit: currentPageSize,
        startDate: dates?.[0]?.startOf("day").toISOString(),
        endDate: dates?.[1]?.endOf("day").toISOString(),
      });
      setOrders(response.data);
      setTotal(response.meta.total);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al cargar las órdenes";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(page, pageSize, dateRange);
  }, [page, pageSize, dateRange, fetchOrders]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (dateRange?.[0]) params.set("startDate", dateRange[0].format("YYYY-MM-DD"));
    if (dateRange?.[1]) params.set("endDate", dateRange[1].format("YYYY-MM-DD"));
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [page, dateRange, pathname, router]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setPage(1);
    setDateRange(dates);
  };

  const handleClearFilters = () => {
    setPage(1);
    setDateRange(null);
  };

  const [exporting, setExporting] = useState(false);

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const allOrders = await ordersSerivice.getAllForExport({
        startDate: dateRange?.[0]?.startOf("day").toISOString(),
        endDate: dateRange?.[1]?.endOf("day").toISOString(),
      });
      if (allOrders.length === 0) {
        message.warning("No hay órdenes para exportar");
        return;
      }
      const csv = ordersToCsv(allOrders);
      const dateSuffix = new Date().toISOString().slice(0, 10);
      downloadCsv(csv, `ordenes_${dateSuffix}.csv`);
      message.success(`${allOrders.length} órdenes exportadas`);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al exportar las órdenes";
      message.error(msg);
    } finally {
      setExporting(false);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newPage = pagination.current ?? 1;
    const newPageSize = pagination.pageSize ?? 10;
    if (newPageSize !== pageSize) {
      setPage(1);
      setPageSize(newPageSize);
    } else {
      setPage(newPage);
    }
  };

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
            backgroundColor: COLOR_SUCCESS_BG,
            color: COLOR_SUCCESS,
            fontWeight: 500,
          }}
        >
          {record.packages.length}
        </span>
      ),
    },
  ];

  return (
    <div style={{ background: COLOR_SECTION_BG, padding: 24, borderRadius: 8 }}>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={handleDateChange}
          placeholder={["Fecha inicio", "Fecha fin"]}
          size="middle"
          style={{ width: 300 }}
        />
        {dateRange && (
          <Button size="middle" onClick={handleClearFilters}>
            Limpiar filtro
          </Button>
        )}
        <Button
          size="middle"
          icon={<Download size={16} />}
          loading={exporting}
          onClick={handleExportCsv}
        >
          Descargar CSV
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} órdenes`,
        }}
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
}
