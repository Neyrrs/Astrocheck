import Label from "../../Elements/Labels/Label";
import InputForm from "../../Elements/Inputs/InputForm";
import Button from "../../Elements/Buttons/Button";

const CardForm = () => {
  return (
    <div className="bg-[#F0F0F0] shadow-2xl w-[25rem] h-[26rem] rounded-md py-10 flex justify-center">
      <div className="">
        <div className="flex text-center">
          <label className="text-2xl w-full font-semibold text-center">
            Login
          </label>
        </div>
        <div className="mt-8">
          <Label htmlFor="NISN" text="NISN" />
          <InputForm type="text" name="NISN" placeholderz="Contoh: 0123456789"/>
          <Label htmlFor="password" text="Password" />
          <InputForm type="password" name="password" placeholderz="Password Anda" />
        </div>
        <div className="mt-8">
          <Button text="Login" textColor="white" path="/"/>
        </div>
        <div className="mt-5 font-light text-xs">
          <p className="text-center text-gray-500">Atau login dengan <br />
          Scan kartu perpustakaan anda</p>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
