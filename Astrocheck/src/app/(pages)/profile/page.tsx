import { CardProfile } from "@/Components/Fragments/CardsPack/Index";
import React from "react";

const Profile = () => {
  return (
    <div className="profileMenu w-screen min-h-svh py-20 justify-center items-center flex">
      <div className="flex items-center justify-center ">
        <CardProfile />
      </div>
    </div>
  );
};

export default Profile;
