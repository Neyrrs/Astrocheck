const SearchInput = (props) => {
  return (
    <>
        <input type="text" name={props.name} id={props.id} onClick={props.onClick} onChange={props.onChange} className='text-base font-light outline-none w-full' placeholder={props.placeholder || "Search"}/>
    </>
  )
}

export default SearchInput