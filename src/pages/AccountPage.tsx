import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { AccountSidebar } from '../components/account/AccountSidebar';
import { AccountDashboard } from '../components/account/AccountDashboard';
import { AccountProfile } from '../components/account/AccountProfile';
import { AccountOrders } from '../components/account/AccountOrders';
import { AccountOrderDetail } from '../components/account/AccountOrderDetail';
import { AccountAddresses } from '../components/account/AccountAddresses';
import { AccountWishlist } from '../components/account/AccountWishlist';
import { AccountCompare } from '../components/account/AccountCompare';
import { AccountSettings } from '../components/account/AccountSettings';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { routeParam, subRouteParam, navigateTo } = useStore();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Sync routeParam with activeTab and selectedOrderId
  useEffect(() => {
    if (routeParam === 'profile') {
      setActiveTab('profile');
      setSelectedOrderId(null);
    } else if (routeParam === 'orders') {
      setActiveTab('orders');
      if (subRouteParam) {
        setSelectedOrderId(subRouteParam);
      } else {
        setSelectedOrderId(null);
      }
    } else if (routeParam === 'addresses') {
      setActiveTab('addresses');
      setSelectedOrderId(null);
    } else if (routeParam === 'wishlist') {
      setActiveTab('wishlist');
      setSelectedOrderId(null);
    } else if (routeParam === 'compare') {
      setActiveTab('compare');
      setSelectedOrderId(null);
    } else if (routeParam === 'settings') {
      setActiveTab('settings');
      setSelectedOrderId(null);
    } else {
      setActiveTab('dashboard');
      setSelectedOrderId(null);
    }
  }, [routeParam, subRouteParam]);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigateTo('login');
    }
  }, [isAuthenticated, user, navigateTo]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedOrderId(null);
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    navigateTo('account', 'orders', orderId);
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
    navigateTo('account', 'orders');
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Sidebar on Right (in RTL), Content on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 sticky top-24">
            <AccountSidebar
              currentTab={activeTab}
              onSelectTab={handleSelectTab}
            />
          </div>

          {/* Main Account Content Area */}
          <main className="lg:col-span-3 min-w-0">
            {activeTab === 'dashboard' && (
              <AccountDashboard
                onNavigateTab={(tab, param) => {
                  setActiveTab(tab);
                  if (param && tab === 'orders') {
                    setSelectedOrderId(param);
                    navigateTo('account', 'orders', param);
                  } else {
                    navigateTo(`account/${tab}`);
                  }
                }}
              />
            )}

            {activeTab === 'profile' && <AccountProfile />}

            {activeTab === 'orders' && (
              <>
                {selectedOrderId ? (
                  <AccountOrderDetail
                    orderId={selectedOrderId}
                    onBack={handleBackToOrders}
                  />
                ) : (
                  <AccountOrders onSelectOrder={handleSelectOrder} />
                )}
              </>
            )}

            {activeTab === 'addresses' && <AccountAddresses />}

            {activeTab === 'wishlist' && <AccountWishlist />}

            {activeTab === 'compare' && <AccountCompare />}

            {activeTab === 'settings' && <AccountSettings />}
          </main>
        </div>

      </div>
    </div>
  );
};
