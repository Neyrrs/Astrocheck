'use client'

import { useState } from "react";
import Label from "@/Components/Elements/Labels/Label";
import DisabledInput from '@/Components/Elements/Inputs/DisabledInput';
import { Eye, SlashedEye } from "@/assets/Icons/Index";
import Image from "next/image";


const ToggleInput = ({namaLengkap = "", text = "", value = "", width = ""}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
      <Label htmlFor={namaLengkap || "htmlFor"} text={text || "Label"} className="text-base font-normal" />

      <div className="relative">
        <DisabledInput
          type={showPassword ? "text" : "password"}
          value={value}
          width={width || "full"}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <Image width={24} height={24} src={showPassword ? Eye : SlashedEye} className="w-6 h-6" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ToggleInput;
