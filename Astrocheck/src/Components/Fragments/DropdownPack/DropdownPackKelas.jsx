import React from "react";
import Label from "../../Elements/Labels/Label";
import DropdownKelas from "../../Elements/Dropdown/DropdownKelas";

const DropdownPackKelas = ({ setKelas, kelas }) => {
  return (
    <div className="my-3">
      <Label htmlFor="kelas" text="Kelas" className="text-sm" />
      <DropdownKelas setKelas={setKelas} kelas={kelas} />
    </div>
  );
};

export default DropdownPackKelas;
