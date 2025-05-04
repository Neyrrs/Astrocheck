import Link from "next/link";

const PrimaryButton = (props) => {
  return (
    <Link href={props.link || "#"}>
      <button
        className={`border-2 bg-[hsl(225,75%,65%)] hover:bg-[hsl(225,51%,54%)] font-normal text-${
          props.fontSize || "xs"
        } text-white ${props.width || "px-4"} ${
          props.height || "py-2"
        } ease-in duration-200 rounded-md border-transparent`}
        onClick={props.onClick}
      >
        {props.text || "Button"}
      </button>
    </Link>
  );
};

export default PrimaryButton;
