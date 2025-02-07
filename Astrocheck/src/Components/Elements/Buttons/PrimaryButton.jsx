const PrimaryButton = (props) => {
  return(
    <a href={props.path || "#"}>
      <button className={`border-2 bg-[hsl(225,75%,65%)] ${props.weight || "font-medium"} hover:bg-[hsl(225,51%,54%)] text-white ${props.paddingX || "px-4"} ${props.paddingY || "py-2"} ease-in duration-200 w-${props.width} ${props.textSize || "text-base"} rounded-[4px] border-transparent`}>
        {props.text || "Button"}
      </button>
    </a>
  )
}

export default PrimaryButton