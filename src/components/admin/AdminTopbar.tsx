import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { Store, LogOut, Bell, Shield, ExternalLink, Menu } from 'lucide-react';

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { navigateTo } = useStore();

  const handleLogout = () => {
    logout();
    navigateTo('login');
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            title="منو"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                پنل مدیریت نکسورا
              </span>
              <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* View Storefront Link */}
        <button
          onClick={() => navigateTo('home')}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Store className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="hidden sm:inline">مشاهده فروشگاه</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </button>

        {/* Notifications Icon */}
        <div className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </div>

        {/* User profile avatar & logout */}
        <div className="flex items-center gap-2.5 pr-2 border-r border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-xs flex items-center justify-center overflow-hidden border border-purple-200 dark:border-purple-800">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              user?.firstName?.charAt(0) || 'م'
            )}
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">مدیر کل سیستم</div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors mr-1"
            title="خروج از حساب مدیریت"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
