import Image from "next/image"

const Icons = (props) => {
  return (
    <>
        <Image src={props.image} alt={props.alt} {...props}/>
    </>
  )
}

export default Icons