import { useState, useEffect } from "react";
import axios from "axios";
import useProfile from "./useProfile";

export const usePresence = () => {
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useProfile(); 

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

        setPresence(response);
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

export const DailyPresence = () => {
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useProfile(); 

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
          `http://localhost:3000/Presence/getToday`,
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

export const FullYearPresence = () => {
  const [fullYear, setFullYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useProfile(); 

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
          `http://localhost:3000/Presence/getPerMonth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFullYear(response.data);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresence();
  }, [user]);

  return { fullYear, loading };
};

export const AllPresences = () => {
  const [allPresences, setAllPresences] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useProfile(); 

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
          `http://localhost:3000/Presence/allUsersPresence`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAllPresences(response.data);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresence();
  }, [user]);

  return { allPresences, loading };
};

export const useAllPresence = () => {
  const { presence } = DailyPresence();
  const { fullYear } = FullYearPresence();
  const { allPresences } = AllPresences();

  return { presence, fullYear, allPresences };
};

