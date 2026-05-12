import React, { useState } from "react";
import { GoogleIcon, LoginImage, Logo } from "../assets";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/auth/google");
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="w-full container max-w-7xl bg-white">
      <main className="flex items-center justify-between flex-row">
        {/* Image and testimonials section (hidden on mobile)  */}
        <div className="w-1/2 relative hidden md:block">
          <div className="">
            <img src={LoginImage} alt="Login" className="w-full h-screen" />
          </div>
          <div className="absolute bottom-3 left-15 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-127.75 flex flex-col items-start gap-4">
            <p className="w-116 h-13 text-[14px] font-outfit text-black font-normal leading-[130%] tracking-normal">
              “Honestly, I used to hate to-do lists they felt heavy and
              stressful. But this app made it fun. Every checkmark feels like a
              tiny win, and those little wins add up. For once, my tasks feel
              doable”
            </p>
            <span className="font-outfit text-[14px] font-normal leading-[130%] tracking-normal text-Purple">
              Sophia M. – Product Manager
            </span>
          </div>
        </div>

        {/* Login form section  */}
        <div className="w-110 h-62 flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <img src={Logo} alt="Logo" className="" />
            <div>
              <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
                Zen<span className="text-Purple">Plan</span>
              </h2>
              <p className="font-outfit font-[400px] text-[16px] leading-[130%] tracking-normal text-Grey">
                login into your account
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="md:w-112.75 h-12.5 hover:bg-slate-500/50 hover:text-white font-roboto font-semibold text-[14px] leading-[130%] teacking-normal text-black rounded-xl border gap-3 flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <img src={GoogleIcon} alt="Google Icon" className="" />
                  <span className="">
                    Continue with Google
                  </span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </main>
    </section>
  );
};

export default LoginPage;
