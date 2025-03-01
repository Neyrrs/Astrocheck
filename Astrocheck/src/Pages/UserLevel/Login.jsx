import {
  CardLoginForm,
  CardLoginFormGuest,
} from "../../Components/Fragments/CardsPack/Login";
import { useState } from "react";

const Login = () => {
  const [studentLogin, sestSudentLogin] = useState(true);

  const handleLoginTypeChanges = () => {
    sestSudentLogin(!studentLogin);
  };
  
  return (
    <div className="Login w-full h-screen justify-center items-center flex">
      <div className="bg-[#F0F0F0] shadow-2xl w-[25rem] h-fit rounded-lg pt-14 pb-20 flex justify-center">
        <div>
          <div className="flex text-center">
            <label className="text-[25px] w-full font-semibold text-center">
              Login
            </label>
          </div>
          <div className="gap-5 flex flex-col">
            {studentLogin ? <CardLoginForm /> : <CardLoginFormGuest />}
            <button
              onClick={handleLoginTypeChanges}
              className="text-center text-xs text-gray-500"
            >
              Login sebagai siswa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
