'use client'

import { useState, useEffect } from "react";
import axios from "axios";

const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get(`${BACKEND_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        setError(error);

        if (error.response && error.response.status === 403) {
          localStorage.removeItem("Token");
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading, error };
};

export default useProfile;
