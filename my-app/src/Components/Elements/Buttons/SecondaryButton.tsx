import React from "react";

interface SecondaryButtonProps {
  text?: string;
  width?: number;
  height?: number;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text = "Button", width = 4, height = 2 }) => {
  return (
    <button
      className={`border-2 font-light bg-[#9CABD6] hover:bg-[#b5bfdb] text-white px-${width} py-${height} ease-in duration-200 rounded-md border-transparent`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
