import DisabledInput from '../../Elements/Inputs/DisabledInput';
import Label from '../../Elements/Labels/Label';

const DisabledInputPack = (props) => {
  return (
    <>
      <Label htmlFotr={props.namaLengkap || "htmlFor"} text={props.text || "Label"} className="text-base"/>
      <DisabledInput value={props.value} placeholder={props.placeholder || "Placeholder"} width={props.width || "full"}/>
    </>
  )
}

export default DisabledInputPack