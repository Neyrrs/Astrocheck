export interface Major {
  _id?: string;
  major_code?: string;
  major_name: string;
  majorFullName?: string;
  duration?: number;
}

export interface ProfilePicture {
  secure_url: string;
  public_id?: string;
}

export interface User {
  _id: string;
  fullName: string;
  nis: string;
  email?: string;
  grade: string;
  idMajor?: Major;
  profilePicture?: ProfilePicture;
  role?: string;
  status?: string;
  generation?: number;
  createdAt?: string;
  graduationYear?: number;
  streak?: number;
  lastPresenceDate?: string;
  nickname?: string;
  password?: string;
}
