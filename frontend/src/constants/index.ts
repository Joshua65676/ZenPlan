import { CalendarIcon, FIcon1, FIcon2, FIcon3, FIcon4, FIcon5, FIcon6, LogoutIcon, RemindIcon, SettingIcon, TaskIcon, TestIcon, Ratings, Avatar } from "../assets"

export const DAYS = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export const TIMEZONES = [
  'WAT', 'UTC', 'CAT', 'EAT', 'GMT',
  'EST', 'CST', 'MST', 'PST',
  'CET', 'EET', 'IST', 'JST', 'AEST'
]

export const MenuList = [
  {id: 1, icon: CalendarIcon, name: 'Calendar', link: ''},
  {id: 2, icon: TaskIcon, name: 'Tasks', link: ''},
  {id: 3, icon: RemindIcon, name: 'Reminder', link: ''},
]

export const MenuList2 = [
  {id: 1, icon: SettingIcon, name: 'Setting', link: ''},
  {id: 2, icon: LogoutIcon, name: 'Log Out', link: ''},
]

export const CalendarList = [
  {id: 1, name: 'Events', size: "62px"},
  {id: 2, name: 'Booking links', size: "100px"},
  {id: 3, name: 'Availability', size: "89px"},
]

export const TaskList = [
  {id: 1, name: 'All', size: "90px"},
  {id: 2, name: 'Pending', size: "110px"},
  {id: 3, name: 'Completed', size: "110px"},
  {id: 4, name: 'Overdue', size: "110px"},
]

export const ReminderList = [
  {id: 1, name: 'All', size: "56px"},
  {id: 2, name: 'Active', size: "79px"},
  {id: 3, name: 'Inactive', size: "86px"}
]

export const NavbarList = [ 
  {list: 'How it works', id: "how-it-works"},
  {list: 'Features', id: "features"},
  {list: 'Testimonial', id: "testimonial"},
  {list: 'FAQ', id: "faq"},
]

export const FeaturesList = [
  {id: 1, icon: FIcon1, name: "Constant Reminder", description: "With constant reminder, notifications will keep ringing until you handle them."},
  {id: 2, icon: FIcon2, name: "Repeat Reminder", description: "With recurring rules like weekly, monthly, yearly and custom ones at your service, you'll never forget a thing"},
  {id: 3, icon: FIcon3, name: "NLP", description: "Smart time recognition from your input when adding tasks, with automatic reminders set."},
  {id: 4, icon: FIcon4, name: "Filter", description: "Easily customize filters like high-priority tasks for this week to view quickly."},
  {id: 5, icon: FIcon5, name: "Task filler", description: "Organize your to-dos with ease and stay focused on what matters most."},
  {id: 6, icon: FIcon6, name: "Efficient Calendar", description: "A smarter calendar that keeps your meetings, tasks, and reminders perfectly in sync."},
]

export const TestimonialList = [
  {id: 1, icon: TestIcon, rating: Ratings, description: "ZenPlan completely changed how I organize my week. It’s simple, calm, and actually makes planning feel enjoyable instead of stressful.", avatar: Avatar, name: "Hearts of Taras", title: "Logo Designer"},
  {id: 2, icon: TestIcon, rating: Ratings, description: "ZenPlan helps me stay on top of projects and deadlines. The interface feels so peaceful like planning in a clear space, not chaos.", avatar: Avatar, name: "Mirana Marci", title: "3D Designer"},
  {id: 3, icon: TestIcon, rating: Ratings, description: "It’s more than just a planner ZenPlan makes me feel in control and calm at the same time. It’s the balance I didn’t know I needed", avatar: Avatar, name: "Dazzle Healer", title: "Front End Developer"},
  {id: 4, icon: TestIcon, rating: Ratings, description: "The attention to detail is amazing. Every interaction feels intentional, and it really helps me focus on what matters most each day.", avatar: Avatar, name: "Crystal Maiden", title: "UIUX Designer"}
]