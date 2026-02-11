'use client'
import { ORDERS_API } from "../constants/backendRoutes"
import { api } from "../lib/api/axios"
import { CreateOrderDto, Order } from "../types/order"

export const ordersSerivice = {

    async create(data: CreateOrderDto){
        const response = await api.post(ORDERS_API, data);
        return response.data;
    },

    async getAll(): Promise<{ data: Order[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
        const response = await api.get(ORDERS_API);
        return response.data;
    }
}