
import { User } from 'firebase/auth';

export interface ChatUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  lastActive: Date;
  isOnline: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  allUsers: ChatUser[];
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}
