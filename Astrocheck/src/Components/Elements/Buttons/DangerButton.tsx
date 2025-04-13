const DangerButton = (props) => {
  return (
    <>
      <button
        type="reset"
        className="bg-red-600 mt-2 text-white px-8 py-2 text-sm font-light ease-in duration-300 rounded-lg hover:bg-[#ff576a]"
      >
        {props.text || "Button"}
      </button>
    </>
  );
};

export default DangerButton;
