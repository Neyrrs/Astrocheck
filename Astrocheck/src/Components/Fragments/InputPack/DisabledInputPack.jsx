import React from 'react'
import DisabledInput from '../../Elements/Inputs/DisabledInput';
import Label from '../../Elements/Labels/Label';

const DisabledInputPack = (props) => {
  return (
    <div className='my-4'>
      <Label htmlFotr={props.namaLengkap || "htmlFor"} text={props.text || "Label"} className="text-[14px]"/>
      <DisabledInput placeholder={props.placeholder || "Placeholder"}/>
    </div>
  )
}

export default DisabledInputPack