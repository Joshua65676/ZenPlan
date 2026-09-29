import React from "react";
import { CreateTaskImage } from "../../assets";

const HowItworks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="max-w-full scroll-mt-20 bg-BgWhite px-4 py-15 sm:px-6 md:px-8"
    >
      <main className="container mx-auto flex w-full max-w-7xl flex-col gap-10 px-0 md:gap-5 md:px-4">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-outfit font-[400px] text-[20px] leading-[130%] tracking-normal text-center text-PurpleNormal">
            How it works
          </h2>
          <p className="w-full max-w-157 font-outfit font-medium leading-[130%] text-center text-black md:text-[32px]">
            Intuitive design that makes productivity feel natural and easy
          </p>
        </div>
        <div className="flex md:flex-row flex-col-reverse md:justify-between items-center gap-5">
          <div className="flex flex-col gap-3 text-center md:text-start">
            <span className="font-outfit font-[400px] text-[24px] leading-[130%] tracking-normal text-Brown">
              Clear your mind
            </span>
            <h2 className="w-full font-outfit text-[28px] leading-[130%] text-black md:text-[36px]">
              Create tasks and set priorities
            </h2>
            <p className="w-full max-w-114.25 font-outfit text-[16px] leading-[130%] text-Grey">
              Break down complex projects into manageable steps. Focus on what
              matters most.
            </p>
          </div>

          <div>
            <img
              src={CreateTaskImage}
              alt="task logo"
              className="h-auto w-full max-w-2xl object-contain md:h-full"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default HowItworks;
