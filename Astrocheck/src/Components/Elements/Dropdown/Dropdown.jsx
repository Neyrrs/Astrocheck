import React from 'react'

const Dropdown = (props) => {
  return (
    <>
    <select name={props.name} id={props.id}>
        <option value={props.value1 || "Value1"}>{props.option1 || "Option1"}</option>
        <option value={props.value2 || "Value2"}>{props.option2 || "Option2"}</option>
    </select>
      <input type={props.type} name={props.name} className="focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-2 mb-2 py-2 w-60 h-[2rem] text-xs rounded-[4px] font-light" placeholder={props.placeholder || "Placeholder"}/>
    </>
  )
}

export default Dropdown