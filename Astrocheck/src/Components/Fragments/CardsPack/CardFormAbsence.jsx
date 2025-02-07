import React from "react";
import Swal from "sweetalert2";
import Form from "./Form";

const CardFormAbsence = () => {
  const CardProfileInput = [
    {
      id: 1,
      htmlFor: "NISN",
      text: "NISN",
      placeholder: "Contoh : 1234567890",
    },
    {
      id: 2,
      htmlFor: "nama",
      text: "Nama",
      placeholder: "Nama lengkap anda",
    },
  ];

  const handleSendForm = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Data berhasil tercatat!",
      text: "Silakan lanjutkan dengan memilih tempat duduk yang tersedia di area perpustakaan.",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Absen berhasil",
          text: "Selamat datang di perpustakaan Astrolitera, [user] Anda telah berhasil melakukan absensi",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Logout",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Login";
          }
        });
      }
    });
  };

  return (
    <>
      <Form />
    </>
  );
};

export default CardFormAbsence;
