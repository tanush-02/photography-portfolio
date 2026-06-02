import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  currentUser: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const [loading] = useState(false);

  const login = async (username: string, password: string) => {
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      setCurrentUser({ username });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Made with Bob
