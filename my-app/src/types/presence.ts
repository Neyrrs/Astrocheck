export interface PresenceLog {
  id_guest: string;
  nis: string;
  date: string;
  time: string;
  reason: "Membaca" | "Meminjam" | "Lainnya";
  detailReason?: string;
  fullname?: string;
  grade?: string;
  major?: string;
  totalMembaca?: number;
  totalMeminjam?: number;
  totalLainnya?: number;
}

export interface PresenceSummary {
  daily: {
    count: number;
    membaca: number;
    meminjam: number;
    lainnya: number;
  };
  monthly: {
    count: number;
    membaca: number;
    meminjam: number;
    lainnya: number;
  };
  yearly: {
    count: number;
    membaca: number;
    meminjam: number;
    lainnya: number;
  };
}

export interface MonthlyLog {
  month: string;
  count: number;
}

export interface PresenceCategory {
  membaca: number;
  meminjam: number;
  lainnya: number;
}

export interface SummaryPresence {
  daily: PresenceCategory;
  monthly: PresenceCategory;
  yearly: PresenceCategory;
}

export interface presenceHttpRequest {
  id_guest: string;
  nis: string;
  date: string;
  time: string;
  reason: string;
  detail_reason?: string;
  fullname?: string;
  grade?: string;
  major?: string;
}
