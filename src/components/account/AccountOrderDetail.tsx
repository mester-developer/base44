import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatToman, toPersianDigits } from '../../utils/persian';
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AccountOrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export const AccountOrderDetail: React.FC<AccountOrderDetailProps> = ({ orderId, onBack }) => {
  const { user, isAdmin } = useAuth();
  const { orders } = useStore();

  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId);

  if (!order) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-10 text-center shadow-xs">
        <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">سفارش یافت نشد</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          شماره سفارش مورد نظر در سوابق سیستم وجود ندارد.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          بازگشت به لیست سفارش‌ها
        </button>
      </div>
    );
  }

  // Security Check: User must only view their own order unless Admin!
  const isOwner =
    (user?.id && order.customer.userId === user.id) ||
    order.customer.phone === user?.phone;

  if (!isOwner && !isAdmin) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 rounded-2xl p-10 text-center shadow-xs">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">عدم دسترسی به سفارش</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          این سفارش به حساب کاربری دیگری تعلق دارد و شما مجاز به مشاهده آن نیستید.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition-colors"
        >
          بازگشت به سفارش‌های من
        </button>
      </div>
    );
  }

  // Timeline Step Calculations
  // Steps: 1. ثبت سفارش -> 2. پرداخت -> 3. پردازش -> 4. آماده ارسال -> 5. ارسال -> 6. تحویل
  const TIMELINE_STEPS = [
    { key: 'registered', label: 'ثبت سفارش' },
    { key: 'paid', label: 'تأیید پرداخت' },
    { key: 'processing', label: 'پردازش در انبار' },
    { key: 'ready_to_ship', label: 'آماده ارسال' },
    { key: 'shipped', label: 'تحویل به پست/پیک' },
    { key: 'delivered', label: 'تحویل داده شده' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return 0;
      case 'paid':
        return 1;
      case 'processing':
        return 2;
      case 'ready_to_ship':
        return 3;
      case 'shipped':
      case 'in_transit':
        return 4;
      case 'delivered':
        return 5;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  };

  const currentStepIndex = getStepIndex(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="space-y-6">
      {/* Back Navigation & Status Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            title="بازگشت"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900 dark:text-white font-mono">
                سفارش {order.orderNumber}
              </h2>
              {isCancelled ? (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                  لغو شده
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800">
                  {order.statusFa}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ثبت شده در: {order.date}</p>
          </div>
        </div>

        {order.trackingCode && (
          <div className="text-left bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-sans">کد رهگیری پستی / بارنامه:</span>
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-white select-all">
              {order.trackingCode}
            </span>
          </div>
        )}
      </div>

      {/* Visual Timeline Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>مراحل پردازش و پیشرفت سفارش</span>
        </h3>

        {isCancelled ? (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>این سفارش به درخواست مشتری یا عدم تأیید پرداخت لغو گردیده است.</span>
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-4 right-5 left-5 h-1 bg-slate-100 dark:bg-slate-800 -z-0 hidden md:block" />
            <div
              className="absolute top-4 right-5 h-1 bg-blue-600 transition-all duration-500 -z-0 hidden md:block"
              style={{
                width: `${Math.min(100, Math.max(0, (currentStepIndex / (TIMELINE_STEPS.length - 1)) * 100))}%`
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
              {TIMELINE_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors mb-2 ${
                        isPassed
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                      } ${isCurrent ? 'ring-4 ring-blue-100 dark:ring-blue-900/50' : ''}`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : toPersianDigits(idx + 1)}
                    </div>
                    <span
                      className={`text-xs ${
                        isCurrent
                          ? 'font-black text-blue-600 dark:text-blue-400'
                          : isPassed
                          ? 'font-bold text-slate-800 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Products in this Order */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>کالاهای خریداری‌شده در این سفارش ({toPersianDigits(order.items.length)} مورد)</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3 font-mono">
                    <span>تعداد: {toPersianDigits(item.quantity)} عدد</span>
                    <span>•</span>
                    <span>فی واحد: {formatToman(item.price)}</span>
                  </div>
                </div>
              </div>

              <div className="text-left font-mono font-black text-xs sm:text-sm text-slate-900 dark:text-white shrink-0">
                {formatToman(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Shipping Information & Financial Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping & Recipient Information */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>مشخصات تحویل و گیرنده</span>
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">نام و نام خانوادگی گیرنده:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {order.customer.firstName} {order.customer.lastName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">شماره تلفن تماس:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {order.customer.phone}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">روش ارسال:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {order.shippingMethod === 'express' ? 'ارسال سریع اکسپرس نکسورا' : 'پست پیشتاز سراسری'}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 block mb-1">نشانی دقیق پستی:</span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {order.customer.address}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>جزئیات پرداخت و فاکتور مالی</span>
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">جمع مبلغ اقلام:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {formatToman(order.totalAmount)}
              </span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between text-rose-600 dark:text-rose-400 font-medium">
                <span>تخفیف اعمال شده:</span>
                <span className="font-mono font-bold">
                  {formatToman(order.discountAmount)}-
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">هزینه بسته‌بندی و ارسال:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {order.shippingFee === 0 ? 'رایگان (طرح ویژه نکسورا)' : formatToman(order.shippingFee)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400 dark:text-slate-500">نحوه پرداخت:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {order.paymentMethod === 'online' ? 'درگاه پرداخت شاپرک (موفق)' : 'پرداخت در محل'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
              <span>مبلغ نهایی پرداختی:</span>
              <span className="font-mono text-base text-blue-600 dark:text-blue-400">
                {formatToman(order.finalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
