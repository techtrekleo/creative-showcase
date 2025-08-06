import React, { createContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import * as firebaseAuth from 'firebase/auth';
import { AppUser } from '../types';
import { auth } from '../firebase';

const ADMIN_EMAILS = ['techtrekleo2000@gmail.com'];
const USER_STORAGE_KEY = 'creative_showcase_users';

interface AuthContextType {
  user: AppUser | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storeUser = (user: AppUser) => {
  if (!user.email) return;
  try {
    const storedUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
    const storedUsers: AppUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
    
    if (!storedUsers.some(u => u.email === user.email)) {
      const updatedUsers = [...storedUsers, user];
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  } catch (error) {
    console.error("Failed to store user in localStorage", error);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (firebaseUser: firebaseAuth.User | null) => {
      if (firebaseUser) {
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL,
          given_name: firebaseUser.displayName?.split(' ')[0] || null,
        };
        setUser(appUser);
        storeUser(appUser);
        setIsAdmin(!!appUser.email && ADMIN_EMAILS.includes(appUser.email));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async () => {
    const provider = new firebaseAuth.GoogleAuthProvider();
    try {
      await firebaseAuth.signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseAuth.signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  const value = useMemo(() => ({ user, isAdmin, loading, login, logout }), [user, isAdmin, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};