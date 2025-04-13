'use client'

import React, { useState } from "react";
import DownArrow from "@/assets/Icons/DownArrow.png";

const Accordion = (props) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="h-fit py-5 bg-[#DFE5F6]  px-8 rounded-lg shadow-xl cursor-pointer" onClick={toggle}>
        <div className="flex items-center gap-5">
          <img
            src={props.image}
            className="w-8 object-contain h-8"
            alt={props.alt}
          />
          <p className="mr-auto px-5">{props.question}</p>
          <button>
            <img
              src={DownArrow.src}
              className={`w-8 h-8 object-contain ease-in-out duration-[0.4s] ${
                show ? "rotate-180" : ""
              }`}
              alt=""
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-[0.7s] ease-in-out ${
            show ? "max-h-40" : "max-h-0"
          }`}
        >
          <ul className={`text-sm border-t-2 border-black ${props.listType} list-inside mt-6 py-3`}>
            <li className="mt-2 px-2 w-[45rem]">{props.answerOne}</li>
            <li className="mt-2 px-2 w-[50rem]">{props.answerSecond}</li>
            <li className="mt-2 px-2 w-[50rem]">{props.answerThird}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Accordion;
