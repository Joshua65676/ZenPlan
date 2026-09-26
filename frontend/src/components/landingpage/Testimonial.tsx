import React from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../../assets";
import { TestimonialList } from "../../constants";

const Testimonial: React.FC = () => {
  return (
    <section id="testimonial" className="bg-linear-to-bl from-white to-Grey/40">
      <main className="container mx-auto max-w-7xl w-full py-10 flex flex-col gap-20 items-center">
        <main className="flex flex-col gap-10 items-center">
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="font-outfit font-medium text-[20px] text-center leading-[130%] tracking-normal text-PurpleNormal">
              Testimonials
            </h2>
            <p className="font-outfit font-medium md:text-[32px] text-center leading-[130%] tracking-normal text-black md:w-169">
              Every story shared here reflects trust, impact, and real results.
            </p>
          </div>

          {/* MAP */}
          <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
            {TestimonialList.map((testimonial) => (
              <li key={testimonial.id}>
                <div className="md:w-[574.33px] md:h-[281.56px] w-120 rounded-[22.13px] p-[23.13px] bg-white flex flex-col gap-5">
                  <div className="flex flex-row justify-between items-center">
                    <img src={testimonial.icon} alt="" />
                    <img src={testimonial.rating} alt="" />
                  </div>
                  <p className="md:w-[530.08px] font-outfit font-[400px] text-[16px] leading-[190%] tracking-[0%] text-black">
                    {testimonial.description}
                  </p>
                  <div className="w-82 border-[0.92px] border-CardBorder"/>
                  <div className="flex flex-row gap-5 items-center">
                    <img src={testimonial.avatar} alt="" />
                    <div className="flex flex-col gap-2">
                      <span className="font-outfit font-bold text-[18px] leading-[100%] tracking-[0%] text-black">{testimonial.name}</span>
                      <span className="font-outfit font-[300px] text-[16px] leading-[100%] tracking-[0%] text-Grey">{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
        {/* BUTTON */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-outfit font-medium text-[32px] leading-[130%] tracking-normal text-black">
            Ready to be more productive?
          </h2>
          <div className="flex flex-row items-center gap-5">
           <Link to="/signup">
              <button className="bg-PurpleNormal text-white cursor-pointer font-outfit font-medium text-[16px] leading-[130%] tracking-normal py-3 px-5 rounded-xl w-40.5">
                Get Started
              </button>
            </Link>
            <button className="w-40.5 flex gap-2 rounded-xl cursor-pointer border py-3 px-5 border-black text-[16px] text-center items-center font-outfit font-medium text-black leading-[130%] tracking-[0%]">
              Learn more
              <img src={Arrow} alt=""/>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Testimonial;
