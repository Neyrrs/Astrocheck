const Input = (props) => {
  return (
    <> 
      <input onChange={props.onChange} type={props.type} name={props.name} className={`focus:border-[#6384E9] hover:border-[#6384E9] border-gray-300 focus:shadow-md hover:shadow-md bg-white duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-${props.width || "full"} text-sm rounded-[5px] font-normal`} placeholder={props.placeholder || "Placeholder"} value={props.value} disabled={props.disabled} required={true} {...props}/>
    </>
  )
}

export default Input