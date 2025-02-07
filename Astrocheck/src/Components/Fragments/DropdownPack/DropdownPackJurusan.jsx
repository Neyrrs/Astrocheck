import React from 'react'
import Label from '../../Elements/Labels/Label'
import DropdownJurusan from '../../Elements/Dropdown/DropdownJurusan'

const DropdownPackJurusan = () => {
  return (
    <div className='my-3'>
        <Label htmlFor="jurusan" text="Jurusan" className="text-sm"/>
        <DropdownJurusan />
    </div>
  )
}

export default DropdownPackJurusan