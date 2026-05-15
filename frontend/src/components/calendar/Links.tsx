import React from "react";
import { CalendarList } from "../../constants";

type LinksProps = {
  activeLink: number;
  onChangeActiveLink: (id: number) => void;
};

const Links: React.FC<LinksProps> = ({ activeLink, onChangeActiveLink }) => {
  return (
    <main>
      <ul className="flex flex-row items-center justify-center bg-LightWhite h-9.5 w-66.75 gap-0.5 rounded-[20px] py-1.5 px-2.5">
        {CalendarList.map((item) => {
          const isActive = activeLink === item.id;
          const widthClass =
            item.size === "62px"
              ? "w-[62px]"
              : item.size === "100px"
                ? "w-[100px]"
                : item.size === "89px"
                  ? "w-[89px]"
                  : "w-auto";
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
                <span className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-normal">
                  {item.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Links;
