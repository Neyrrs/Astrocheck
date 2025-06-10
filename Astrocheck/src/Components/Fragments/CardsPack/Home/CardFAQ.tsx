import { Toga, QuestionMark } from "@/assets/Icons/Index";
import Accordion from "@/Components/Fragments/Accordion/Accordion";

const CardFAQ = () => {
  const FAQ = [
    {
      imageIcon: Toga.src,
      imageAlt: "toga",
      listType: "list-decimal",
      question: "Bagaimana cara melakukan absensi di website ini?",
      answerOne:
        "Untuk melakukan absensi, silakan masukkan nama lengkap Anda pada form absensi yang tersedia di halaman utama.",
      answerTwo:
        "Pilih alasan kunjungan Anda (Meminjam, Membaca, atau lainnya) dan klik tombol Submit.",
      answerThird:
        "Setelah berhasil, Anda akan diarahkan ke halaman rekomendasi tempat duduk yang tersedia.",
    },
    {
      imageIcon: Toga.src,
      imageAlt: "book",
      listType: "list-disc",
      question: "Bagaimana cara melihat riwayat absensi saya?",
      answerOne: "Riwayat absensi Anda dapat dilihat melalui halaman profil.",
      answerTwo: "Pastikan Anda telah login untuk mengakses fitur ini.",
      answerThird:
        "Di halaman Profil, Anda akan menemukan tabel riwayat absensi lengkap dengan tanggal, jam masuk, jam keluar, dan alasan kunjungan.",
    },
    {
      imageIcon: QuestionMark.src,
      imageAlt: "questionMark",
      listType: "list-disc",
      question:
        "Apa yang harus saya lakukan jika mengalami masalah saat menggunakan website ini?",
      answerOne:
        "Untuk melakukan absensi, silakan masukkan nama lengkap Anda pada form absensi yang tersedia di halaman utama.",
      answerTwo:
        "Pilih alasan kunjungan Anda (Meminjam, Membaca, atau lainnya) dan klik tombol Submit.",
      answerThird:
        "Setelah berhasil, Anda akan diarahkan ke halaman rekomendasi tempat duduk yang tersedia.",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <div
          id="FAQ"
          className="h-22 bg-gradient-to-l w-[65%] from-[#E8ECF8] to-[#A9BCED] flex items-center justify-center  px-auto rounded-lg drop-shadow-xl"
        >
          <p className="text-2xl font-bold">
            <span className="text-[#3849D2]">Pertanyaan</span> seputar
            Astrocheck
          </p>
        </div>
        <div className="h-[50rem]">
          {FAQ.map((item, index) => (
            <div className="my-10" key={index}>
              <Accordion
                image={item.imageIcon}
                alt={item.imageAlt}
                question={item.question}
                listType={item.listType}
                answerOne={item.answerOne}
                answerSecond={item.answerTwo}
                answerThird={item.answerThird}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardFAQ;
