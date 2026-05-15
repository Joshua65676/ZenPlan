import React from "react";
import { AddIcon } from "../assets";

const Create: React.FC = () => {
  return (
    <>
      <button className="w-62 h-9.5 rounded-xl border border-Purple py-3 px-3 flex flex-row items-center justify-start gap-2 cursor-pointer">
        <img src={AddIcon} alt="add icon" />
        <span className="font-outfit font-[400px] text-[14px] text-Purple leading-[130%] tracking-normal">
          Create
        </span>
      </button>
    </>
  );
};

export default Create;
