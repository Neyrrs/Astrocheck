const SearchInput = (props) => {
  return (
    <>
        <input type="text" onBlur={props.onBlur} onFocus={props.onFocus} name={props.name} id={props.id} onClick={props.onClick} onChange={props.onChange} className='text-base font-medium outline-none w-full text-slate-800 h-fit' placeholder={props.placeholder || "Search"}/>
    </>
  )
}

export default SearchInput