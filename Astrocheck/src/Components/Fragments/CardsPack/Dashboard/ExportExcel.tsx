"use client";

import React, { useEffect, useRef } from "react";

const ExportExcel = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 ">
      <div
        ref={modalRef}
        className="bg-white w-[500px] rounded-lg shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Export Data Presensi</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">
              Jenis <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Jenis Export
              </option>
              <option value="presensi">Presensi</option>
              <option value="laporan">Laporan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded px-4 py-2 text-sm mr-2"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportExcel;
