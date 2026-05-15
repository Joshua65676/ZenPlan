import { CalendarIcon, LogoutIcon, RemindIcon, SettingIcon, TaskIcon } from "../assets"

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