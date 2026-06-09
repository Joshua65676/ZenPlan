import { motion } from 'framer-motion'
import { startOfWeek, addDays, format, isToday } from 'date-fns'

interface Props {
  onSelectDate: (date: Date) => void
  selectedDate: Date
}

const WeekStrip = ({ onSelectDate, selectedDate }: Props) => {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 0 })

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div className="w-full">
      {/* Day Strip */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isSelected =
            format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
          const isTodayDate = isToday(day)

          return (
            <motion.button
              key={index}
              onClick={() => onSelectDate(day)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 py-2.5 px-3 h-20.5 rounded-[20px] transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-Purple text-white'
                  : isTodayDate
                  ? 'bg-VioletLight'
                  : 'bg-VioletLight'
              }`}
            >
              <span className={`text-[14px] font-outfit leading-[130%] tracking-0 font-bold ${
                isSelected ? 'text-white' : 'text-black'
              }`}>
                {format(day, 'EEE')}
              </span>
              <span className={`text-[14px] font-outfit leading-[130%] tracking-0 font-[400px] ${
                isSelected ? 'text-white' : 'text-Grey'
              }`}>
                {format(day, 'd')}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default WeekStrip