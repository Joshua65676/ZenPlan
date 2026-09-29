import React, { useState } from "react";
import { BotImage, Close } from "../../assets";
import { FAQList } from "../../constants";

const FAQ: React.FC = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setVisible(visible === index ? null : index);
  };

  return (
    <section id="faq" className="bg-linear-to-tl from-white to-PurpleNormal/25">
      <main className="container mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 md:gap-20 md:px-8">
        <h2 className="font-outfit font-medium text-[20px] leading-[150%] tracking-[0%] text-center text-PurpleNormal">
          Frequently Ask Questions
        </h2>
        <div className="flex md:flex-row flex-col gap-8 md:gap-40 items-center">
          <div className="flex flex-col items-center gap-5">
            {FAQList.map((card, index) => {
              const isOpen = visible === index;
              return (
                <div
                  key={index}
                  className="w-full max-w-139.5 overflow-hidden rounded-[10px] border border-BorderColor bg-white px-4 sm:px-5"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="cursor-pointer w-full h-18.25 bg-white flex flex-row justify-between items-center text-center"
                  >
                    <span className="text-left font-outfit text-[16px] leading-[130%] text-black sm:text-[18px]">
                      {card.question}
                    </span>
                    <img
                      src={card.icon}
                      alt=""
                      className={`transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    />
                  </button>
                  <div
                    className={`w-full transition-all duration-200 ease-in-out ${isOpen ? "border-[0.92px] border-BorderLine opacity-100" : "overflow-hidden opacity-0"}`}
                  />
                  <div
                    className={`w-full font-outfit text-[16px] leading-[130%] text-black transition-all duration-200 ease-in-out sm:text-[18px] ${isOpen ? "max-h-40 py-3 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0"}`}
                  >
                    {card.answer}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center text-center">
              <img src={BotImage} alt="" />
              <span className="font-outfit font-[400px] text-[24px] leading-[150%] tracking-[0%] text-black">
                Any Question?
              </span>
              <p className="font-outfit font-[400px] text-[15px] leading-[150%] tracking-normal text-black text-center">
                You can ask anything you want to know Feedback
              </p>
            </div>

            <div className="relative flex flex-col gap-2 text-start items-start">
              <label className="font-outfit font-[400px] text-[13px] text-black leading-[150%] tracking-[0%] text-start">
                Let me know
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter here "
                className="h-9.5 w-full max-w-96 rounded-xl border bg-LightWhite px-3 py-2.5 font-outfit text-[14px] leading-[130%] text-Grey"
              />
              {value && (
                <button
                  onClick={() => setValue("")}
                  className="absolute right-2 top-1/2"
                >
                  <Close />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default FAQ;
