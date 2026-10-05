import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { formatToman, toPersianDigits } from '../../utils/persian';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  X,
  MapPin,
  CreditCard,
  Package,
  User,
  Phone
} from 'lucide-react';

interface AdminOrdersProps {
  initialOrderId?: string;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ initialOrderId }) => {
  const { orders, updateOrderStatus } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Status edit in modal
  const [modalStatus, setModalStatus] = useState<OrderStatus>('paid');
  const [modalTracking, setModalTracking] = useState('');

  // Handle deep-linked order id
  useEffect(() => {
    if (initialOrderId) {
      const found = orders.find(o => o.id === initialOrderId || o.orderNumber === initialOrderId);
      if (found) {
        openOrderModal(found);
      }
    }
  }, [initialOrderId, orders]);

  const openOrderModal = (order: Order) => {
    setActiveOrder(order);
    setModalStatus(order.status);
    setModalTracking(order.trackingCode || '');
  };

  const handleStatusUpdate = () => {
    if (!activeOrder) return;
    updateOrderStatus(activeOrder.id, modalStatus);
    setActiveOrder(prev => (prev ? { ...prev, status: modalStatus, trackingCode: modalTracking } : null));
  };

  const STATUS_LIST: { key: OrderStatus; label: string }[] = [
    { key: 'pending_payment', label: 'در انتظار پرداخت' },
    { key: 'paid', label: 'پرداخت شده' },
    { key: 'processing', label: 'در حال پردازش' },
    { key: 'ready_to_ship', label: 'آماده ارسال' },
    { key: 'shipped', label: 'تحویل به پست' },
    { key: 'in_transit', label: 'در مسیر تحویل' },
    { key: 'delivered', label: 'تحویل داده شده' },
    { key: 'cancelled', label: 'لغو شده' }
  ];

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) {
      return false;
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(term);
      const matchName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(term);
      const matchPhone = order.customer.phone.includes(term);
      const matchItem = order.items.some(i => i.name.toLowerCase().includes(term));
      return matchNum || matchName || matchPhone || matchItem;
    }

    return true;
  });

  const getStatusBadge = (status: string, statusFa: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {statusFa || 'تحویل شده'}
          </span>
        );
      case 'in_transit':
      case 'shipped':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {statusFa || 'در حال ارسال'}
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
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت سفارش‌ها ({toPersianDigits(orders.length)} سفارش)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            بررسی سفارش‌های خریداران، تغییر وضعیت، صدور بارنامه و رهگیری بسته‌ها.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="جستجوی شماره سفارش، نام خریدار یا شماره تلفن..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">وضعیت سفارش:</span>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            {STATUS_LIST.map(st => (
              <option key={st.key} value={st.key}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 pr-4">شماره سفارش</th>
                <th className="py-3.5 px-3">نام مشتری</th>
                <th className="py-3.5 px-3">شماره تماس</th>
                <th className="py-3.5 px-3">تاریخ ثبت</th>
                <th className="py-3.5 px-3">مبلغ نهایی</th>
                <th className="py-3.5 px-3">وضعیت فعلی</th>
                <th className="py-3.5 pl-4 text-left">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-slate-900 dark:text-white">
                    {order.orderNumber}
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {order.customer.firstName} {order.customer.lastName}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-500 dark:text-slate-400">
                    {order.customer.phone}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                    {order.date}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {formatToman(order.finalAmount)}
                  </td>

                  <td className="py-3 px-3">
                    {getStatusBadge(order.status, order.statusFa)}
                  </td>

                  <td className="py-3 pl-4 text-left">
                    <button
                      onClick={() => openOrderModal(order)}
                      className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>مدیریت</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Status Change Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 text-slate-900 dark:text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white font-mono">
                    سفارش {activeOrder.orderNumber}
                  </h3>
                  {getStatusBadge(activeOrder.status, activeOrder.statusFa)}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">تاریخ ثبت: {activeOrder.date}</p>
              </div>

              <button
                onClick={() => setActiveOrder(null)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Change Status Controls Box */}
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/60 mb-5 space-y-3">
              <div className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>تغییر وضعیت سفارش و رهگیری مرسوله:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    وضعیت جدید:
                  </label>
                  <select
                    value={modalStatus}
                    onChange={e => setModalStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 font-medium"
                  >
                    {STATUS_LIST.map(st => (
                      <option key={st.key} value={st.key}>{st.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    کد پیگیری پستی (بارنامه):
                  </label>
                  <input
                    type="text"
                    value={modalTracking}
                    onChange={e => setModalTracking(e.target.value)}
                    placeholder="مثلاً PST-94821803"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 font-mono text-left"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleStatusUpdate}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                ثبت و اعمال تغییر وضعیت سفارش
              </button>
            </div>

            {/* Items in Order */}
            <div className="mb-5 space-y-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">کالاهای سفارش:</div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-950/50 max-h-48 overflow-y-auto">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded bg-white dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-700" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-mono">({toPersianDigits(item.quantity)} عدد)</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatToman(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-5">
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>اطلاعات خریدار:</span>
                </div>
                <div>نام: {activeOrder.customer.firstName} {activeOrder.customer.lastName}</div>
                <div className="font-mono">موبایل: {activeOrder.customer.phone}</div>
                <div>روش ارسال: {activeOrder.shippingMethod === 'express' ? 'اکسپرس' : 'پست پیشتاز'}</div>
              </div>

              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>نشانی پستی:</span>
                </div>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">{activeOrder.customer.address}</p>
                {activeOrder.customer.postalCode && (
                  <div className="font-mono">کد پستی: {activeOrder.customer.postalCode}</div>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400">مبلغ نهایی پرداختی:</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {formatToman(activeOrder.finalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
