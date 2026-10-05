import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { AdminTopbar } from '../components/admin/AdminTopbar';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminCategories } from '../components/admin/AdminCategories';
import { AdminDiscounts } from '../components/admin/AdminDiscounts';
import { AdminBlog } from '../components/admin/AdminBlog';
import { AdminSettings } from '../components/admin/AdminSettings';

export const AdminPage: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { routeParam, subRouteParam, navigateTo } = useStore();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Strict role check:
  // If not logged in -> redirect to login
  // If logged in but not admin -> redirect to account
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigateTo('login');
    } else if (user.role !== 'admin') {
      navigateTo('account');
    }
  }, [isAuthenticated, user, navigateTo]);

  // Sync routeParam with activeTab
  useEffect(() => {
    if (routeParam === 'products') {
      setActiveTab('products');
    } else if (routeParam === 'orders') {
      setActiveTab('orders');
    } else if (routeParam === 'users') {
      setActiveTab('users');
    } else if (routeParam === 'categories') {
      setActiveTab('categories');
    } else if (routeParam === 'discounts') {
      setActiveTab('discounts');
    } else if (routeParam === 'blog') {
      setActiveTab('blog');
    } else if (routeParam === 'settings') {
      setActiveTab('settings');
    } else {
      setActiveTab('dashboard');
    }
  }, [routeParam]);

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  const handleSelectTab = (tab: string, param?: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigateTo('admin');
    } else {
      navigateTo(`admin/${tab}${param ? '/' + param : ''}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-right text-slate-900 dark:text-slate-100">
      {/* Admin Topbar */}
      <AdminTopbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar
          currentTab={activeTab}
          onSelectTab={tab => handleSelectTab(tab)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <AdminDashboard onNavigateTab={(tab, param) => handleSelectTab(tab, param)} />
            )}

            {activeTab === 'products' && (
              <AdminProducts initialAction={subRouteParam} />
            )}

            {activeTab === 'orders' && (
              <AdminOrders initialOrderId={subRouteParam} />
            )}

            {activeTab === 'users' && <AdminUsers />}

            {activeTab === 'categories' && <AdminCategories />}

            {activeTab === 'discounts' && <AdminDiscounts />}

            {activeTab === 'blog' && <AdminBlog />}

            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};
