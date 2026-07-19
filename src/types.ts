export interface Kingdom {
  id: string;
  name: string;
  period: string; // e.g., "Abad ke-13 - Abad ke-16"
  location: string; // e.g., "Jawa Timur"
  founder: string; // e.g., "Raden Wijaya"
  description: string;
  history: string;
}

export interface Hero {
  id: string;
  name: string;
  birthDeath: string; // e.g., "1901 - 1970"
  origin: string; // e.g., "Surabaya, Jawa Timur"
  category: string; // e.g., "Proklamator", "Pahlawan Revolusi", etc.
  description: string;
  story: string;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string; // e.g., "17 Agustus 1945"
  location: string; // e.g., "Jakarta"
  description: string;
  history: string;
}

export interface CompilerBiography {
  name: string;
  title: string;
  role: string;
  bio: string;
  expertise: string[];
  genealogyDetails: string;
}
