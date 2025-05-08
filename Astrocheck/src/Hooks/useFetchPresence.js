// useFetchPresence.js
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

      if (!token) throw new Error("Token tidak ditemukan");

      const response = await axios.get(`${BACKEND_URL}/presence/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  }, [user, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchPresence;
