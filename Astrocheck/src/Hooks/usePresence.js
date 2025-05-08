import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useProfile from "./useProfile";

const useFetchPresence = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useProfile();

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await axios.get(`${BACKEND_URL}/presence/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response) return;
      setData(response.data);
    } catch (err) {
      setError("Terjadi kesalahan", err);
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
export const useAvaragePresenceMonths = () =>
  useFetchPresence("avaragePresence");

export const useAllPresences = () => useFetchPresence("allUsersPresence");

export const useUserPresence = () => useFetchPresence("logKehadiran");
export const useMonthlyPresence = () => useFetchPresence("getCurrentMonth");
export const useSumaryPresence = () => useFetchPresence("summary");


export const useAllPresence = () => {
  const average = useAvaragePresenceMonths();
  const summary = useSumaryPresence();
  const daily = useDailyPresence();
  const fullYear = useFullYearPresence();
  const allUsers = useAllPresences();
  const userPresence = useUserPresence();
  const monthly = useMonthlyPresence();

  return {
    summary: summary.data,
    averages: average.data,
    presence: daily.data,
    fullYear: fullYear.data,
    allPresences: allUsers.data,
    monthlyPresence: monthly.data,
    userPresence: userPresence.data,
    loading:
    daily.loading ||
    fullYear.loading ||
    allUsers.loading ||
    userPresence.loading ||
    average.loading ||
    monthly.loading,
  error:
    daily.error ||
    fullYear.error ||
    allUsers.error ||
    userPresence.error ||
    average.error ||
    monthly.error,
  };
};
