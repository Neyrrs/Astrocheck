import Icons from "./Icons";
import { useAllProfiles } from "@/Hooks/useProfile";
import DefaultImage from "@/assets/Pictures/Images/DefaultImage.png";
import type { StaticImageData } from 'next/image';

interface ProfileImageProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  size?: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  width = 50,
  height = 50,
  size = "",
  className = "",
  ...rest
}) => {
  const { user } = useAllProfiles();
  const imageSrc: string = getImageSrc(user?.profilePicture?.secure_url ?? DefaultImage);

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

function getImageSrc(image: string | StaticImageData): string {
  if (typeof image === 'string') {
    return image;
  }
  // StaticImageData has a 'src' property
  return image.src;
}

export default ProfileImage;
