import SquareImage from "../../../Assets/Pictures/Images/SquareImage.png";
import Icons from "./Icons";

const ProfileImageSquare = () => {
  return (
    <>
      <Icons image={SquareImage} alt="Profile picture" className="rounded-lg h-[9rem] w-[7rem] "/>
    </>
  );
};

export default ProfileImageSquare;
