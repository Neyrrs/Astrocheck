"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";

type Major = {
  id_major: number;
  nis: string;
  fullname: string;
};

type TableColumn = {
  header: string;
  field: keyof Major | "__index";
  render?: (row: Major) => React.ReactNode;
};

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [data, setData] = useState<Major[]>([]);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMajors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/user/profiles", {
        params: {
          page: currentPage,
          limit: perPage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      console.log(response)

      const resData = response.data;
      setData(resData.users || []);
      setTotalPages(resData.totalPage);
      setError(false);
    } catch (err) {
      setError(true);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, [currentPage, perPage]);

  const columns: TableColumn[] = [
    { header: "No", field: "__index" },
    { header: "Nama Panggilan Jurusan", field: "nis" },
    { header: "Nama Lengkap Jurusan", field: "fullname" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Data Jurusan</h1>
      <PresenceTableWrapper
        columns={columns}
        itemsPerPage={perPage}
        data={data}
        totalPages={totalPages}
        loading={loading}
        error={error}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPerPageChange={(newPerPage) => {
          setPerPage(newPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Page;
