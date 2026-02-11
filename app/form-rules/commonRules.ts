import type { Rule } from "antd/es/form";

export const requiredRule = (message: string): Rule => ({
  required: true,
  message,
});

export const emailRules: Rule[] = [
  { required: true, message: "Ingresa tu correo electrónico" },
  { type: "email", message: "Correo electrónico no válido" },
];

export const passwordRules: Rule[] = [
  { required: true, message: "Ingresa tu contraseña" },
  { min: 8, message: "La contraseña debe tener al menos 8 caracteres" },
];

export const phoneRules: Rule[] = [
  { required: true, message: "Ingresa el número de teléfono" },
];

export const dateRules: Rule[] = [
  { required: true, message: "Selecciona la fecha" },
];
