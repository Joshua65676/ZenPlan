import { createContext } from "react";

export type Email = string;

export interface User {
  id: number;
  email: Email;
  gmail?: Email | null;
  name: string;
  username: string | null;
  profile_picture: string | null;
  google_avatar: string | null;
  is_profile_setup: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
