import React from "react";
import { CreateTaskImage } from "../../assets";

const HowItworks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-BgWhite py-15 max-w-full scroll-mt-20">
      <main className="container mx-auto max-w-7xl w-full flex flex-col md:gap-5 gap-10">
        <div className="flex flex-col items-center text-center gap-3">
            <h2 className="font-outfit font-[400px] text-[20px] leading-[130%] tracking-normal text-center text-PurpleNormal">How it works</h2>
            <p className="font-outfit font-medium md:w-157 md:text-[32px] leading-[130%] tracking-[0%] text-center text-black">Intuitive design that makes productivity feel natural and easy</p>
        </div>
        <div className="flex md:flex-row flex-col-reverse md:justify-between items-center gap-5">
          <div className="flex flex-col gap-3 text-center md:text-start">
            <span className="font-outfit font-[400px] text-[24px] leading-[130%] tracking-normal text-Brown">Clear your mind</span>
            <h2 className="font-outfit font-[400px] md:w-85.75 md:text-[36px] leading-[130%] tracking-normal text-black">Create tasks and set priorities</h2>
            <p className="font-outfit font-[400px] text-[16px] leading-[130%] teacking-[0%] text-Grey md:w-114.25 w-100">Break down complex projects into manageable steps. Focus on what matters most.</p>
          </div>

          <div>
            <img src={CreateTaskImage} alt="task logo" className="md:h-full h-120"/>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HowItworks;
