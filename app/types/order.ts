export interface PackageDto {
  weight: number;
  content: string;
  height: number;
  length: number;
  width: number;
}

export interface OrderPackage extends PackageDto {
  id: string;
  orderId: string;
  createdAt: string;
}

export interface CreateOrderDto {
  recolectionAddress: string;
  programedDate: string;
  recipientNames: string;
  recipientLastNames: string;
  recipientEmail: string;
  recipientCellphone: string;
  destinationAddress: string;
  state: string;
  city: string;
  referencePoint: string;
  additionalInstructions: string;
  packages: PackageDto[];
}

export enum OrderStatus {
  PENDING = "PENDING",
}

export interface Order {
  id: string;
  userId: string;
  recolectionAddress: string;
  programedDate: string;
  recipientNames: string;
  recipientLastNames: string;
  recipientEmail: string;
  recipientCellphone: string;
  destinationAddress: string;
  state: string;
  city: string;
  referencePoint: string;
  additionalInstructions: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  packages: OrderPackage[];
}
