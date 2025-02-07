const LoginButton = (props) => {
  return(
    <a href={props.path || "#"}>
      <button className={`border-2 bg-[#6384E9] text-white text-sm px-4 py-1 hover:bg-[#9eafdb] ease-in duration-100 w-${props.width} rounded-[7px] border-transparent`} {...props}>
        {props.text || "Button"}
      </button>
    </a>
  )
}

export default LoginButton