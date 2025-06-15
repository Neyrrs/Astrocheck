import React from "react";

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  onClick?: () => void;
  text?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  width = "full",
  onClick = () => {},
  text = "Button",
  ...rest
}) => {
  return (
    <button
      className={`border-2 bg-[#6384E9] text-white text-sm font-light px-4 py-1 hover:bg-[#9eafdb] ease-in duration-100 w-${width} rounded-[7px] border-transparent`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
};

export default LoginButton;
