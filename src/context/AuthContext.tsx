import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserAddress, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; user?: User; error?: string }>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  addAddress: (address: Omit<UserAddress, 'id'>) => Promise<UserAddress>;
  updateAddress: (addressId: string, address: Partial<UserAddress>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  useEffect(() => {
    // Keep in sync with authService
    const current = authService.getCurrentUser();
    setUser(current);
  }, []);

  const refreshUser = () => {
    const current = authService.getCurrentUser();
    setUser(current ? { ...current } : null);
  };

  const login = async (identifier: string, password: string) => {
    const result = authService.login(identifier, password);
    if (result.success && result.user) {
      setUser({ ...result.user });
    }
    return result;
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const result = authService.register(data);
    if (result.success && result.user) {
      setUser({ ...result.user });
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { success: false, error: 'کاربر وارد نشده است.' };
    const result = authService.updateProfile(user.id, data);
    if (result.success && result.user) {
      setUser({ ...result.user });
    }
    return result;
  };

  const changePassword = async (currentPass: string, newPass: string) => {
    if (!user) return { success: false, error: 'کاربر وارد نشده است.' };
    return authService.changePassword(user.id, currentPass, newPass);
  };

  const addAddress = async (addressData: Omit<UserAddress, 'id'>) => {
    if (!user) throw new Error('کاربر وارد نشده است.');
    const newAddr = authService.addAddress(user.id, addressData);
    refreshUser();
    return newAddr;
  };

  const updateAddress = async (addressId: string, addressData: Partial<UserAddress>) => {
    if (!user) return;
    authService.updateAddress(user.id, addressId, addressData);
    refreshUser();
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;
    authService.deleteAddress(user.id, addressId);
    refreshUser();
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return;
    authService.setDefaultAddress(user.id, addressId);
    refreshUser();
  };

  const role = user?.role || null;
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
