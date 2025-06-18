import type { StaticImageData } from "next/image";
import searchIcon from "@/assets/Icons/Search.png";

interface IconsProps {
  image: string | StaticImageData;
  alt: string;
  className?: string;
}

const Icons = ({ image, alt, className }: IconsProps) => {
  const src = typeof image === "string" ? image : image.src;
  return <img src={src} alt={alt} className={className} />;
};

const Search = () => {
  return <Icons image={searchIcon} alt="Search Icon" className="w-4 mx-2" />;
};

export default Search;
