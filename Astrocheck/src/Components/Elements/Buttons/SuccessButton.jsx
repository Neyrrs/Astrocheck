import React from 'react'

const SuccessButton = (props) => {
  return (
    <>
        <button className='bg-[#00C853] mt-2 text-white px-4 py-1 text-sm font-light hover:bg-[hsl(145,100%,35%)] ease-in duration-300  rounded-md'>{props.text || "Button"}</button>
    </>
  )
}

export default SuccessButton