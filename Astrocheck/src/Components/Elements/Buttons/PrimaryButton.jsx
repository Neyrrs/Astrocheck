const PrimaryButton = (props) => {
  return(
      <button className={`border-2 bg-[hsl(225,75%,65%)] hover:bg-[hsl(225,51%,54%)] font-light text-${props.fontSize || "xs"} text-white ${props.width || "px-4"} ${props.height || "py-2"} ease-in duration-200 rounded-[4px] border-transparent`}>
        {props.text || "Button"}
      </button>
  )
}

export default PrimaryButton