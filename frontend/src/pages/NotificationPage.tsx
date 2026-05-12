// import { useState } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { Logo, NotificationImg } from "../assets";

const NotificationsPage = () => {
  //   const navigate = useNavigate()
  //   const [searchParams] = useSearchParams()
  //   const token = searchParams.get('token') ?? localStorage.getItem('auth_token')

  //   const [notifications, setNotifications] = useState()

  //   const toggleNotification = (id: string) => {
  //     setNotifications(prev =>
  //       prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
  //     )
  //   }

  //   const handleContinue = () => {
  //     navigate(`/dashboard?token=${token}`)
  //   }

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
              Step 3 of 3
            </span>
            <div></div>
          </div>
        </main>

        <main className="flex flex-col items-center gap-3">
          {/* Title */}
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <img src={Logo} alt="Logo" className="" />
            <div>
              <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
                Stay in the Loop
              </h2>
              <p className="font-outfit font-[400px] md:w-[419px] text-[16px] leading-[130%] tracking-normal text-Grey">
                Allow notifications to get timely reminders for task and
                upcoming events right on your desktop.
              </p>
            </div>
          </div>
          {/* Image */}
          <div>
            <img src={NotificationImg} alt="Notification" className="" />
          </div>
        </main>
      </motion.main>
    </section>
  );
};

export default NotificationsPage;
