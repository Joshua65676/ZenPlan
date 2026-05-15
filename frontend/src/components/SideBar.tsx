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
    <section className="w-full bg-black h-full flex flex-col items-start justify-start gap-8 px-5 py-5">
      <div>
        <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-white">
          Zen<span className="text-Purple">Plan</span>
        </h2>
      </div>
      <main className="flex flex-col items-start justify-between gap-10 h-full">
        <div className="flex flex-col items-start justify-start gap-3">
          <Create />
          <ListButton
            activeItem={activeItem}
            onChangeActiveItem={onChangeActiveItem}
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <Profile />
        </div>
      </main>
    </section>
  );
};

export default SideBar;
