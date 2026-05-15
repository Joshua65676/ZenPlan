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
    <main className="flex flex-col items-center justify-start gap-59">
      <ul className="flex flex-col items-center justify-start gap-1">
        {MenuList.map((item) => {
          const itemKey = `menu1-${item.id}`;
          const isActive = activeItem === itemKey;
          return (
            <li key={itemKey}>
              <button
                type="button"
                onClick={() => onChangeActiveItem(itemKey)}
                className={`group cursor-pointer flex flex-row items-center justify-start gap-2 w-62 h-9.5 rounded-xl py-3 px-3 transition duration-150 ${
                  isActive ? "bg-white text-black" : "text-white"
                } hover:bg-white hover:text-black`}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`filter transition duration-150 ${
                    isActive ? "invert" : "group-hover:invert"
                  }`}
                />
                <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal">
                  {item.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col items-center justify-start gap-1">
        {MenuList2.map((item) => {
          const itemKey = `menu2-${item.id}`;
          const isActive = activeItem === itemKey;
          return (
            <li key={itemKey}>
              <button
                type="button"
                onClick={() => onChangeActiveItem(itemKey)}
                className={`group cursor-pointer flex flex-row items-center justify-start gap-2 w-62 h-9.5 rounded-xl py-3 px-3 transition duration-150 ${
                  isActive ? "bg-white text-black" : "text-white"
                } hover:bg-white hover:text-black`}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`filter transition duration-150 ${
                    isActive ? "invert" : "group-hover:invert"
                  }`}
                />
                <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal">
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
