import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Laptop,
  ShoppingBag,
  Users,
  FolderTree,
  Tag,
  BookOpen,
  Settings,
  User,
  ArrowRight
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen = true,
  onClose
}) => {
  const { orders, products, navigateTo } = useStore();

  const pendingOrdersCount = orders.filter(
    o => o.status === 'pending_payment' || o.status === 'paid' || o.status === 'processing'
  ).length;

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد مدیریت', icon: LayoutDashboard },
    {
      id: 'products',
      label: 'مدیریت محصولات',
      icon: Laptop,
      badge: products.length
    },
    {
      id: 'orders',
      label: 'سفارش‌ها',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
    },
    { id: 'users', label: 'کاربران و مشتریان', icon: Users },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: FolderTree },
    { id: 'discounts', label: 'کدهای تخفیف', icon: Tag },
    { id: 'blog', label: 'مقالات و بلاگ', icon: BookOpen },
    { id: 'settings', label: 'تنظیمات فروشگاه', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 z-30 lg:hidden backdrop-blur-2xs"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] bottom-0 right-0 z-40 w-64 bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800 flex flex-col justify-between py-5 px-3 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
        style={{ height: 'calc(100vh - 57px)' }}
      >
        <div className="space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
            منوی ناوبری پنل
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <button
            onClick={() => navigateTo('account')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>پروفایل کاربری من</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      </aside>
    </>
  );
};
