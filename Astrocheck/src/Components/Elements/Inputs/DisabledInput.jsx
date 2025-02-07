import React from 'react'

const DisabledInput = (props) => {
  return (
    <>
      <input type="text" disabled={true} placeholder={props.placeholder || "Placeholder"} className={`text-sm font-light border-2 px-2 py-[6px] rounded-[5px] w-[30rem]`}/>
    </>
  )
}

export default DisabledInput