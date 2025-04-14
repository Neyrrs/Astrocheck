
const Label = (props) => {
  return (
    <div>
        <label htmlFor={props.htmlFor} className={props.className || "text-md"}>{props.text || "Label"}</label>
    </div>
  )
}

export default Label