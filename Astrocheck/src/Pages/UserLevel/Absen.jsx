import Navbar from "../../Components/Fragments/Navigation-bar/Navbar";
import CardFormAbsence from "../../Components/Fragments/CardsPack/CardFormAbsence";
const Absen = () => {
  return (
    <>
    <Navbar />
    <div className="profileMenu w-full bg-blue-800 items-center justify-center pb-20 pt-20 flex">
      <div className="flex items-center justify-center ">
        <CardFormAbsence />
      </div>
    </div>
    </>
  );
};

export default Absen;
