import React from 'react';
import { useStore } from '../../context/StoreContext';
import { authService } from '../../services/authService';
import { formatToman, toPersianDigits } from '../../utils/persian';
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  ChevronLeft,
  Plus,
  ArrowUpRight
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string, param?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { orders, products, navigateTo } = useStore();

  const allUsers = authService.getAllUsers();

  // Metrics
  const totalSales = orders.reduce((sum, o) => {
    if (o.status !== 'cancelled') {
      return sum + o.finalAmount;
    }
    return sum;
  }, 0);

  const totalOrdersCount = orders.length;
  const totalUsersCount = allUsers.length;
  const outOfStockCount = products.filter(p => !p.inStock).length;

  const recentOrders = orders.slice(0, 5);
  const topProducts = products.slice(0, 4);

  const getStatusBadge = (status: string, statusFa: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {statusFa || 'تحویل داده شده'}
          </span>
        );
      case 'in_transit':
      case 'shipped':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {statusFa || 'در مسیر تحویل'}
          </span>
        );
      case 'processing':
      case 'ready_to_ship':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            {statusFa || 'در حال پردازش'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            {statusFa || 'لغو شده'}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {statusFa || 'پرداخت شده'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white mb-1">
            داشبورد مدیریت و آمار نکسورا
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            وضعیت لحظه‌ای فروش، سفارش‌ها، محصولات و مشتریان فروشگاه
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('products', 'new')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن محصول جدید</span>
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors"
          >
            مدیریت سفارش‌ها
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">مجموع فروش خالص</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {formatToman(totalSales)}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <span>+۱۲٪ نسبت به ماه گذشته</span>
          </div>
        </div>

        {/* Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">کل سفارش‌ها</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(totalOrdersCount)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">سفارش ثبت‌شده در سیستم</div>
        </div>

        {/* Total Users */}
        <div
          onClick={() => onNavigateTab('users')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">کاربران ثبت‌نامی</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(totalUsersCount)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">مشتری و مدیر ثبت‌شده</div>
        </div>

        {/* Out of stock / Low stock */}
        <div
          onClick={() => onNavigateTab('products')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:border-amber-300 dark:hover:border-amber-600 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">اتمام موجودی</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(outOfStockCount)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">کالای بدون موجودی انبار</div>
        </div>
      </div>

      {/* Main Row: Recent Orders Table & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">سفارش‌های اخیر</h2>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
            >
              <span>مشاهده تمام سفارش‌ها</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-medium">
                  <th className="pb-3 pr-2">شماره سفارش</th>
                  <th className="pb-3">مشتری</th>
                  <th className="pb-3">تاریخ</th>
                  <th className="pb-3">مبلغ کل</th>
                  <th className="pb-3">وضعیت</th>
                  <th className="pb-3 pl-2 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 pr-2 font-mono font-bold text-slate-900 dark:text-white">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{order.date}</td>
                    <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">
                      {formatToman(order.finalAmount)}
                    </td>
                    <td className="py-3">
                      {getStatusBadge(order.status, order.statusFa)}
                    </td>
                    <td className="py-3 pl-2 text-left">
                      <button
                        onClick={() => onNavigateTab('orders', order.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-bold transition-colors"
                      >
                        مدیریت
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">محصولات منتخب</h2>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              مدیریت
            </button>
          </div>

          <div className="space-y-3.5">
            {topProducts.map(prod => (
              <div
                key={prod.id}
                className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-10 h-10 object-contain rounded-lg bg-slate-50 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {formatToman(prod.price)}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    prod.inStock
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  {prod.inStock ? 'موجود' : 'ناموجود'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
