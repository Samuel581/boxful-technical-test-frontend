'use client'
import { api } from "../lib/api/axios";
import { LoginDto, RegisterDto } from "../types/auth";

export const authService = {
    // TODO, separate types and the other one I cannot remenber
    async register(data: RegisterDto){
        const response = await api.post('/auth/register', data)
        return response.data;
    },

    async login(data: LoginDto){
        const response = await api.post('/auth/login', data)
        console.log(response.data)
        return response.data;
    }
}