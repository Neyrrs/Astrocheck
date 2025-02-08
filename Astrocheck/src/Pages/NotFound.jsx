import { Link } from "react-router";

const NotFound = () => {
    
  return (
    <div className="flex flex-col gap-5 justify-center bg-black items-center h-screen w-full">
      <p className="text-4xl font-bold text-white">404 Page not found!</p>
      <p className="text-4xl font-bold text-white">Trying to <span className="text-[#98bddf] underline"><Link to="/login">log in</Link></span>?</p>
    </div>
  );
};

export default NotFound;
