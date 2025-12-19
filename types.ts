// Fix: Import `ComponentType` from 'react' to resolve the "Cannot find namespace 'React'" error.
import type { ComponentType } from 'react';

export interface CurrencyRates {
  [key: string]: number;
}

export enum NewsSource {
  GOINFRA = "GOINFRA",
  ANTT = "ANTT",
  MIN_TRANSPORTES = "Ministério dos Transportes",
  DER = "DER",
  DNIT = "DNIT",
  INFRA_SA = "Infra S.A.",
  CBIC = "CBIC"
}

export interface AppLink {
  name: string;
  icon: ComponentType<{ className?: string }>;
  url: string;
}

export interface Holiday {
  date: string;
  name: string;
  type: string;
}
export interface NewsData {
  summary: string;
  imageUrl?: string;
}
