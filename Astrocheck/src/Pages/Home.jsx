import {CardDenah, CardFAQ, CardGrafik} from "../Components/Fragments/CardsPack/Index.js";
import Navbar from "../Components/Fragments/Navigation-bar/Navbar";
import CardGetApp from "../Components/Fragments/CardsPack/CardGetApp";
import Footer from "../Components/Fragments/Footer/Footer";
import PrimaryButton from "../Components/Elements/Buttons/PrimaryButton";

const Home = () => {
  return (
    <>
      <Navbar homePage={true}/>
      <div className="Home h-fit3 bg-no-repeat py-14" id="Absen">
        <div className="h-[40rem] w-full flex flex-col gap-2 justify-center items-center">
          <p className="text-2xl">Absensi Buku Tamu</p>
          <p className="text-2xl">Astrolitera</p>
          <PrimaryButton text="Mulai Absen" path="/Absen" textSize="text-xs" weight="font-light" paddingX="px-[1.7rem]" paddingY="py-[0.7rem]"/>
        </div>
        <div className="pt-[12rem]">
          <CardDenah />
        </div>
        <CardFAQ />
        <div className="pt-[15rem]">
          <CardGrafik />
        </div>
        <div className="pt-[10rem]">
          <CardGetApp />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
