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
        const response = await axios.get(`http://localhost:3000/profile`, {
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
