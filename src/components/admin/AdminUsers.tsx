import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { authService } from '../../services/authService';
import { User, UserRole } from '../../types';
import { toPersianDigits } from '../../utils/persian';
import {
  Users,
  Search,
  Shield,
  UserCheck,
  ShieldAlert,
  Calendar,
  Phone,
  Mail,
  ShoppingBag
} from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { orders, showToast } = useStore();
  const [usersList, setUsersList] = useState<User[]>(() => authService.getAllUsers());
  const [searchTerm, setSearchTerm] = useState('');

  const refreshUsers = () => {
    setUsersList(authService.getAllUsers());
  };

  const handleToggleRole = (user: User) => {
    const newRole: UserRole = user.role === 'admin' ? 'user' : 'admin';
    const confirmMessage =
      newRole === 'admin'
        ? `آیا مایلید کاربر "${user.firstName} ${user.lastName}" به مدیر سیستم ارتقاء یابد؟`
        : `آیا مایلید سطح دسترسی کاربر "${user.firstName} ${user.lastName}" به کاربر عادی تغییر یابد؟`;

    if (window.confirm(confirmMessage)) {
      authService.changeUserRole(user.id, newRole);
      refreshUsers();
      showToast('تغییر سطح دسترسی', `نقش کاربر به ${newRole === 'admin' ? 'مدیر' : 'کاربر عادی'} تغییر یافت.`, 'success');
    }
  };

  const filteredUsers = usersList.filter(u => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const matchName = `${u.firstName} ${u.lastName}`.toLowerCase().includes(term);
      const matchEmail = u.email.toLowerCase().includes(term);
      const matchPhone = u.phone.includes(term);
      return matchName || matchEmail || matchPhone;
    }
    return true;
  });

  const getUserOrderCount = (userId: string, userPhone: string) => {
    return orders.filter(
      o => o.customer.userId === userId || o.customer.phone === userPhone
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت کاربران و مشتریان ({toPersianDigits(usersList.length)} کاربر)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            مشاهده اطلاعات کاربران، تعداد سفارش‌ها و مدیریت سطوح دسترسی (ادمین / مشتری).
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs text-xs">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="جستجوی نام، ایمیل یا شماره موبایل کاربر..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 pr-4">کاربر</th>
                <th className="py-3.5 px-3">شماره تماس</th>
                <th className="py-3.5 px-3">ایمیل</th>
                <th className="py-3.5 px-3">تاریخ عضویت</th>
                <th className="py-3.5 px-3">تعداد سفارش‌ها</th>
                <th className="py-3.5 px-3">نقش کاربری</th>
                <th className="py-3.5 pl-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map(u => {
                const orderCount = getUserOrderCount(u.id, u.phone);
                return (
                  <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center border border-purple-100 dark:border-purple-900 shrink-0">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.firstName} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            u.firstName.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {u.firstName} {u.lastName}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                            {u.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {u.phone}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {u.email}
                    </td>

                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {u.createdAt}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {toPersianDigits(orderCount)} سفارش
                    </td>

                    <td className="py-3 px-3">
                      {u.role === 'admin' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 inline-flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>مدیر کل سیستم</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span>کاربر عادی</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 pl-4 text-left">
                      <button
                        onClick={() => handleToggleRole(u)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          u.role === 'admin'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60'
                            : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60'
                        }`}
                      >
                        {u.role === 'admin' ? 'تنزیل به کاربر' : 'ارتقاء به مدیر'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
