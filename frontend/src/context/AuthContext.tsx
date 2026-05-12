import { createContext } from 'react'

export interface User {
  id: number
  email: string
  name: string
  username: string | null
  profile_picture: string | null
  google_avatar: string | null
  is_profile_setup: boolean
}

export interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)