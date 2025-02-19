import { useState, useEffect } from "react";
import axios from "axios";
import useProfile from "./useProfile";

const usePresence = () => {
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useProfile(); 

  useEffect(() => {
    const fetchPresence = async () => {
      if (!user || !user.nisn) return;

      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/Presence/logKehadiran/${user.nisn}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPresence(response.data);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresence();
  }, [user]);

  return { presence, loading };
};

export default usePresence;
