const SecondaryButton = (props) => {
  return (
    <>
      <button
        className={`border-2 font-light bg-[#9CABD6] hover:bg-[#b5bfdb] text-white px-${props.width || 4} py-${props.height || 2} ease-in duration-200 rounded-md border-transparent`}
      >
        {props.text || "Button"}
      </button>
    </>
  );
};

export default SecondaryButton;
