import Link from "next/link";
import React from "react";

interface TertiaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  link?: string;
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({
  text = "Button",
  link = "#",
  color = "bg-white",
  fontSize = "sm",
  width = "px-4",
  height = "py-2",
  onClick,
  ...rest
}) => {
  return (
    <Link href={link}>
      <button
        className={`border-2 ${color} font-normal text-${fontSize} text-black ${width} ${height} ease-in duration-200 rounded-md border-transparent hover:opacity-70`}
        onClick={onClick}
        {...rest}
      >
        {text}
      </button>
    </Link>
  );
};

export default TertiaryButton;
