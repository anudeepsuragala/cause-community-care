import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User,
  getAuth,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export interface ChatUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  lastActive: Date;
  isOnline: boolean;
}

type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  allUsers: ChatUser[];
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmPhoneCode: (verificationId: ConfirmationResult, code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [allUsers, setAllUsers] = useState<ChatUser[]>([]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // If user is logged in, update their status in Firestore
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          lastActive: new Date(),
          isOnline: true
        }, { merge: true });
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Listen for all users
  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribe = onSnapshot(collection(firestore, 'users'), (snapshot) => {
      const users: ChatUser[] = [];
      snapshot.forEach((doc) => {
        const userData = doc.data() as ChatUser;
        // Convert Firestore timestamp to Date if needed
        userData.lastActive = (userData.lastActive as any)?.toDate() || new Date();
        users.push(userData);
      });
      setAllUsers(users);
    });

    return unsubscribe;
  }, [currentUser]);

  // Set user offline when they leave
  useEffect(() => {
    return () => {
      if (currentUser) {
        const userRef = doc(firestore, 'users', currentUser.uid);
        setDoc(userRef, {
          isOnline: false,
          lastActive: new Date()
        }, { merge: true });
      }
    };
  }, [currentUser]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      // Create a new RecaptchaVerifier instance if one doesn't exist
      if (!recaptchaVerifier) {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log('Recaptcha verified');
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.log('Recaptcha expired');
          }
        });
        setRecaptchaVerifier(verifier);
        
        // Render the reCAPTCHA widget
        await verifier.render();
        
        // Send verification code
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
        return confirmationResult;
      } else {
        // If recaptchaVerifier already exists, use it
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        return confirmationResult;
      }
    } catch (error) {
      console.error("Error signing in with phone:", error);
      throw error;
    }
  };

  const confirmPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      await confirmationResult.confirm(code);
    } catch (error) {
      console.error("Error confirming code:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    allUsers,
    signInWithGoogle,
    signInWithPhone,
    confirmPhoneCode,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
