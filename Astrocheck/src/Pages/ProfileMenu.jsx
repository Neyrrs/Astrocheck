import Navbar from "../Components/Fragments/Navigation-bar/Navbar";
import CardProfile from "../Components/Fragments/CardsPack/CardProfile";
const ProfilMenu = () => {
  
  return (
    <div className="profileMenu w-screen h-sceen py-24 justify-center items-center flex">
      <Navbar />
      <div className="flex items-center justify-center ">
        <CardProfile />
      </div>
    </div>
  );
};

export default ProfilMenu;
