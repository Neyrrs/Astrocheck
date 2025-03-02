// import { useState, useEffect } from "react";
// import { useAllPresence } from "./Hooks/usePresence"; // Pastikan path ini benar
import {CardMembaca} from "./Components/Fragments/DashBoardPack/Cards/CardPresences"
import {Eye, Book, SlashedEye} from "@/assets/Icons"

const Exp = () => {
  // const { presence, fullYear, allPresences, loading, error } = useAllPresence();

  // useEffect(() => {
  //   console.log("=== Data Presensi ===");
  //   console.log("Semua Presensi Pengguna:", allPresences.presence);
  // }, [presence, fullYear, allPresences, loading, error]);

  // const [show, setShow] = useState(false);
  // const [tunjukan, setTunjukan] = useState(false);

  // const toggleFirst = () => {
  //   setShow(!show);
  // };

  // const toggleSecond = () => {
  //   setTunjukan(!tunjukan);
  // };

  return (
    // <div className="p-5 bg-blue-100 w-full max-w-md mx-auto">
    //   {/* First Accordion */}
    //   <div className="mb-4 bg-rose-500 mt-4">
    //     <button
    //       className="px-4 py-2 rounded-md w-full text-left text-white font-semibold"
    //       onClick={toggleFirst}
    //     >
    //       Aku suka (1)
    //     </button>
    //     <div
    //       className={`overflow-hidden transition-[max-height] duration-[0.7s] ease-in-out ${
    //         show ? "max-h-40" : "max-h-0"
    //       }`}
    //     >
    //       <p className="mt-2 px-2 text-white">Tentu aku keren!</p>
    //     </div>
    //   </div>

    //   {/* Second Accordion */}
    //   <div className="mb-4">
    //     <button
    //       className="border-2 border-black px-4 py-2 rounded-md w-full text-left"
    //       onClick={toggleSecond}
    //     >
    //       Aku suka (2)
    //     </button>
    //     <div
    //       className={`overflow-hidden transition-[max-height] duration-[0.7s] ease-in-out ${
    //         tunjukan ? "max-h-40" : "max-h-0"
    //       }`}
    //     >
    //       <p className="mt-2 px-2">Tentu aku keren lagi!</p>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center">
      {/* <CardMembaca /> */}
      <img src={SlashedEye} alt="" />
      <img src={Eye} alt="" />
      {/* <img src={Eye} /> */}
      {/* <img src={SlashedEye} /> */}
    </div>
  );
};

export default Exp;
