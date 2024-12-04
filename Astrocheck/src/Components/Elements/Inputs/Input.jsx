const Input = (props) => {
  return (
    <> 
      <input type={props.type} name={props.name} className="focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-2 mb-2 py-2 w-60 h-[2rem] text-xs rounded-[4px] font-light" placeholder={props.placeholder || "Placeholder"}/>
    </>
  )
}

export default Input