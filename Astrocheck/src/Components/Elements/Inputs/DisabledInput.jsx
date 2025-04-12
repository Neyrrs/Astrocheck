const DisabledInput = (props) => {
  return (
    <>
      <input type="text" type={props.type} disabled={true} placeholder={props.placeholder || "Placeholder"} className={`text-sm font-light border-2 px-3 w-${props.width || "full"} hover:border-2 duration-150 border-gray-300 py-2 rounded-[5px]`} value={props.value}/>
    </>
  )
}

export default DisabledInput