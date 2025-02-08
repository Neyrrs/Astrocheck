const DisabledInput = (props) => {
  return (
    <>
      <input type="text" disabled={true} placeholder={props.placeholder || "Placeholder"} className={`text-sm font-light border-2 px-3 width-${props.width || "full"} py-2 rounded-[5px]`}/>
    </>
  )
}

export default DisabledInput