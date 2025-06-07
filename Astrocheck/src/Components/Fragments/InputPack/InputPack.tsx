import Label from "@/Components/Elements/Labels/Label"
import Input from "@/Components/Elements/Inputs/Input"
const InputPack = (props) => {
  return (
    <>
        <Label htmlFor={props.htmlFor} text={props.text} className={props.className}/>
        <Input type={props.type} onChange={props.onChange} value={props.value} name={props.name} placeholder={props.placeholder} />
    </>
  )
}

export default InputPack