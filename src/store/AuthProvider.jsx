'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../data/api';

const AuthContext = createContext(null);
const TOKEN_KEY = 'easydrops-token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Restore a saved session and validate it against the API.
  useEffect(() => {
    let active = true;
    const saved = (() => {
      try {
        return localStorage.getItem(TOKEN_KEY);
      } catch {
        return null;
      }
    })();
    if (!saved) {
      setReady(true);
      return;
    }
    setToken(saved);
    api
      .me(saved)
      .then((d) => active && setUser(d.user))
      .catch(() => {
        // token invalid/expired
        if (!active) return;
        setToken(null);
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {
          /* ignore */
        }
      })
      .finally(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback((tok) => {
    try {
      if (tok) localStorage.setItem(TOKEN_KEY, tok);
      else localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      const d = await api.login(email, password);
      setToken(d.token);
      setUser(d.user);
      persist(d.token);
      return d.user;
    },
    [persist]
  );

  const register = useCallback(
    async (payload) => {
      const d = await api.register(payload);
      setToken(d.token);
      setUser(d.user);
      persist(d.token);
      return d.user;
    },
    [persist]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persist(null);
  }, [persist]);

  const refreshUser = useCallback((u) => setUser(u), []);

  const value = { token, user, ready, isLoggedIn: !!user, login, register, logout, refreshUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
