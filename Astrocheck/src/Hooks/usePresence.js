import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAllProfiles } from "./useProfile";

const useFetchPresence = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAllProfiles();

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

export const useTodayPresence = () => useFetchPresence("getToday");
export const useFullYearPresence = () => useFetchPresence("getPerMonth");
export const useAvaragePresenceMonths = () => useFetchPresence("getPerMonth");
export const useSummaryMajor = () => useFetchPresence("summaryMajor");
export const useAllPresences = () => useFetchPresence("allUsersPresence");
export const useMostUserPresences = () =>
  useFetchPresence("analytics/students");
export const useCurrentMonthPresence = () =>
  useFetchPresence("getCurrentMonth");
export const useSumaryPresence = () => useFetchPresence("summary");
export const useLastYearPresence = () => useFetchPresence("getLastYear");

export const useUserPresence = () => useFetchPresence("logKehadiran");

export const useAllPresence = () => {
  const { user } = useAllProfiles();

  const userPresence = useUserPresence();
  const today = useTodayPresence();
  const fullYear = useFullYearPresence();
  const allUsers = useAllPresences();
  const average = useAvaragePresenceMonths();
  const CurrentMonth = useCurrentMonthPresence();
  const summary = useSumaryPresence();
  const lastYear = useLastYearPresence();
  const summaryMajor = useSummaryMajor();
  const mostPresence = useMostUserPresences();
  const isAdmin = user?.role === "admin";

  return {
    mostPresence: isAdmin ? mostPresence.data : null,
    summaryMajor: isAdmin ? summaryMajor.data : null,
    lastYear: isAdmin ? lastYear.data : null,
    summary: summary.data,
    averages: isAdmin ? average.data : null,
    today: isAdmin ? today.data : null,
    fullYear: isAdmin ? fullYear.data : null,
    allPresences: isAdmin ? allUsers.data : null,
    CurrentMonth: isAdmin ? CurrentMonth.data : null,
    userPresence: userPresence.data,

    loading: isAdmin
      ? today.loading ||
        fullYear.loading ||
        allUsers.loading ||
        userPresence.loading ||
        average.loading ||
        CurrentMonth.loading ||
        summary.loading ||
        lastYear.loading ||
        summaryMajor.loading ||
        mostPresence.loading
      : userPresence.loading,

    error: isAdmin
      ? today.error ||
        fullYear.error ||
        allUsers.error ||
        userPresence.error ||
        average.error ||
        CurrentMonth.error
      : userPresence.error,
  };
};
