import React from "react";
import Label from "../../Elements/Labels/Label";
import DropdownAlasan from "../../Elements/Dropdown/DropdownAlasan";

const DropdownPackAlasan = ({ setAlasan, alasan }) => {
  return (
    <div className="my-3">
      <Label htmlFor="alasan" text="Alasan" className="text-sm" />
      <DropdownAlasan setAlasan={setAlasan} alasan={alasan} />
    </div>
  );
};

export default DropdownPackAlasan;
