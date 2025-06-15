"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import Label from "@/Components/Elements/Labels/Label";
import { PrimaryButton, TertiaryButton } from "@/Components/Elements/Buttons";
import { DisabledInput } from "@/Components/Elements/Inputs";
import { DropdownExportExcel } from "../../DropdownPack";

interface ExportExcelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormData {
  jenis: string;
  tanggal: string;
}

const ExportExcel: React.FC<ExportExcelProps> = ({ isOpen = false, onClose = () => {} }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      tanggal: currentYear.toString(),
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      reset();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      const response: AxiosResponse = await axios.post(
        `${backendUrl}/presence/export`,
        { jenis: data?.jenis },
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("reponse: ", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `presensi-${data.jenis}.xlsx`);
      document.body.appendChild(link);
      link.click();

      onClose();
    } catch (error) {
      const err = error as AxiosError;
      alert("Gagal export data: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="bg-white w-[420px] py-5 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center px-4 py-2 border-b-2 border-gray-300">
          <h2 className="text-lg font-bold">Export Data Presensi</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-3 gap-3 items-center">
            <Label text="Jenis *" className="font-semibold" />
            <div className="col-span-2">
              <DropdownExportExcel
                register={register}
                error={errors.jenis}
                disabled={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 items-center">
            <Label text="Tahun *" className="font-semibold" />
            <div className="col-span-2">
              <DisabledInput
                width="full"
                {...register("tanggal", { required: true })}
                value={(currentYear).toString()}
              />
            </div>
          </div>

          <div className="flex justify-start pt-2 gap-2">
            <PrimaryButton text="Export" />
            <TertiaryButton
              onClick={onClose}
              text="Cancel"
              color="bg-gray-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportExcel;
