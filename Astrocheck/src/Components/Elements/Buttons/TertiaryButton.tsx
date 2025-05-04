import Link from "next/link";
import React from "react";

const TertiaryButton = (props) => {
  return (
    <Link href={props.link || "#"}>
      <button
        className={`border-2 bg-white font-normal text-${
          props.fontSize || "sm"
        } text-black ${props.width || "px-4"} ${
          props.height || "py-2"
        } ease-in duration-200 rounded-md border-transparent hover:opacity-70`}
        onClick={props.onClick}
      >
        {props.text || "Button"}
      </button>
    </Link>
  );
};

export default TertiaryButton;
