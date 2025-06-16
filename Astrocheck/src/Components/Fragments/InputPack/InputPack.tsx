import Label from "@/Components/Elements/Labels/Label"
import Input from "@/Components/Elements/Inputs/Input"
const InputPack = ({htmlFor = "", text = "", className = "", type = "", onChange = () => {}, value = "", name = "", placeholder = ""}) => {
  return (
    <>
        <Label htmlFor={htmlFor} text={text} className={className}/>
        <Input type={type} onChange={onChange} value={value} name={name} placeholder={placeholder} />
    </>
  )
}

export default InputPack