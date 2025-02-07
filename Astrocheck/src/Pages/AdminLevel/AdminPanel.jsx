import React from "react";
import Navbar from "../../Components/Fragments/Navigation-bar/Navbar";
import CardAdminPanel from "../../Components/Fragments/DashBoardPack/CardAdminPanel";
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
