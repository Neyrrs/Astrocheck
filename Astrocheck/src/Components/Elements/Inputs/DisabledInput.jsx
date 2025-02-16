const DisabledInput = (props) => {
  return (
    <>
      <input type="text" type={props.type} disabled={true} placeholder={props.placeholder || "Placeholder"} className={`text-sm font-light border-2 px-3 w-${props.width || "full"} py-2 rounded-[5px]`} value={props.value}/>
    </>
  )
}

export default DisabledInput