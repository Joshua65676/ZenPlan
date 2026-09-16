import React from "react";
import { ReminderList } from "../../constants";

type RemindCounts = {
  all: number;
  active: number;
  inactive: number;
};

type LinksProps = {
  activeLink: number;
  onChangeActiveLink: (id: number) => void;
  counts: RemindCounts;
};

const Links: React.FC<LinksProps> = ({
  activeLink,
  onChangeActiveLink,
  counts,
}) => {
  return (
    <main className="flex flex-col items-start gap-5">
      <div>
        <ul className="flex flex-row items-center justify-center bg-LightWhite h-9.5 w-63.25 gap-2 rounded-[20px] py-1.5 px-2.5">
          {ReminderList.map((item) => {
            const isActive = activeLink === item.id;
            const widthClass =
              item.size === "56px"
                ? "w-[56px]"
                : item.size === "79px"
                  ? "w-[79px]"
                  : item.size === "86px"
                    ? "w-[86px]"
                      : "w-auto";
            const itemCount =
              item.id === 1
                ? counts.all
                : item.id === 2
                  ? counts.active
                  : item.id === 3
                    ? counts.inactive
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
          Reminders
        </h2>
        <span className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-normal text-Grey">
          {`${counts.active} of ${counts.all} reminders are active`}
        </span>
      </div>
    </main>
  );
};

export default Links;
