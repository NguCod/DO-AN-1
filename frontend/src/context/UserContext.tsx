import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { customerLogin } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');
    return token && stored ? JSON.parse(stored) : null;
  });
  const login = async (email: string, password: string) => {
    const res = await customerLogin({ email, password });
    const userData: User = {
      id: String(res.userId),
      name: res.email.split('@')[0],
      email: res.email,
      role: res.role
    };
    setUser(userData);
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
export default UserProvider;

