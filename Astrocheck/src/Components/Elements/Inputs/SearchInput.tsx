const SearchInput = (props) => {
  return (
    <>
        <input type="text" onBlur={props.onBlur} onFocus={props.onFocus} name={props.name} id={props.id} onClick={props.onClick} onChange={props.onChange} className='text-base font-light outline-none w-full h-fit' placeholder={props.placeholder || "Search"}/>
    </>
  )
}

export default SearchInput