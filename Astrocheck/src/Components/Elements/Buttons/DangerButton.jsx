import React from "react";

const DangerButton = (props) => {
  return (
    <>
      <a href={props.path || "#"}>
        <button type="reset"
          className={`border-2 bg-red-600 text-white px-6 py-[2px] text-sm ease-in duration-100 w-${props.width || "20"} rounded-[4px] hover:bg-[#ff576a] border-transparent`}
        {...props}>
          {props.text || "Button"}
        </button>
      </a>
    </>
  );
};

export default DangerButton;
