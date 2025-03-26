
import React, { createContext, useContext } from 'react';
import { useAuthState } from '../hooks/useAuthState';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, logout } from '../services/authService';
import { AuthContextType } from '../types/auth';

// Export the ChatUser type from the types file
export { type ChatUser } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isLoading, isAuthenticated, allUsers } = useAuthState();

  const value: AuthContextType = {
    currentUser,
    isLoading,
    isAuthenticated,
    allUsers,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
