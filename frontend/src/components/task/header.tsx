import React from "react";
import { AddWhite } from "../../assets";
import Links from "./Links";

type TaskCounts = {
  all: number;
  pending: number;
  completed: number;
  overdue: number;
};

type HeaderProps = {
  activeLink: number;
  onChangeActiveLink: (id: number) => void;
  onAddTask: () => void;
  counts: TaskCounts;
};

const Header: React.FC<HeaderProps> = ({
  activeLink,
  onChangeActiveLink,
  onAddTask,
  counts,
}) => {
  return (
    <section className="flex flex-col gap-5">
      <main className="flex flex-row items-center justify-between text-center">
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="text-[24px] text-black font-outfit font-medium leading-[130%] tracking-normal">
            Task Management
          </h2>
          <p className="text-[12px] text-Grey font-outfit font-[400px] leading-[130%] tracking-normal">
            Focus on what truly matters every day.
          </p>
        </div>

        <button
          className="w-29.5 h-9.5 rounded-xl py-[2.5px] px-3 flex flex-row items-center justify-center gap-2 bg-Purple cursor-pointer"
          onClick={onAddTask}
        >
          <img src={AddWhite} alt="Add Event Icon" />
          <span className="text-[14px] text-white font-[400px] font-outfit leading-[130%] tracking-normal">
            Add Task
          </span>
        </button>
      </main>

      <div>
        <Links
          activeLink={activeLink}
          onChangeActiveLink={onChangeActiveLink}
          counts={counts}
        />
      </div>
    </section>
  );
};

export default Header;
