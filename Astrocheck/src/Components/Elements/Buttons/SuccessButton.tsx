
const SuccessButton = (props) => {
  return (
    <>
        <button type="submit" className='bg-[#00C853] mt-2 text-white px-8 py-2 text-sm font-light hover:bg-[hsl(145,100%,35%)] ease-in duration-300  rounded-lg'>{props.text || "Button"}</button>
    </>
  )
}

export default SuccessButton