'use client'
import { LOGIN_API, REGISTER_API } from "../constants/backendRoutes";
import { api } from "../lib/api/axios";
import { LoginDto, RegisterDto } from "../types/auth";

export const authService = {
    // TODO, separate types and the other one I cannot remenber
    async register(data: RegisterDto){
        const response = await api.post(REGISTER_API, data);
        return response.data;
    },

    async login(data: LoginDto){
        const response = await api.post(LOGIN_API, data);
        return response.data;
    }
}