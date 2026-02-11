import type { Order } from "@/app/types/order";

const CSV_HEADERS = [
  "No. de orden",
  "Nombre",
  "Apellidos",
  "Correo",
  "Teléfono",
  "Dirección destino",
  "Departamento",
  "Municipio",
  "Punto de referencia",
  "Fecha programada",
  "Paquetes",
  "Estado",
  "Fecha de creación",
];

function escapeCsvValue(val: string | number): string {
  return `"${String(val ?? "").replace(/"/g, '""')}"`;
}

export function ordersToCsv(orders: Order[]): string {
  const rows = orders.map((o) => [
    o.id.slice(-8).toUpperCase(),
    o.recipientNames,
    o.recipientLastNames,
    o.recipientEmail,
    o.recipientCellphone,
    o.destinationAddress,
    o.state,
    o.city,
    o.referencePoint ?? "",
    new Date(o.programedDate).toLocaleDateString(),
    o.packages.length,
    o.status,
    new Date(o.createdAt).toLocaleDateString(),
  ]);

  return [CSV_HEADERS.join(","), ...rows.map((r) => r.map(escapeCsvValue).join(","))].join("\n");
}

export function downloadCsv(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
