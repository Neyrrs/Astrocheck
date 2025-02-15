import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const response = await axios.get(`http://localhost:3000/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchProfile();
  }, []);

  return user;
};

export default useProfile;
