const Button = (props) => {
  return (
    <a href={props.path}>
      <button className={`border-2 bg-[#6384E9] text-white px-4 py-2 hover:bg-white hover:text-[#6384E9] ease-in duration-300 w-full rounded-[3px] hover:border-[#6384E9] border-transparent`}>
        {props.text || Button}
      </button>
    </a>
  )
}

export default Button