
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { ChatUser } from '../types/auth';

export const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    allUsers
  };
};
