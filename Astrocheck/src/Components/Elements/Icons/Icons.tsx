import Image, { ImageProps, StaticImageData } from "next/image";

interface IconsProps extends Omit<ImageProps, "src" | "alt"> {
  image: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

const Icons: React.FC<IconsProps> = ({ image, alt, width, height, ...rest }) => {
  if (!image) return null;

  return (
    <Image
      src={image}
      alt={alt}
      width={width}
      height={height}
      quality={75}
      {...rest}
    />
  );
};

export default Icons;
