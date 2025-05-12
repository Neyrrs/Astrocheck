import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAllProfiles} from "./useProfile";

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
export const useAvaragePresenceMonths = () =>
  useFetchPresence("getPerMonth");
export const useSummaryMajor = () =>
  useFetchPresence("summaryMajor");


export const useAllPresences = () => useFetchPresence("allUsersPresence");
export const useUserPresence = () => useFetchPresence("logKehadiran");
export const useCurrentMonthPresence = () => useFetchPresence("getCurrentMonth");
export const useSumaryPresence = () => useFetchPresence("summary");
export const useLastYearPresence = () =>
  useFetchPresence("getLastYear");

export const useAllPresence = () => {
  const average = useAvaragePresenceMonths();
  const summary = useSumaryPresence();
  const today = useTodayPresence();
  const fullYear = useFullYearPresence();
  const allUsers = useAllPresences();
  const userPresence = useUserPresence();
  const CurrentMonth = useCurrentMonthPresence();
  const lastYear = useLastYearPresence();
  const summaryMajor = useSummaryMajor();

  return {
    summaryMajor: summaryMajor.data,
    lastYear: lastYear.data,
    summary: summary.data,
    averages: average.data,
    today: today.data,
    fullYear: fullYear.data,
    allPresences: allUsers.data,
    CurrentMonth: CurrentMonth.data,
    userPresence: userPresence.data,
    loading:
    today.loading ||
    fullYear.loading ||
    allUsers.loading ||
    userPresence.loading ||
    average.loading ||
    CurrentMonth.loading,
  error:
    today.error ||
    fullYear.error ||
    allUsers.error ||
    userPresence.error ||
    average.error ||
    CurrentMonth.error,
  };
};
