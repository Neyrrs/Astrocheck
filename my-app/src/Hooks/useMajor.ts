import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useAllMajors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");

      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const response = await axios.get(`${BACKEND_URL}/major`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Gagal memuat data major");
      }
    } catch (err) {
      if (err instanceof Error) {
        const message =
          err?.message ||
          err.message ||
          "Terjadi kesalahan saat memuat data";
          setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
