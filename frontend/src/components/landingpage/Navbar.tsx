import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets";
import { NavbarList } from "../../constants";

const Navbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const stickNavbar = () => {
    const windowHeight = window.scrollY;
    setStickyClass(windowHeight > 50);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        stickyClass ? "bg-GrayBg backdrop-blur-md" : ""
      }`}
    >
      <section className="container mx-auto max-w-7xl w-full px-4 py-10">
        <main className="flex flex-row justify-between items-center">
          <Link
            to="#"
            className="flex flex-row gap-2.5 text-center items-center"
          >
            <img src={Logo} alt="logo" className="w-12.5 h-12.5" />
            <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
              Zen<span className="text-Purple">Plan</span>
            </h2>
          </Link>

          <div className="flex items-center gap-3">
            <ul className="hidden md:flex flex-row gap-5 text-center items-center">
              {NavbarList.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-outfit font-[400px] text-[16px] leading-[130%] tracking-normal text-black transition-colors duration-200 hover:text-Purple"
                  >
                    {item.list}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="flex items-center justify-center rounded-xl border border-black bg-white px-4 py-2.5 font-outfit text-[14px] leading-[130%] tracking-normal text-black transition-all duration-200 hover:bg-Purple hover:text-white hover:border-Purple"
            >
              Sign up now
            </Link>

            <button
              type="button"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-black bg-white text-black transition-all duration-300 ease-in-out hover:border-Purple hover:text-Purple cursor-pointer"
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </main>
      </section>

      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[78%] max-w-75 bg-white p-5 pt-24 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-outfit text-[18px] font-medium text-black">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-BorderColor text-lg text-black transition-colors duration-200 hover:border-Purple hover:text-Purple cursor-pointer"
          >
            ×
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {NavbarList.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={closeMobileMenu}
                className="block rounded-xl px-3 py-3 font-outfit text-[16px] leading-[130%] tracking-normal text-black transition-all duration-200 hover:bg-Purple/5 hover:text-Purple"
              >
                {item.list}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-BorderColor pt-5">
          <Link
            to="/signup"
            onClick={closeMobileMenu}
            className="flex items-center justify-center rounded-xl border border-black bg-black px-4 py-3 font-outfit text-[14px] leading-[130%] tracking-normal text-white transition-all duration-200 hover:bg-Purple hover:border-Purple"
          >
            Sign up now
          </Link>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
