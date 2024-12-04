import PrimaryButton from "../../Elements/Buttons/PrimaryButton";
import InputPack from "../InputPack/InputPack";

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
          <InputPack htmlFor="NISN" text="NISN" type="text" name="NISN" placeholderz="Contoh: 0123456789"/>
          <InputPack htmlFor="password" text="Password" type="password" name="password" placeholderz="Password Anda" />
        </div>
        <div className="mt-8">
          <PrimaryButton text="Login" path="/" width="full"/>
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
