import { useState } from "react";
import Label from "@/Components/Elements/Labels/Label";
import { Input } from "@/Components/Elements/Inputs";

const ToggleInput = ({namaLengkap = "", text = "", placeholder = "", width = ""}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col gap-2">
      <Label htmlFor={namaLengkap || "htmlFor"} text={text || "Label"} className="text-base" />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || "Masukkan teks"}
          width={width || "full"}
          disabled={true}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>
    </div>
  );
};

export default ToggleInput;
