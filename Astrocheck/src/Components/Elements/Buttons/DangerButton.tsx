const DangerButton = (props) => {
  return (
    <>
      <button
        type="reset"
        className={`text-white ${props.padding || "px-8 py-2"} h-fit bg-red-600 text-sm font-normal ease-in duration-300 rounded-md hover:bg-[#ff576a]`}
        onClick={props.onClick}
      >
        {props.text || "Button"}
      </button>
    </>
  );
};

export default DangerButton;
