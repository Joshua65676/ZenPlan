import React from "react";
import { Logo } from "../../assets";
import { FooterList, Socials } from "../../constants";

const Footer: React.FC = () => {
  return (
    <section className="bg-BgWhite border-t border-BorderLine w-full">
      <main className="container mx-auto max-w-7xl w-full py-10 flex flex-col gap-8">
        {/* headers and links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 px-5">
          {/* header */}
          <div className="flex flex-col gap-3 items-start text-start">
            <div className="flex flex-row gap-2.5 text-center items-center">
              <img src={Logo} alt="logo" className="w-8.75 h-8.75" />
              <h2 className="font-outfit font-semibold text-[20px] leading-[130%] tracking-normal text-black">
                Zen<span className="text-Purple">Plan</span>
              </h2>
            </div>
            <p className="font-outfit font-[400px] w-80 text-[14px] leading-[130%] tracking-normal text-black">
              Join people who organize work and life{" "}
              <span className="font-bold text-black">
                everyday smarter with Zen
              </span>
              <span className="text-Purple">Plan</span>.
            </p>
          </div>
          {/* Links and social */}
          <div className="flex flex-row md:gap-20 justify-between">
            {FooterList.map((section, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h2 className="font-outfit font-[400px] text-[14px] text-black leading-[130%] tracking-normal">
                  {section.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="font-outfit font-[400px] hover:text-black text-[14px] text-Grey leading-[130%] tracking-normal"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* social */}
            <ul className="flex flex-col gap-5">
              {Socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <img src={social.icon} alt="social" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full border border-BorderLine" />
        <>
          <span className="font-outfit font-[400px] px-5 text-[16px] text-Grey leading-[130%] tracking-normal">
           &copy; 2025 Pipeops
          </span>
        </>
      </main>
    </section>
  );
};

export default Footer;
