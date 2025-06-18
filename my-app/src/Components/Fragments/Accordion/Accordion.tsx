"use client";

import React, { useState } from "react";
import Image from "next/image";
import DownArrow from "@/assets/Icons/DownArrow.png";

type AccordionProps = {
  image: string;
  alt?: string;
  question: string;
  answerOne?: string;
  answerSecond?: string;
  answerThird?: string;
  listType?: string;
};

const Accordion = (props: AccordionProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div
      className="w-full h-fit py-5 bg-[#DFE5F6] rounded-lg shadow-xl cursor-pointer px-4 md:px-8"
      onClick={toggle}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <Image
          src={props.image}
          width={32}
          height={32}
          alt={props.alt || "Accordion Icon"}
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
        />
        <p className="mr-auto text-sm sm:text-base px-2 sm:px-5 break-words">
          {props.question}
        </p>
        <button>
          <Image
            src={DownArrow}
            width={32}
            height={32}
            alt="Toggle Arrow"
            className={`transition-transform duration-500 ease-in-out ${
              show ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden duration-[0.6s] ease-in-out ${
          show ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <ul
          className={`text-sm border-t-2 border-black ${props.listType} list-inside mt-4 sm:mt-6 py-3 space-y-2`}
        >
          {props.answerOne && <li className="px-2 break-words">{props.answerOne}</li>}
          {props.answerSecond && <li className="px-2 break-words">{props.answerSecond}</li>}
          {props.answerThird && <li className="px-2 break-words">{props.answerThird}</li>}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
