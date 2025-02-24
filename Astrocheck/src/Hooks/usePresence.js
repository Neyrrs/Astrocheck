import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useProfile from "./useProfile";

const useFetchPresence = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useProfile();

  const fetchData = useCallback(async () => {
    if (!user || !user.nisn) return;

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await axios.get(
        `http://localhost:3000/Presence/${endpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Gagal mengambil data presensi:", err);
    } finally {
      setLoading(false);
    }
  }, [user, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export const useDailyPresence = () => useFetchPresence("getToday");

export const useFullYearPresence = () => useFetchPresence("getPerMonth");

export const useAllPresences = () => useFetchPresence("allUsersPresence");

export const useUserPresence = () => {
  const { user } = useProfile();
  const endpoint = user ? `logKehadiran/${user.nisn}` : null;
  return useFetchPresence(endpoint);
};

export const useAllPresence = () => {
  const daily = useDailyPresence();
  const fullYear = useFullYearPresence();
  const allUsers = useAllPresences();
  const userPresence = useUserPresence();

  return {
    presence: daily.data,
    fullYear: fullYear.data,
    allPresences: allUsers.data,
    userPresence: userPresence.data,
    loading: daily.loading || fullYear.loading || allUsers.loading || userPresence.loading,
    error: daily.error || fullYear.error || allUsers.error || userPresence.error,
  };
};
