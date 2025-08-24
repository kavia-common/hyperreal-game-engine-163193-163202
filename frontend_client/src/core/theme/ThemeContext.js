import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * ThemeContext manages light/dark auto theme per system preference with manual override.
 */
const ThemeContext = createContext({
  theme: 'auto',
  setTheme: () => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme state and persists preference to localStorage. */
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'auto';
  });

  useEffect(() => {
    const root = document.documentElement;
    const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = theme === 'auto' ? (sysDark ? 'dark' : 'light') : theme;
    root.setAttribute('data-theme', nextTheme);
  }, [theme]);

  const ctx = useMemo(() => ({
    theme,
    setTheme: (val) => {
      localStorage.setItem('theme', val);
      // eslint-disable-next-line no-console
      console.log('[Theme] set', val);
      return setTheme(val);
    }
  }), [theme]);

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to get and set current theme. */
  return useContext(ThemeContext);
}
