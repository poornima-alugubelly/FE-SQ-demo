import React, {
  createContext,
  useState,
  useContext,
  useMemo,
} from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

// Bug 1: Missing prop validation
export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Bug 2: Object identity changes on every render
  const theme = {
    primary: isDarkMode ? '#ffffff' : '#000000',
    secondary: isDarkMode ? '#cccccc' : '#333333',
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  // Bug 3: Function identity changes on every render
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Bug 4: Context value object changes identity on every render
  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          isDarkMode,
          toggleTheme,
          theme,
        }),
        [isDarkMode, theme]
      )}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Bug 5: No error handling for undefined context
export const useTheme = () => {
  return useContext(ThemeContext);
};
