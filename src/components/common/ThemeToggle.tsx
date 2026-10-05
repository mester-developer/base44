import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'pill' | 'switch';
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useStore();
  const isDark = theme === 'dark';

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 select-none ${
          isDark
            ? 'bg-slate-800/80 border-slate-700/80 text-slate-100 hover:bg-slate-800'
            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
        } ${className}`}
        aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم دارک'}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-800/50'
                : 'bg-amber-100 text-amber-600 border border-amber-200'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 45, scale: 0.6, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -45, scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold">{isDark ? 'تم دارک (تاریک)' : 'تم لایت (روشن)'}</div>
            <div className="text-[10px] text-slate-400">
              {isDark ? 'حالت بهینه برای محیط‌های کم‌نور' : 'حالت پیش‌فرض شفاف و روشن'}
            </div>
          </div>
        </div>

        {/* Realistic toggle pill */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
            isDark ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="w-5 h-5 rounded-full bg-white shadow-sm"
          />
        </div>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={toggleTheme}
        type="button"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all select-none ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
        } ${className}`}
        title={isDark ? 'تغییر به تم روشن' : 'تغییر به تم دارک'}
        aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم دارک'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-icon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-indigo-400"
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-icon"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-amber-500"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <span>{isDark ? 'تم تاریک' : 'تم روشن'}</span>
      </motion.button>
    );
  }

  // Default compact icon variant for Navbar Header
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-xl transition-all select-none flex items-center justify-center border ${
        isDark
          ? 'bg-slate-800/90 text-amber-400 border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-amber-300 shadow-xs'
          : 'bg-slate-100/90 text-slate-600 border-slate-200/80 hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-2xs'
      } ${className}`}
      title={isDark ? 'تغییر به تم روشن' : 'تغییر به تم دارک'}
      aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم دارک'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon-nav"
            initial={{ rotate: -60, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 60, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun-nav"
            initial={{ rotate: 60, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -60, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      {showLabel && (
        <span className="mr-1.5 text-xs font-medium">
          {isDark ? 'روشن' : 'تاریک'}
        </span>
      )}
    </motion.button>
  );
};
