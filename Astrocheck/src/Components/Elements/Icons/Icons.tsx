import Image from 'next/image';

const Icons = ({ image, alt, width, height, ...rest }) => {
  // Jika image kosong atau tidak ada, kita tidak perlu merender gambar sama sekali.
  if (!image) {
    return null;  // Jika tidak ada gambar, return null
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
