"use client"

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    try {
      if (typeof window === 'undefined') return 'light';
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored as 'dark' | 'light';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      // ignore
    }
  }, [theme]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="btn-ghost"
      onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
