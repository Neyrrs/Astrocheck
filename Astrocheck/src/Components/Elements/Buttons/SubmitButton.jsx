import React from "react";

const SubmitButton = (props) => {
  return (
    <>
      <a href={props.path || "#"}>
        <button
          type="submit"
          className={`border-2 bg-[#00C853] text-white px-6 py-[2px] text-sm hover:bg-[#00d57e] ease-in duration-150 rounded-[3px] border-transparent`}
          {...props}
        >
          {props.text || "Button"}
        </button>
      </a>
    </>
  );
};

export default SubmitButton;
