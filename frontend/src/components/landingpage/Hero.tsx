import React from "react";
import { Arrow, CalendarHero, People, Stars } from "../../assets";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="mx-auto w-full bg-linear-to-bl from-white to-HeroBg/65 md:my-3 md:min-h-screen md:max-w-370 md:rounded-[20px]">
      <main className="container mx-auto w-full max-w-7xl px-4 py-28 sm:py-32 md:py-30">
        <div className="flex flex-col text-start gap-5">
          <div className="flex flex-col text-start gap-2">
            <h2 className="w-full max-w-144.5 font-outfit text-[36px] font-medium leading-[120%] text-black sm:text-[48px] md:text-[64px] md:leading-[130%]">
              Plan smarter, work better, live easier
            </h2>
            <p className="w-full max-w-144.5 font-outfit text-[16px] leading-[130%] text-Grey md:text-[20px]">
              Stay on top of your day with effortless planning and seamless
              productivity tools
            </p>
          </div>
          {/* buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-5">
            <Link to="/signup">
              <button className="w-30.75 h-9.5 cursor-pointer rounded-xl px-4 py-2.5 bg-LightPurple font-outfit font-[400px] text-[14px] leading-[130%] tracking-[0%] text-white">
                Get started
              </button>
            </Link>
            <button className="w-32 h-9.5 border rounded-xl cursor-pointer px-4 py-2.5 border-black flex flex-row gap-2 font-outfit font-[400px] text-[14px] leading-[130%] tracking-[0%] text-black">
              Get started
              <img src={Arrow} alt="" />
            </button>
          </div>
          {/* rating */}
          <div className="flex flex-row gap-3 items-center">
            <img src={People} alt="" />
            <div className="flex flex-col gap-1">
              <img src={Stars} alt="" />
              <span className="font-outfit font-[300px] text-[13px] leading-[130%] teacking-[0%] text-black">
                +100 Trusted users
              </span>
            </div>
          </div>
        </div>

        {/* canlender image */}
        <div className="hidden md:flex absolute top-63 right-4">
          <img src={CalendarHero} alt="" className="h-114.5" />
        </div>
      </main>
    </section>
  );
};

export default Hero;
