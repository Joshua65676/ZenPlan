import React from "react";
import { MenuList, MenuList2 } from "../constants";

type ListButtonProps = {
  activeItem: string;
  onChangeActiveItem: (id: string) => void;
};

const ListButton: React.FC<ListButtonProps> = ({
  activeItem,
  onChangeActiveItem,
}) => {
  return (
    <main className="flex w-full flex-row items-center justify-between gap-0 md:flex-col md:items-center md:justify-start md:gap-59">
      <ul className="flex flex-row items-center justify-center gap-0 md:flex-col md:gap-1">
        {MenuList.map((item) => {
          const itemKey = `menu1-${item.id}`;
          const isActive = activeItem === itemKey;
          return (
            <li key={itemKey}>
              <button
                type="button"
                onClick={() => onChangeActiveItem(itemKey)}
                aria-label={item.name}
                title={item.name}
                className={`group flex h-12 w-11 cursor-pointer flex-row items-center justify-center rounded-xl px-0 transition duration-150 md:h-9.5 md:w-52 md:justify-start md:gap-2 md:px-3 lg:w-62 ${
                  isActive ? "bg-white text-black" : "text-white"
                } hover:bg-white hover:text-black`}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`h-5 w-5 filter transition duration-150 md:h-auto md:w-auto ${
                    isActive ? "invert" : "group-hover:invert"
                  }`}
                />
                <span className="hidden font-outfit text-[14px] leading-[130%] md:inline">
                  {item.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-row items-center justify-center gap-0 md:flex-col md:gap-1">
        {MenuList2.map((item) => {
          const itemKey = `menu2-${item.id}`;
          const isActive = activeItem === itemKey;
          return (
            <li key={itemKey}>
              <button
                type="button"
                onClick={() => onChangeActiveItem(itemKey)}
                aria-label={item.name}
                title={item.name}
                className={`group flex h-12 w-11 cursor-pointer flex-row items-center justify-center rounded-xl px-0 transition duration-150 md:h-9.5 md:w-52 md:justify-start md:gap-2 md:px-3 lg:w-62 ${
                  isActive ? "bg-white text-black" : "text-white"
                } hover:bg-white hover:text-black`}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`h-5 w-5 filter transition duration-150 md:h-auto md:w-auto ${
                    isActive ? "invert" : "group-hover:invert"
                  }`}
                />
                <span className="hidden font-outfit text-[14px] leading-[130%] md:inline">
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

export default ListButton;
