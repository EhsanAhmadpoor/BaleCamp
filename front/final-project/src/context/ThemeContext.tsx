import React, { useEffect, useState, createContext } from 'react'

type Theme = 'dark' | 'light' | 'system'

export interface ThemeContextState {
  theme: 'dark' | 'light' | 'system',
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContextState = {
  theme: 'system',
  setTheme: () => null
}

export const ThemeContext = createContext<ThemeContextState>(initialState);

interface ThemeProviderProps {
  children: React.ReactNode,
  defaultTheme: Theme,
  storageKey: string
}

export const ThemeProvider = ({
  children,
  defaultTheme,
  storageKey,
  ...props
}: ThemeProviderProps) => {

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme || defaultTheme));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

  }, [theme])

  const value = {
    theme: theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    }
  }

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )

}