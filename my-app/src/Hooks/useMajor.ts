// useMajor.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useAllMajors = (page: number, limit: number) => {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");

      if (!token) throw new Error("Token tidak ditemukan");

      const response = await axios.get(`${BACKEND_URL}/major`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
        },
      });

      if (response.status === 200) {
        setData(response.data.data); 
        setTotalPages(response.data.totalPages || 1); 
      } else {
        throw new Error("Gagal memuat data major");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat memuat data");
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalPages, loading, error };
};
