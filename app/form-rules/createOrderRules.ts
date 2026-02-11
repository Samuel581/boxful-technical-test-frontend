import type { Rule } from "antd/es/form";

export const recipientNameRules: Rule[] = [
  { required: true, message: "Ingresa los nombres" },
];

export const recipientLastNameRules: Rule[] = [
  { required: true, message: "Ingresa los apellidos" },
];

export const recipientEmailRules: Rule[] = [
  { required: true, message: "Ingresa el correo" },
  { type: "email", message: "Correo no válido" },
];

export const recipientPhoneRules: Rule[] = [
  { required: true, message: "Ingresa el teléfono" },
];

export const recolectionAddressRules: Rule[] = [
  { required: true, message: "Ingresa la dirección" },
];

export const destinationAddressRules: Rule[] = [
  { required: true, message: "Ingresa la dirección" },
];

export const stateRules: Rule[] = [
  { required: true, message: "Ingresa el departamento" },
];

export const cityRules: Rule[] = [
  { required: true, message: "Ingresa el municipio" },
];
