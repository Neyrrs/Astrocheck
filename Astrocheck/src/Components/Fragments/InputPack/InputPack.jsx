import Label from "../../Elements/Labels/Label"
import Input from "../../Elements/Inputs/Input"
const InputPack = (props) => {
  return (
    <>
        <Label htmlFor={props.htmlFor} text={props.text}/>
        <Input type={props.type} name={props.name} placeholder={props.placeholder}/>
    </>
  )
}

export default InputPack