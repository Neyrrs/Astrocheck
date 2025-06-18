"uce client";

import { CardProfile } from "@/Components/Fragments/CardsPack/Index";
import React, { Suspense } from "react";

const Profile = () => {
  return (
    <div className="profileMenu w-screen min-h-svh py-20 justify-center items-center flex">
      <div className="flex items-center justify-center ">
        <Suspense fallback={<p>Loading...</p>}>
          <CardProfile />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
