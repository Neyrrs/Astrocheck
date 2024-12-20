import Navbar from "../Components/Fragments/Navigation-bar/Navbar";
import CardProfile from "../Components/Fragments/CardsPack/CardProfile";
const ProfileMenu = () => {
  return (
    <div className="profileMenu w-full h-screen justify-center items-center flex">
      <Navbar />
      <div className="flex items-center justify-center">
        <CardProfile />
      </div>
    </div>
  );
};

export default ProfileMenu;
