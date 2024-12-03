import Search from "../../../assets/Icons/Search.png"
const Input = () => {
  return (
    <>
    <div className="flex border-2 h-10 rounded-md hover:border-[#6384E9] active:border-[#6384E9] ease-in-out duration-300 items-center">
        <img src={Search} alt="" className='mx-3 w-5 h-5'/>
        <input type="text" className='text-lg font-light outline-none'/>
    </div>
    </>
  )
}

export default Input