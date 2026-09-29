import React from "react";
import { TaskList } from "../../constants";

type TaskCounts = {
  all: number;
  pending: number;
  completed: number;
  overdue: number;
};

type LinksProps = {
  activeLink: number;
  onChangeActiveLink: (id: number) => void;
  counts: TaskCounts;
};

const Links: React.FC<LinksProps> = ({
  activeLink,
  onChangeActiveLink,
  counts,
}) => {
  return (
    <main className="flex flex-col items-start gap-5">
      <div className="w-full max-w-full overflow-x-auto">
        <ul className="flex min-w-max flex-row items-center justify-center gap-2 rounded-[20px] bg-LightWhite px-2.5 py-1.5">
          {TaskList.map((item) => {
            const isActive = activeLink === item.id;
            const widthClass =
              item.size === "90px"
                ? "w-[90px]"
                : item.size === "100px"
                  ? "w-[100px]"
                  : item.size === "110px"
                    ? "w-[110px]"
                    : item.size === "110px"
                      ? "w-[110px]"
                      : "w-auto";
            const itemCount =
              item.id === 1
                ? counts.all
                : item.id === 2
                  ? counts.pending
                  : item.id === 3
                    ? counts.completed
                    : item.id === 4
                      ? counts.overdue
                      : 0;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onChangeActiveLink(item.id)}
                  className={`flex flex-row cursor-pointer rounded-[20px] h-7 text-center justify-center items-center py-1.25 transition duration-150 ${widthClass} ${
                    isActive
                      ? "bg-white text-black"
                      : "text-Grey hover:bg-white hover:text-black"
                  }`}
                >
                  <span className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-normal text-center">
                    {item.name} ({itemCount})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-outfit font-semibold text-[20px] leading-[130%] tracking-normal text-black">
          To-Do List
        </h2>
        <span className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-normal text-Grey">
          {`${counts.completed} of ${counts.all} tasks completed`}
        </span>
      </div>
    </main>
  );
};

export default Links;
