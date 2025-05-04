import React from "react";

const CardSummary = (props) => {
  return (
    <>
      <div className="bg-white w-full h-25 gap-3 flex flex-row items-center rounded-xl px-5">
        <div className="h-fit w-fit">
          <p className="text-base text-slate-500 font-medium">
            {props.title}
          </p>
          <p className="text-3xl font-semibold">{props.data}</p>
        </div>
      </div>
    </>
  );
};

export default CardSummary;
