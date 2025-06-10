import Image from 'next/image';

const Icons = ({ image, alt, width, height, ...rest }) => {
  if (!image) {
    return null;
  }

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
