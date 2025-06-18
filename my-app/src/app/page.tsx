"use client";

import {
  CardDenah,
  CardFAQ,
  CardGrafik,
  CardGetApp,
} from "@/Components/Fragments/CardsPack/Index.js";
import Link from "next/link";
import { PrimaryButton } from "@/Components/Elements/Buttons/index.js";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import AuthGuard from "@/Components/AuthGuard/AuthGuard";
import Footer from "@/Components/Fragments/Footer/Footer";

const Home = () => {
  return (
    <AuthGuard>
      <>
        <Navbar homePage={true} />
        <div
          className="lg:bg-cover lg:object-contain md:bg-cover md:object-contain sm:object-fill sm:object-center sm:bg-contain h-fit w-full bg-no-repeat pt-14"
          id="Absen"
        >
          <div className="h-screen CTA w-full flex flex-col gap-2 justify-center items-center">
            <p className="text-2xl">Absensi Buku Tamu</p>
            <p className="text-2xl">Astrolitera SMKN 1 Cibinong</p>
            <Link href={"/absen"}>
              <PrimaryButton
                text="Mulai Absen"
                fontSize="xs"
                width="px-[1.8rem]"
                height="py-[0.7rem]"
              />
            </Link>
          </div>
          <div className="flex flex-col h-full">
            <div className="h-full Denah">
              <CardDenah />
            </div>
            <div className="justify-center h-240 FAQ w-full pt-20 flex-col flex">
              <CardFAQ />
            </div>
            <div className="flex flex-col justify-between h-225 w-full GetApp ">
              <div className="flex flex-col h-full justify-center">
                <CardGrafik />
              </div>
              <CardGetApp />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </AuthGuard>
  );
};
export default Home;
