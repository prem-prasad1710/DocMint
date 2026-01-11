'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  
  // Safely get theme with fallback
  let resolvedTheme: 'light' | 'dark' = 'light';
  let setTheme: (theme: Theme) => void = () => {};
  
  try {
    const themeContext = useTheme();
    resolvedTheme = themeContext.resolvedTheme;
    setTheme = themeContext.setTheme;
  } catch (error) {
    // ThemeProvider not available (SSR/SSG), use defaults
    console.warn('DarkModeToggle: ThemeProvider not available');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="group relative p-2 rounded-lg glass-button hover:scale-110 transition-all duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`w-5 h-5 transition-all duration-500 ${
          isDark ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        } absolute inset-0 m-auto text-yellow-500`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`w-5 h-5 transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
        } absolute inset-0 m-auto text-blue-500`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
      </svg>

      {/* Placeholder for spacing */}
      <div className="w-5 h-5" />
      
      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-900 dark:bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}
