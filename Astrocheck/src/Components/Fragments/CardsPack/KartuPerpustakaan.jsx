import ProfileImageSquare from "../../Elements/Icons/ProfileImageSquare";
const KartuPerpustakaan = () => {
  return (
    <div className="w-full h-[22rem] flex justify-center">
      <div className="h-[21rem] w-[30rem] bg-[#f5f5f5] rounded-lg">
        <div className="flex justify-center border-spacing-5 border-b-2 py-3 mx-10">
          <p className="text-base">Kartu Perpustakaan SMKN 1 Cibinong</p>
        </div>
        <div className="flex left-5 mt-5 px-[4rem]">
          <div>
            <ProfileImageSquare />
          </div>
          <div className="mx-7 font-base">
            <p className="">Nama</p>
            <p className="">Ezwan Ibnu Yassar</p>
            <p className="">NIS</p>
            <p className="">1234567890</p>
            <p className="">Kelas</p>
            <p className="">XI RPL 2</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-300 h-8 mt-5 w-[15rem]"></div>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-sm">Copyright Easy Library</p>
        </div>
      </div>
    </div>
  );
};

export default KartuPerpustakaan;
