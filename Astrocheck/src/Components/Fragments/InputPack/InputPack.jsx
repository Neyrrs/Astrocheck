import Label from "../../Elements/Labels/Label"
import Input from "../../Elements/Inputs/Input"
const InputPack = (props) => {
  return (
    <>
        <Label htmlFor={props.htmlFor} text={props.text} className={props.className}/>
        <Input type={props.type} name={props.name} placeholder={props.placeholder} {...props}/>
    </>
  )
}

export default InputPack