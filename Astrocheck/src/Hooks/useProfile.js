"use client"

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchProfile = (endpoint = "profile") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");

      if (!token) throw new Error("Token tidak ditemukan");

      const response = await axios.get(`${BACKEND_URL}/user/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response) return;
      setData(response.data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data profil");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { data, loading, error };
};

export default useFetchProfile;

export const useProfile = () => useFetchProfile("profile");
export const useProfiles = () => useFetchProfile("profiles");

export const useAllProfiles = () => {
  const user = useProfile();
  const users = useProfiles();
  return {
    user: user.data,
    users: users.data,
    loading: user.loading || users.loading,
    error: user.error || users.error,
  };
};
