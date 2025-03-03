import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import CardAdminPanel from "@/Components/Fragments/DashBoardPack/Cards/CardAdminPanel";
const Dashbord = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <CardAdminPanel />
      </div>
    </>
  );
};

export default Dashbord;
