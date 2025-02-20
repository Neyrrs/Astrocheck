import {
  CardDenah,
  CardFAQ,
  CardGrafik,
  CardGetApp,
} from "../../Components/Fragments/CardsPack/Index.js";
import { Link } from "react-router";
import { PrimaryButton } from "../../Components/Elements/Buttons/index.js";
import Navbar from "../../Components/Fragments/Navigation-bar/Navbar.jsx";
import Footer from "../../Components/Fragments/Footer/Footer.jsx";

const Home = () => {
  return (
    <>
      <Navbar homePage={true} />
      <div className="Home h-fit bg-no-repeat py-14" id="Absen">
        <div className="h-[40rem] w-full flex flex-col gap-2 justify-center items-center">
          <p className="text-2xl">Absensi Buku Tamu</p>
          <p className="text-2xl">Astrolitera SMKN 1 Cibinong</p>
          <Link to="/absen">
            <PrimaryButton
              text="Mulai Absen"
              fontSize="xs"
              width="px-[1.8rem]"
              height="py-[0.7rem]"
            />
          </Link>
        </div>
        <div className="flex flex-col mt-60">
          <div className="">
            <CardDenah />
          </div>
          <div className="">
            <CardFAQ />
          </div>
          <div className="mt-96">
            <CardGrafik />
          </div>
          <div className="mt-20">
            <CardGetApp />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
