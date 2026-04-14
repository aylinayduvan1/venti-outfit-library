// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "types/user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true) ;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false)
  }, []);

  const login = (t: string, user: User) => {
  setToken(t);
  setUser(user);

  localStorage.setItem("token", t);
  localStorage.setItem("user", JSON.stringify(user));
};

 const logout = () => {
  setToken(null);
  setUser(null);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

  return (
    <AuthContext.Provider value={{ token, user ,login, logout, loggedIn: !!token , loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};