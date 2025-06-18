const DangerButton = ({padding = "px-8 py-2", onClick = () => {}, text = "Button"}) => {
  return (
    <>
      <button
        type="reset"
        className={`text-white ${padding} h-fit bg-red-600 text-sm font-normal ease-in duration-300 rounded-md hover:bg-[#ff576a]`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default DangerButton;
