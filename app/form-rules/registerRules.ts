import type { Rule } from "antd/es/form";

export const firstNameRules: Rule[] = [
  { required: true, message: "Ingresa tu nombre" },
];

export const lastNameRules: Rule[] = [
  { required: true, message: "Ingresa tu apellido" },
];

export const sexRules: Rule[] = [
  { required: true, message: "Selecciona" },
];

export const confirmPasswordRules: Rule[] = [
  { required: true, message: "Repite la contraseña" },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Las contraseñas no coinciden"));
    },
  }),
];
