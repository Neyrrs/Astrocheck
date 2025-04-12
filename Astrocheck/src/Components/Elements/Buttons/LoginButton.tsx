import React from "react"

const LoginButton = (props) => {
  return(
      <button className={`border-2 bg-[#6384E9] text-white text-sm font-light px-4 py-1 hover:bg-[#9eafdb] ease-in duration-100 w-${props.width} rounded-[7px] border-transparent`} onClick={props.onClick} {...props}>
        {props.text || "Button"}
      </button>
  )
}

export default LoginButton