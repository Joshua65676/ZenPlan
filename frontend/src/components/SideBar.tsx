import React from "react";
import Create from "./Create";
import ListButton from "./ListButton";
import Profile from "./Profile";

type SideBarProps = {
  activeItem: string;
  onChangeActiveItem: (id: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({
  activeItem,
  onChangeActiveItem,
}) => {
  return (
    <section className="flex h-full w-full flex-row items-center justify-between gap-0 bg-black px-2 py-2 md:flex-col md:items-start md:justify-start md:gap-8 md:px-5 md:py-5">
      <div className="hidden md:block">
        <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-white">
          Zen<span className="text-Purple">Plan</span>
        </h2>
      </div>
      <main className="flex h-full w-full flex-row items-center justify-between gap-1 md:h-full md:flex-col md:items-start md:justify-between md:gap-10">
        <div className="flex w-full flex-row items-center justify-between gap-1 md:flex-col md:items-start md:justify-start md:gap-3">
          <div className="hidden md:block">
            <Create />
          </div>
          <ListButton
            activeItem={activeItem}
            onChangeActiveItem={onChangeActiveItem}
          />
        </div>
        <div className="hidden flex-col items-start justify-start md:flex">
          <Profile />
        </div>
      </main>
    </section>
  );
};

export default SideBar;
