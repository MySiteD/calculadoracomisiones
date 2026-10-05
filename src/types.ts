export interface Provider {
  name: string;
  category: "fintech" | "banco";
  baseRate: number;
  debitRate?: number;
  creditRate?: number;
  rateRangeText?: string;
  effectiveRateText?: string;
  monthlyRentText?: string;
  depositTimeText?: string;
  minVolumeText?: string;
  msiDetailsText?: string;
  extraNotesText?: string;
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
  category: "fintech" | "banco";
  usedRate: number;
  commission: number;
  iva: number;
  totalCommission: number;
  netPayout: number;
  monthlyRentText?: string;
  minVolumeText?: string;
  rateRangeText?: string;
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
