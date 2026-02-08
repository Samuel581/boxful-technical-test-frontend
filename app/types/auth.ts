export enum Sex {
  M = "M",
  F = "F",
  OTHER = "OTHER",
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstnames: string;
  lastnames: string;
  sex: Sex;
  borndate: string;
  email: string;
  phone: string;
  password: string;
}
