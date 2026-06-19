export interface Provider {
  name: string;
  baseRate: number;
  msiRates: Record<string, number>;
  color: string;
  textColor: string;
  badgeBg: string;
  description: string;
  officialUrl: string;
  benefits: string[];
}

export interface CalculationResult {
  name: string;
  usedRate: number;
  commission: number;
  iva: number;
  totalCommission: number;
  netPayout: number;
  color: string;
  textColor: string;
  badgeBg: string;
}

export interface ReferidoLink {
  id: string;
  name: string;
  provider: string;
  description: string;
  logo: string;
  color: string;
  link: string;
  iconName: string;
  benefits: string[];
  category: "terminal" | "cuenta" | "prestamo";
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  officialUrl: string;
  imageUrl: string;
  duration: string;
}
