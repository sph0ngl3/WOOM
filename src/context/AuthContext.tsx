import React, { createContext, useContext, useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USER } from '../services/mockData';
import { useRouter } from 'expo-router';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const router = useRouter();

  const login = (selectedRole: UserRole) => {
    const newUser = { ...MOCK_USER, role: selectedRole };
    setUser(newUser);
    setRole(selectedRole);
    
    // Navigate based on role
    setTimeout(() => {
      if (selectedRole === 'user') router.replace('/(user)');
      else if (selectedRole === 'driver') router.replace('/(driver)');
      else if (selectedRole === 'business') router.replace('/(business)');
    }, 100);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
