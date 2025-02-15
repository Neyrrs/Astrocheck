import ProfileImage from "../../../Elements/Icons/ProfileImage";
import SuccessButton from "../../../Elements/Buttons/SuccessButton";
import useProfile from "../../../../Hooks/useProfile";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditProfile = () => {
  const user = useProfile();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nickname: "",
      kelas: "",
      jurusan: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname || "",
        kelas: user.kelas || "",
        jurusan: user.jurusan || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const token = localStorage.getItem("Token");
    axios.put("http://localhost:3000/profile/update", data, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24" />
        <div className="text-lg">
          <p>{user?.fullName}</p>
          <input
            {...register("kelas")}
            className="text-slate-500 outline-none text-lg"
            type="text"
            placeholder="Tekan profil untuk edit"
          />
        </div>
      </div>

      <div className="w-full mt-5 flex flex-col gap-2">
        <div>
          <label className="w-full text-left">Nama Tampilan</label>
          <input
            className={`focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-full text-sm rounded-[5px] font-light`}
            {...register("nickname")}
          />
        </div>
        <div>
          <label className="w-full text-left">Email</label>
          <input
            className={`focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-full text-sm rounded-[5px] font-light`}
            {...register("email")}
          />
        </div>
        <div>
          <label className="w-full text-left">Password</label>
          <input
            className={`focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-full text-sm rounded-[5px] font-light`}
            {...register("password")}
            placeholder="Insert your new password"
          />
        </div>
      </div>

      <div className="mt-5">
        <SuccessButton text="Simpan" type="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
