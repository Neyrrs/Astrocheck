const Icons = (props) => {
  return (
    <>
        <img src={props.image} alt={props.alt} className={`mx-3 w-${props.size}`}/>
    </>
  )
}

export default Icons