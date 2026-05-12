import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "../assets";

const SetupProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const firstLetter = user?.name?.charAt(0).toUpperCase() ?? "?";

  // Check if user is logged in on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          // Not logged in, redirect to login
          navigate("/");
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/");
      } finally {
        setFetching(false);
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setProfilePicture(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/setup-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profilePicture }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setUser(data.user);
      navigate("/working-hours");
    } catch (err) {
      console.error("Setup failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-black font-outfit font-semibold text-xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white w-full container max-w-7xl mx-auto py-5">
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-10"
      >
        {/* navbar */}
        <main className="flex items-center justify-between flex-row">
          <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
            Zen<span className="text-Purple">Plan</span>
          </h2>
          <div className="flex flex-row items-center justify-center text-center gap-4">
            <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-Grey">
              Step 1 of 3
            </span>
            <div></div>
          </div>
        </main>

        {/* Profile setting */}
        <main className="flex items-center justify-center flex-col gap-8 py-5">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <img src={Logo} alt="Logo" className="" />
            <div>
              <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
                Welcome to Zen<span className="text-Purple">Plan</span>,{" "}
                {user?.name ?? "there"}👋🏾
              </h2>
              <p className="font-outfit font-[400px] text-[16px] leading-[130%] tracking-normal text-Grey">
                Let’s help you set up your workspace in a few steps.
              </p>
            </div>
          </div>
          {/* Profile Pics */}
          <div className="flex flex-col items-center justify-center gap-2">
            <label htmlFor="profilePic" className="cursor-pointer">
              <div className="w-28 h-28 rounded-full border border-Grey border-dashed flex items-center justify-center overflow-hidden bg-LightWhite transition-all">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[32px] font-outfit font-bold leading-[130%] tracking-normal text-Grey">
                      {firstLetter}
                    </span>
                  </div>
                )}
              </div>
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="text-red-400 text-xs text-center mb-4">{error}</p>
            <p className="text-[14px] font-outfit font-normal leading-[130%] tracking-normal text-Grey text-center">
              Upload a profile picture (optional)
            </p>
          </div>

          {/* Button */}
          <div className="md:w-112.75 h-11.25 rounded-xl flex items-center justify-center bg-Purple">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-200 cursor-pointer"
            >
              {loading ? "Setting up..." : "Continue"}
            </button>
          </div>
        </main>
      </motion.main>
    </section>
  );
};

export default SetupProfilePage;
