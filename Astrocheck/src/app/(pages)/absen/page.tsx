import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import { FormAbsenceStudents } from "@/Components/Fragments/CardsPack/Index";
import AuthGuard from "@/Components/AuthGuard/AuthGuard";

const Absen = () => {
  return (
    <AuthGuard>
      <Navbar />
      <div className="profileMenu w-full bg-blue-800 items-center justify-center pb-20 pt-20 flex">
        <div className="flex items-center justify-center ">
          <FormAbsenceStudents />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Absen;
