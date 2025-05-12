import Icons from "./Icons";
import { useAllProfiles } from "@/Hooks/useProfile";
import DefaultImage from "@/assets/Pictures/Images/DefaultImage.png";

const ProfileImage = ({ width, height, size = "", ...rest }) => {
  const { user } = useAllProfiles();
  return (
    <Icons
      image={user?.profilePicture?.secure_url ?? DefaultImage}
      alt="Profile picture"
      width={width || 100}
      height={height || 100}
      className={`rounded-full ${size} object-cover`}
      {...rest}
    />
  );
};

export default ProfileImage;
