'use client'
import { ORDERS_API } from "../constants/backendRoutes"
import { api } from "../lib/api/axios"
import { CreateOrderDto, Order, OrdersQueryParams, PaginatedResponse } from "../types/order"

export const ordersSerivice = {

    async create(data: CreateOrderDto){
        const response = await api.post(ORDERS_API, data);
        return response.data;
    },

    async getAll(params?: OrdersQueryParams): Promise<PaginatedResponse<Order>> {
        const response = await api.get(ORDERS_API, { params });
        return response.data;
    },

    async getAllForExport(params?: Omit<OrdersQueryParams, 'page' | 'limit'>): Promise<Order[]> {
        const firstPage = await api.get(ORDERS_API, { params: { ...params, page: 1, limit: 100 } });
        const { data, meta } = firstPage.data as PaginatedResponse<Order>;
        if (meta.totalPages <= 1) return data;

        const remaining = await Promise.all(
            Array.from({ length: meta.totalPages - 1 }, (_, i) =>
                api.get(ORDERS_API, { params: { ...params, page: i + 2, limit: 100 } })
            )
        );
        return [...data, ...remaining.flatMap(r => (r.data as PaginatedResponse<Order>).data)];
    }
}
