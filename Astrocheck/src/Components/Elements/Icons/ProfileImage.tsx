import Icons from "./Icons";
import { useAllProfiles } from "@/Hooks/useProfile";
import DefaultImage from "@/assets/Pictures/Images/DefaultImage.png";

const ProfileImage = ({ width = 50, height = 50, size = "", className = "", ...rest }) => {
  const { user } = useAllProfiles();
  const imageSrc = user?.profilePicture?.secure_url ?? DefaultImage;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
      className={`relative ${size}`}
    >
      <Icons
        image={imageSrc}
        alt="Profile picture"
        width={width}
        height={height}
        className={`object-cover w-full h-full ${className}`} 
        {...rest}
      />
    </div>
  );
};

export default ProfileImage;
