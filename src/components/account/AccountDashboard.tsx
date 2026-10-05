import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { ProductCard } from '../common/ProductCard';
import {
  Package,
  Clock,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AccountDashboardProps {
  onNavigateTab: (tab: string, param?: string) => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const { orders, wishlist, products, navigateTo } = useStore();

  // Filter orders belonging to this user
  const userOrders = orders.filter(
    o => (user?.id && o.customer.userId === user.id) || o.customer.phone === user?.phone
  );

  const inTransitCount = userOrders.filter(o => o.status === 'in_transit' || o.status === 'shipped' || o.status === 'processing').length;
  const deliveredCount = userOrders.filter(o => o.status === 'delivered').length;
  const recentOrders = userOrders.slice(0, 3);

  // Recommended products: top products not yet in wishlist
  const recommendedProducts = products.filter(p => !wishlist.includes(p.id)).slice(0, 4);

  const getStatusBadge = (status: string, statusFa: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            {statusFa || 'تحویل شده'}
          </span>
        );
      case 'in_transit':
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Clock className="w-3 h-3" />
            {statusFa || 'در حال ارسال'}
          </span>
        );
      case 'processing':
      case 'ready_to_ship':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            {statusFa || 'در حال پردازش'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3 h-3" />
            {statusFa || 'لغو شده'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {statusFa || 'در انتظار'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-l from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black mb-1">
              سلام، {user?.firstName} عزیز 👋
            </h1>
            <p className="text-xs text-blue-100 leading-relaxed">
              به پنل کاربری نکسورا خوش آمدید. از اینجا می‌توانید سفارش‌های خود را مدیریت کرده و وضعیت آن‌ها را به صورت لحظه‌ای دنبال نمایید.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('profile')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            مشاهده پروفایل
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xs cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">کل سفارش‌ها</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(userOrders.length)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">سفارش ثبت‌شده</div>
        </div>

        {/* In Transit */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-xs cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">در حال ارسال</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(inTransitCount)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">بسته در راه</div>
        </div>

        {/* Delivered */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">تحویل شده</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(deliveredCount)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">سفارش موفق</div>
        </div>

        {/* Wishlist */}
        <div
          onClick={() => onNavigateTab('wishlist')}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-xs cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">علاقه‌مندی‌ها</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {toPersianDigits(wishlist.length)}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">کالای نشان‌شده</div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">آخرین سفارش‌های من</h2>
          </div>
          {userOrders.length > 0 && (
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>مشاهده تمام سفارش‌ها</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">هنوز سفارشی ثبت نکرده‌اید</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              می‌توانید لپ‌تاپ‌های برتر بازار را در فروشگاه بررسی کرده و اولین سفارش خود را ثبت نمایید.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              مشاهده فروشگاه نکسورا
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.map(order => (
              <div
                key={order.id}
                onClick={() => onNavigateTab('orders', order.id)}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 p-3 rounded-xl transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.status, order.statusFa)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{toPersianDigits(order.items.length)} کالا</span>
                    <span>•</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {formatToman(order.finalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img
                        key={idx}
                        src={item.image}
                        alt={item.name}
                        className="inline-block h-9 w-9 rounded-lg border border-white dark:border-slate-800 bg-white dark:bg-slate-800 object-contain p-0.5 shadow-2xs"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    <span>جزئیات</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended For You Section */}
      {recommendedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">پیشنهادهای مناسب برای شما</h2>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <span>مشاهده همه محصولات</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
