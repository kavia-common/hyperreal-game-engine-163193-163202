import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * AuthContext provides simple authentication state and stubs for login/logout/register.
 * Environment variables (to be provided by orchestrator) should include:
 * - REACT_APP_API_BASE_URL
 */
const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  token: null,
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state across the app. Replace stubs with real API calls when backend is ready. */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = useMemo(() => ({
    user,
    token,
    login: async (email, password) => {
      // TODO: integrate with backend REST API
      const fakeToken = 'dev-token';
      setUser({ id: 'u1', email, name: email.split('@')[0] });
      setToken(fakeToken);
      return { ok: true };
    },
    register: async (email, password) => {
      // TODO: integrate with backend REST API
      setUser({ id: 'u2', email, name: email.split('@')[0] });
      setToken('dev-token');
      return { ok: true };
    },
    logout: async () => {
      setUser(null);
      setToken(null);
      return { ok: true };
    }
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook for authentication state and actions. */
  return useContext(AuthContext);
}
