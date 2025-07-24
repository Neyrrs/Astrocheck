"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useSWR from "swr";
import type { User } from "@/types/user";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("Token");
  if (!token) throw new Error("Token tidak ditemukan");

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const useFetchProfile = (endpoint = "profile") => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: swrData, error: swrError, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${endpoint}`,
    fetcher
  );

  const fetchProfile = useCallback(async () => {
    try {
      if (!swrData) return;
      setData(swrData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat mengambil data profil");
      }
    } finally {
      setLoading(false);
    }
  }, [swrData]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { data, loading: isLoading || loading, error: swrError || error, mutate };
};

export default useFetchProfile;

export const useProfile = () => useFetchProfile("profile");
export const useProfiles = () => useFetchProfile("profiles");
export const useProfileMostStreak = () =>
  useFetchProfile("profiles/mostStreak");

export const useAllProfiles = () => {
  const user = useProfile();
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!user?.data?.role || user?.data?.role !== "admin") {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("Token");
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await axios.get(`${BACKEND_URL}/user/profiles`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.message || "Terjadi kesalahan saat mengambil semua profil"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.data) {
      fetchAllUsers();
    }
  }, [user?.data]);

  return {
    user: user.data as User | null,
    users,
    loading: user.loading || loading,
    error: user.error || error,
  };
};
