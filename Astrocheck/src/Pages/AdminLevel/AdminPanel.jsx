import Navbar from "../../Components/Fragments/Navigation-bar/Navbar";
import {CardAdminPanel} from "../../Components/Fragments/DashBoardPack/Cards";
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
