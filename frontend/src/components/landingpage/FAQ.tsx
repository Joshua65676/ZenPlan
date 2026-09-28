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
      <main className="container mx-auto max-w-7xl w-full px-8 py-10 flex flex-col gap-20">
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
                  className="overflow-hidden px-5 md:w-139.5 w-110 rounded-[10px] border bg-white border-BorderColor"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="cursor-pointer w-full h-18.25 bg-white flex flex-row justify-between items-center text-center"
                  >
                    <span className="font-outfit font-meduim text-[18px] text-black leading-[130%] tracking-normal">
                      {card.question}
                    </span>
                    <img
                      src={card.icon}
                      alt=""
                      className={`transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-200 ease-in-out w-125 -ml-8 ${isOpen ? "opacity-100 border-[0.92px] border-BorderLine" : "opacity-0 overflow-hidden"}`}
                  />
                  <div
                    className={`transition-all duration-200 ease-in-out w-105 md:w-139.5 font-outfit font-[600px] text-[18px] text-black leading-[130%] tracking-normal ${isOpen ? "opacity-100 py-3 max-h-40" : "opacity-0 overflow-hidden py-0 max-h-0"}`}
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
                className="w-[384px] h-9.5 rounded-xl border py-2.5 px-3 bg-LightWhite font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-Grey"
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
