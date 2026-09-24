import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets";
import { NavbarList } from "../../constants";

const Navbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);

  const stickNavbar = () => {
    const windowHeight = window.scrollY;
    setStickyClass(windowHeight > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  ${
        stickyClass ? "bg-GrayBg backdrop-blur-md" : ""
      }`}
    >
      <section className="container mx-auto max-w-7xl w-full px-4 py-10">
        <main className="flex flex-row justify-between items-center">
          <Link to="#" className="flex flex-row gap-2.5 text-center items-center">
            <img src={Logo} alt="logo" className="w-12.5 h-12.5" />
            <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
              Zen<span className="text-Purple">Plan</span>
            </h2>
          </Link>

          <div className="flex flex-row gap-5 text-center items-center">
            <ul className="hidden md:flex flex-row gap-5 text-center items-center">
              {NavbarList.map((item) => (
                <li key={item.id} className="">
                  <a href={`#${item.id}`} className="font-outfit font-[400px] text-[16px] leading-[130%] tracking-normal text-black">
                    {item.list}
                  </a>
                </li>
              ))}
            </ul>

            <>
             <button className="border border-black w-30.75 h-9.5 rounded-xl text-center cursor-poniter flex items-center justify-center px-4 py-2.5">
              <Link to="/login" className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-black">Sign up now</Link>
             </button>
            </>
          </div>
        </main>
      </section>
    </nav>
  );
};

export default Navbar;
