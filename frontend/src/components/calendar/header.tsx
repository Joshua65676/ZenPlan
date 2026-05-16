import React from "react";
import { AddIcon } from "../../assets";
import Links from "./Links";

type HeaderProps = {
  activeLink: number;
  onChangeActiveLink: (id: number) => void;
  onAddEvent: () => void;
};

const Header: React.FC<HeaderProps> = ({
  activeLink,
  onChangeActiveLink,
  onAddEvent,
}) => {
  return (
    <section className="flex flex-col gap-5">
      <main className="flex flex-row items-center justify-between text-center">
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="text-[24px] text-black font-outfit font-medium leading-[130%] tracking-normal">
            Calendar & Events
          </h2>
          <p className="text-[12px] text-Grey font-outfit font-[400px] leading-[130%] tracking-normal">
            Manage your schedule and booking availability.
          </p>
        </div>

        <button
          className="w-29.5 h-9.5 rounded-xl py-[2.5px] px-3 flex flex-row items-center justify-center gap-2 bg-Purple cursor-pointer"
          onClick={onAddEvent}
        >
          <img src={AddIcon} alt="Add Event Icon" />
          <span className="text-[14px] text-white font-[400px] font-outfit leading-[130%] tracking-normal">
            Add Event
          </span>
        </button>
      </main>

      <div>
        <Links
          activeLink={activeLink}
          onChangeActiveLink={onChangeActiveLink}
        />
      </div>
    </section>
  );
};

export default Header;
