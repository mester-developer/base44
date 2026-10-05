import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  User,
  Package,
  MapPin,
  Heart,
  Scale,
  Settings,
  LogOut,
  Shield,
  Truck
} from 'lucide-react';

interface AccountSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({ currentTab, onSelectTab }) => {
  const { user, logout, isAdmin } = useAuth();
  const { navigateTo, orders, wishlist, compareList } = useStore();

  const handleLogout = () => {
    logout();
    navigateTo('home');
  };

  // Filter orders for this user
  const userOrders = orders.filter(
    o => (user?.id && o.customer.userId === user.id) || o.customer.phone === user?.phone
  );

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard, route: 'account' },
    { id: 'profile', label: 'پروفایل من', icon: User, route: 'account/profile' },
    {
      id: 'orders',
      label: 'سفارش‌های من',
      icon: Package,
      route: 'account/orders',
      badge: userOrders.length > 0 ? userOrders.length : undefined
    },
    { id: 'tracking', label: 'پیگیری سریع سفارش', icon: Truck, route: 'tracking' },
    {
      id: 'wishlist',
      label: 'علاقه‌مندی‌ها',
      icon: Heart,
      route: 'account/wishlist',
      badge: wishlist.length > 0 ? wishlist.length : undefined
    },
    {
      id: 'compare',
      label: 'مقایسه محصولات',
      icon: Scale,
      route: 'account/compare',
      badge: compareList.length > 0 ? compareList.length : undefined
    },
    {
      id: 'addresses',
      label: 'آدرس‌های من',
      icon: MapPin,
      route: 'account/addresses',
      badge: user?.addresses?.length
    },
    { id: 'settings', label: 'تنظیمات حساب', icon: Settings, route: 'account/settings' }
  ];

  return (
    <aside className="w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
      {/* Profile Header Summary */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg overflow-hidden shrink-0">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
          ) : (
            user?.firstName?.charAt(0) || 'ک'
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </h2>
            {isAdmin && (
              <span className="px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[10px] font-bold shrink-0 border border-purple-200 dark:border-purple-800">
                مدیر
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
            {user?.phone || user?.email}
          </p>
        </div>
      </div>

      {/* Admin Panel Quick Link if Admin */}
      {isAdmin && (
        <div className="mb-3">
          <button
            onClick={() => navigateTo('admin')}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-between transition-colors shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>ورود به پنل مدیریت</span>
            </div>
            <span className="text-[10px] bg-purple-500/40 px-1.5 py-0.5 rounded-md">
              ادمین
            </span>
          </button>
        </div>
      )}

      {/* Menu Navigation */}
      <nav className="space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (item.id === 'tracking') {
                  navigateTo('tracking');
                } else {
                  navigateTo(item.route);
                }
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Logout Button */}
        <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            <span>خروج از حساب</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
