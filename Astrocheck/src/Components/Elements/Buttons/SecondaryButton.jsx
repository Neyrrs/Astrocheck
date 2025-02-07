import React from "react";

const SecondaryButton = (props) => {
  return (
    <>
      <button
        className={`border-2 font-light bg-[#9CABD6] hover:bg-[#b5bfdb] rounded-md text-white px-4 py-1 ease-in duration-200 w-${props.width} rounded-[3px] border-transparent`}
      >
        {props.text || "Button"}
      </button>
    </>
  );
};

export default SecondaryButton;
