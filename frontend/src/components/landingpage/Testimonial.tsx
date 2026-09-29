import React from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../../assets";
import { TestimonialList } from "../../constants";

const Testimonial: React.FC = () => {
  return (
    <section id="testimonial" className="bg-linear-to-bl from-white to-Grey/25">
      <main className="container mx-auto max-w-7xl w-full px-4 py-10 flex flex-col gap-20 items-center">
        <main className="flex flex-col gap-10 items-center">
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="font-outfit font-medium text-[20px] text-center leading-[130%] tracking-normal text-PurpleNormal">
              Testimonials
            </h2>
            <p className="w-full max-w-169 font-outfit text-center font-medium leading-[130%] text-black md:text-[32px]">
              Every story shared here reflects trust, impact, and real results.
            </p>
          </div>

          {/* MAP */}
          <ul className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-8 justify-items-center">
            {TestimonialList.map((testimonial) => (
              <li key={testimonial.id}>
                <div className="flex h-auto w-full max-w-[574.33px] flex-col gap-5 rounded-[22.13px] bg-white p-5 sm:p-6 md:min-h-[281.56px]">
                  <div className="flex flex-row justify-between items-center">
                    <img src={testimonial.icon} alt="" />
                    <img src={testimonial.rating} alt="" />
                  </div>
                  <p className="w-full max-w-[530.08px] font-outfit text-[16px] leading-[190%] text-black">
                    {testimonial.description}
                  </p>
                  <div className="w-full border-[0.92px] border-CardBorder" />
                  <div className="flex flex-row gap-5 items-center">
                    <img src={testimonial.avatar} alt="" />
                    <div className="flex flex-col gap-2">
                      <span className="font-outfit font-bold text-[18px] leading-[100%] tracking-[0%] text-black">
                        {testimonial.name}
                      </span>
                      <span className="font-outfit font-[300px] text-[16px] leading-[100%] tracking-[0%] text-Grey">
                        {testimonial.title}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
        {/* BUTTON */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-center font-outfit text-[24px] font-medium leading-[130%] text-black sm:text-[32px]">
            Ready to be more productive?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <Link to="/signup">
              <button className="bg-PurpleNormal text-white cursor-pointer font-outfit font-medium text-[16px] leading-[130%] tracking-normal py-3 px-5 rounded-xl w-40.5">
                Get Started
              </button>
            </Link>
            <button className="w-40.5 flex gap-2 rounded-xl cursor-pointer border py-3 px-5 border-black text-[16px] text-center items-center font-outfit font-medium text-black leading-[130%] tracking-[0%]">
              Learn more
              <img src={Arrow} alt="" />
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Testimonial;
