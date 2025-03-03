import { useState } from "react";
import Label from "@/Components/Elements/Labels/Label";
import DisabledInput from '../../Elements/Inputs/DisabledInput';
import { Eye, SlashedEye } from "../../../assets/Icons";


const ToggleInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
      <Label htmlFor={props.namaLengkap || "htmlFor"} text={props.text || "Label"} className="text-base" />

      <div className="relative">
        <DisabledInput
          type={showPassword ? "text" : "password"}
          value={props.value}
          width={props.width || "full"}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <img src={showPassword ? Eye : SlashedEye} className="w-6 h-6" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ToggleInput;
