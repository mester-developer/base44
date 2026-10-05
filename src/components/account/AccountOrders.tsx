import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatToman, toPersianDigits } from '../../utils/persian';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ShoppingBag,
  Search,
  Filter,
  Truck
} from 'lucide-react';

interface AccountOrdersProps {
  onSelectOrder: (orderId: string) => void;
}

export const AccountOrders: React.FC<AccountOrdersProps> = ({ onSelectOrder }) => {
  const { user } = useAuth();
  const { orders, navigateTo } = useStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'in_progress' | 'delivered' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // IMPORTANT: Filter ONLY currently logged-in user's orders!
  const userOrders = orders.filter(
    o => (user?.id && o.customer.userId === user.id) || o.customer.phone === user?.phone
  );

  const filteredOrders = userOrders.filter(order => {
    // Filter status tab
    if (activeFilter === 'in_progress') {
      if (!['pending_payment', 'paid', 'processing', 'ready_to_ship', 'shipped', 'in_transit'].includes(order.status)) {
        return false;
      }
    } else if (activeFilter === 'delivered') {
      if (order.status !== 'delivered') return false;
    } else if (activeFilter === 'cancelled') {
      if (order.status !== 'cancelled') return false;
    }

    // Filter search
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(term);
      const matchItem = order.items.some(it => it.name.toLowerCase().includes(term));
      const matchTrack = order.trackingCode?.toLowerCase().includes(term);
      return matchNum || matchItem || matchTrack;
    }

    return true;
  });

  const getStatusBadge = (status: string, statusFa: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusFa || 'تحویل داده شده'}</span>
          </span>
        );
      case 'in_transit':
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Truck className="w-3.5 h-3.5" />
            <span>{statusFa || 'در مسیر تحویل'}</span>
          </span>
        );
      case 'processing':
      case 'ready_to_ship':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5" />
            <span>{statusFa || 'در حال پردازش'}</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{statusFa || 'لغو شده'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span>{statusFa || 'پرداخت شده'}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>تاریخچه سفارش‌های من</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            مجموعاً {toPersianDigits(userOrders.length)} سفارش در حساب کاربری شما ثبت گردیده است.
          </p>
        </div>

        <div className="w-full sm:w-auto relative min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="جستجوی شماره سفارش یا نام کالا..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          همه سفارش‌ها ({toPersianDigits(userOrders.length)})
        </button>
        <button
          onClick={() => setActiveFilter('in_progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'in_progress'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          جاری و در حال پردازش (
          {toPersianDigits(
            userOrders.filter(o => ['pending_payment', 'paid', 'processing', 'ready_to_ship', 'shipped', 'in_transit'].includes(o.status)).length
          )}
          )
        </button>
        <button
          onClick={() => setActiveFilter('delivered')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'delivered'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          تحویل داده شده ({toPersianDigits(userOrders.filter(o => o.status === 'delivered').length)})
        </button>
        <button
          onClick={() => setActiveFilter('cancelled')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'cancelled'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          لغو شده ({toPersianDigits(userOrders.filter(o => o.status === 'cancelled').length)})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center shadow-xs">
          <ShoppingBag className="w-14 h-14 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            سفارشی با این مشخصات یافت نشد
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            {searchTerm ? 'عبارت جستجوی دیگری را امتحان فرمایید.' : 'هنوز سفارشی در این وضعیت ثبت نشده است.'}
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            مشاهده فروشگاه نکسورا
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Top Header of Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {order.orderNumber}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{order.date}</span>
                </div>
                <div>{getStatusBadge(order.status, order.statusFa)}</div>
              </div>

              {/* Items Preview */}
              <div className="py-4 flex flex-wrap items-center gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 max-w-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded-lg bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {toPersianDigits(item.quantity)} عدد • {formatToman(item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer with Amount & Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span>مبلغ کل فاکتور:</span>
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    {formatToman(order.finalAmount)}
                  </span>
                  {order.trackingCode && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mr-3 border-r border-slate-200 dark:border-slate-700 pr-3">
                      کد پیگیری: {order.trackingCode}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectOrder(order.id)}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <span>مشاهده جزئیات و رهگیری</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
