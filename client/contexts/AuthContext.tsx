import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  userName: string;
  email: string;
}

interface AuthContextValue extends AuthState {
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    userName: 'Hi, Emilia',
    email: '',
  });

  const login = (email: string) => {
    setState({ isLoggedIn: true, userName: 'Hi, Emilia', email });
  };

  const logout = () => {
    setState({ isLoggedIn: false, userName: 'Hi, Emilia', email: '' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
