
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@blinkdotnew/sdk';

// Define the shape of the user object and auth state
interface User {
  id: string;
  email: string;
  metadata: {
    minecraftUsername?: string;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  updateMinecraftUsername: (username: string) => Promise<void>;
}

// Initialize the Blink client
const blink = createClient({
  projectId: 'minecraft-server-website-e0xgq6er',
  authRequired: false,
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user as User | null,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
      });
    });
    return () => unsubscribe();
  }, []);

  const login = () => {
    blink.auth.login();
  };

  const logout = () => {
    blink.auth.logout();
  };

  const updateMinecraftUsername = async (minecraftUsername: string) => {
    if (authState.user) {
      await blink.auth.updateMe({
        metadata: { ...authState.user.metadata, minecraftUsername },
      });
      // Refresh user state
      const user = await blink.auth.me();
      setAuthState(prev => ({ ...prev, user: user as User | null }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateMinecraftUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
