import React from "react";

const CardSummary = ({ title = "", data = 0 }) => {
  return (
    <>
      <div className="bg-white w-full shadow-md h-25 gap-3 flex flex-row items-center rounded-xl px-5">
        <div className="h-fit w-fit">
          <p className="text-base text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-semibold">{data}</p>
        </div>
      </div>
    </>
  );
};

export default CardSummary;
