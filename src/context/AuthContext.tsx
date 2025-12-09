import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "../api/axios.ts";
import { useNavigate } from "react-router-dom";

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (body: { name: string; email: string; password: string; avatar?: string}) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

 const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;  // user.avatar exists here
    setToken(token);
    setUser(user);
    setLoading(false);
    navigate("/categories");
    return { ok: true };
  } catch (err: any) {
    setLoading(false);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};

const register = async (body: { name: string; email: string; password: string; avatar?: string }) => {
  setLoading(true);
  try {
    const res = await api.post("/auth/register", body);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    setLoading(false);
    navigate("/categories");
    return { ok: true };
  } catch (err: any) {
    setLoading(false);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
};



  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
