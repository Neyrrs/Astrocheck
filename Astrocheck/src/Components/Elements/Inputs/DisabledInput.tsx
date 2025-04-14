const DisabledInput = (props) => {
  return (
    <>
      <input type={props.type} disabled={true} placeholder={props.placeholder || "Placeholder"} className={`text-sm font-normal border-[#dbdbdb] bg-[#fafafa] border-2 px-3 w-${props.width || "full"} ease-in-out hover:drop-shadow-md duration-150 border-gray-3
      00 py-2 rounded-[5px]`} value={props.value}/>
    </>
  )
}

export default DisabledInput