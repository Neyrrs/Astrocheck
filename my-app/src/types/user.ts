export interface Major {
  id_major?: string;
  major_code?: string;
  major_name: string;
  major_fullname?: string;
  duration?: number;
}

export interface User {
  id_user: string;
  fullname: string;
  nis: string;
  grade: string;
  major?: Major;
  profile_picture?: string;
  role?: string;
  status?: string;
  generation?: number;
  createdAt?: string;
  streak?: number;
  lastPresenceDate?: string;
  password?: string;
}
