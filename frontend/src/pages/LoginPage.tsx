import React, { useState } from "react";
import { GoogleIcon, LoginImage, Logo } from "../assets";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/auth/google?remember=${rememberMe ? 1 : 0}`,
      );

      if (!response.ok) {
        throw new Error(`Google login failed: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.url) {
        throw new Error("Google auth URL was not returned by the backend");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Could not start Google login. Please check the backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container min-h-screen w-full max-w-7xl bg-white">
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 py- md:flex-row md:justify-between">
        {/* Image and testimonials section (hidden on mobile)  */}
        <div className="w-1/2 relative hidden md:block">
          <div className="">
            <img src={LoginImage} alt="Login" className="w-full h-screen" />
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex max-w-127.75 flex-col items-start gap-4 rounded-lg bg-white/80 p-6 shadow-lg">
            <p className="w-full font-outfit text-[14px] font-normal leading-[130%] text-black">
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
        <div className="flex w-full max-w-110 flex-col items-center justify-center gap-10 py-6">
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
            className="flex flex-col items-center gap-3"
          >
            <label className="flex items-center gap-2 text-[12px] font-outfit text-Grey">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-PurpleNormal"
              />
              Remember me
            </label>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex h-12.5 w-70 md:w-112.75 items-center justify-center gap-3 rounded-xl border font-roboto text-[14px] font-semibold text-black hover:bg-slate-500/50 hover:text-white"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <img src={GoogleIcon} alt="Google Icon" className="" />
                  <span className="">Continue with Google</span>
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
