export interface PresenceLog {
  _id: string;
  nis: string;
  date: string;
  time: string;
  reason: 'Membaca' | 'Meminjam' | 'Lainnya';
  detailReason?: string;
  fullName?: string;
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
