const InputFAQ = (props) => {
  return (
    <>
      <input
        type={props.type}
        name={props.name}
        className={`focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-2 mb-2 py-5 w-[45rem] h-[2rem]           
        text-sm rounded-[5px] font-light`}
        placeholder={props.placeholder || "Placeholder"}
      />
    </>
  );
};

export default InputFAQ;
