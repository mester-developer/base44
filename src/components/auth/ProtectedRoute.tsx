import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { navigateTo } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('login');
    } else if (requiredRole === 'admin' && !isAdmin) {
      // Normal user trying to access admin
      navigateTo('account');
    }
  }, [isAuthenticated, isAdmin, requiredRole, navigateTo]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center">
        <div className="animate-pulse text-slate-500 text-sm">
          در حال انتقال به صفحه ورود...
        </div>
      </div>
    );
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 text-center">
        <div className="animate-pulse text-slate-500 text-sm">
          دسترسی غیرمجاز. در حال انتقال به داشبورد کاربری...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
