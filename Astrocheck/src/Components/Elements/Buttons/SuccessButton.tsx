import React from "react";

interface SuccessButtonProps {
  text?: string;
}

const SuccessButton: React.FC<SuccessButtonProps> = ({ text = "Button" }) => {
  return (
    <button
      type="submit"
      className="bg-[#00C853] text-white px-8 py-2 text-sm font-light hover:bg-[hsl(145,100%,35%)] ease-in duration-300 rounded-lg"
    >
      {text}
    </button>
  );
};

export default SuccessButton;
