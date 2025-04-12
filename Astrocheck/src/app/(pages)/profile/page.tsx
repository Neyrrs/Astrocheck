import { CardProfile } from "@/Components/Fragments/CardsPack/Index";
import React from "react";

const Profile = () => {
  return (
    <div className="profileMenu w-screen h-sceen py-24 justify-center items-center flex">
      <div className="flex items-center justify-center ">
        <CardProfile />
      </div>
    </div>
  );
};

export default Profile;
