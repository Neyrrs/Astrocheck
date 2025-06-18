import DisabledInput from '@/Components/Elements/Inputs/DisabledInput';
import Label from '@/Components/Elements/Labels/Label';

const DisabledInputPack = ({namaLengkap = "", text = "", value = "", placeholder = "", width = ""}) => {
  return (
    <>
      <Label htmlFotr={namaLengkap || "htmlFor"} text={text || "Label"} className="text-base font-normal"/>
      <DisabledInput value={value} placeholder={placeholder || "Placeholder"} width={width || "full"} />
    </>
  )
}

export default DisabledInputPack