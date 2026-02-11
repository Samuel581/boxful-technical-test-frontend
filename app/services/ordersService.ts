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
    }
}
