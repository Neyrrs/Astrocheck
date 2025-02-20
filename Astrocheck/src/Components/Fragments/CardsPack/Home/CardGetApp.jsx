import SecondaryButton from "../../../Elements/Buttons/SecondaryButton";
import {CheckedList} from "../../../../assets/Icons";

const CardGetApp = () => {
  return (
    <>
      <div className="flex mt-0 justify-center">
        <div className="w-[70%] py-10 px-10 flex items-center bg-gradient-to-bl from-[#A4B4E0] to-[#dfe7ff3d] h-fit rounded-lg gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-white text-2xl">
              Coba Aplikasi Astrocheck Sekarang!
            </p>
            <div className="flex gap-5 mt-3 text-white font-light">
             <CheckList text="Akses Lebih Cepat & Praktis"/>
             <CheckList text="Notifikasi Real-Time"/>
             <CheckList text="Design Lebih Minimalis"/>

            </div>
          </div>
          <div className="h-full flex items-center">
            <SecondaryButton text="Unduh" width="10" height="2"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGetApp;


const CheckList = (props) => {
    return(
        <>
        <p className="flex gap-2">
        <span>
          <img
            src={CheckedList}
            className="w-5 h-5 object-contain"
            alt=""
          />
        </span>
        {props.text}
      </p>
        </>
    );
}