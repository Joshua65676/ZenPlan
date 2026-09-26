import React from "react";
import { FeaturesList } from "../../constants";

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="relative bg-BgWhite overflow-hidden py-10 max-w-full scroll-mt-20"
    >
      {/* fading grid overlay */}
      <div
        className="absolute w-185.75 h-185.25 z-50 top-0 right-0 rotate-180 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(70,71,78,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(70,71,78,0.15) 1px, transparent 1px)
      `,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom left, transparent 50%, black)",
          WebkitMaskImage:
            "linear-gradient(to bottom left, transparent, black)",
        }}
      />

      <div
        className="absolute w-185.75 h-185.25 top-20 z-50 left-0 rotate-180 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(70,71,78,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(70,71,78,0.15) 1px, transparent 1px)
      `,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to top right, transparent 50%, black)",
          WebkitMaskImage:
            "linear-gradient(to top right, transparent, black)",
        }}
      />

      <main className="relative container mx-auto max-w-7xl w-full flex flex-col md:gap-5 gap-10 py-3">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-outfit font-[400px] text-[20px] leading-[130%] tracking-normal text-center text-PurpleNormal">
            Features
          </h2>
          <p className="font-outfit font-medium md:text-[32px] tracking-[0%] text-center text-black leading-[130%]">
            Meet your unique needs
          </p>
        </div>

        <ul className="grid md:grid-cols-3 grid-cols-1 gap-4 justify-items-center">
          {FeaturesList.map((feature) => (
            <li key={feature.id}>
              <div className="flex flex-col items-start text-start gap-3 p-10 border-[1.17px] border-BorderColor rounded-[20px] w-95.75 h-75 bg-white">
                <img
                  src={feature.icon}
                  alt={feature.name}
                />
                <h2 className="font-outfit font-[400px] text-[24px] leading-[130%] tracking-normal text-black">
                  {feature.name}
                </h2>
                <p className="font-outfit font-[400px] text-[16px] leading-[130%] tracking-normal text-Grey w-69">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Features;
