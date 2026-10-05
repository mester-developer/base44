import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ChevronLeft,
  Calendar
} from 'lucide-react';

interface OrderSuccessPageProps {
  orderId?: string;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderId }) => {
  const { orders, navigateTo } = useStore();

  const currentOrder = orders.find(o => o.id === orderId || o.orderNumber === orderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[70vh] flex items-center justify-center text-right transition-colors">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-md shadow-xs">
          <Package className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">سفارشی یافت نشد</h2>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const customerName = currentOrder.customer
    ? `${currentOrder.customer.firstName || ''} ${currentOrder.customer.lastName || ''}`.trim() || 'مشتری گرامی'
    : (currentOrder as any).shippingInfo?.fullName || 'مشتری گرامی';

  const customerPhone = currentOrder.customer?.phone || (currentOrder as any).shippingInfo?.phone || '---';
  const customerAddress = currentOrder.customer?.address || (currentOrder as any).shippingInfo?.address || '---';
  const paymentMethodLabel = currentOrder.paymentMethod === 'online' ? 'درگاه پرداخت الکترونیکی شاپرک (موفق)' : 'پرداخت در محل / کارت به کارت';
  const shippingMethodLabel = currentOrder.shippingMethod === 'express' ? 'پیک اکسپرس نکسورا (تحویل فوری)' : 'پست پیشتاز سراسری';
  const orderItems = currentOrder.items || [];
  const displayTotal = currentOrder.finalAmount || currentOrder.totalAmount;

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-right min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card Header */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs mb-2.5 inline-block">
            پرداخت با موفقیت انجام شد
          </span>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            سفارش شما با موفقیت در نکسورا ثبت و تایید گردید
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6">
            سفارش شما وارد مرحله تست سلامت و بسته‌بندی ضدضربه شد. پیامک تایید حاوی کد پیگیری به شماره همراه ارسال گردید.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400">شماره سفارش:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                {currentOrder.trackingCode || currentOrder.orderNumber}
              </span>
            </div>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="text-slate-600 dark:text-slate-300 font-mono">{currentOrder.date}</span>
            </div>
          </div>
        </div>

        {/* Order Invoice Details */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>اقلام خریداری شده</span>
            </h3>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 print:hidden"
            >
              <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>چاپ فاکتور رسمی</span>
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3 mb-6">
            {orderItems.map((item, idx) => {
              const itemImg = item.image || (item as any).product?.images?.[0] || '';
              const itemName = item.name || (item as any).product?.name || 'لپ‌تاپ';
              const itemPrice = item.price || (item as any).product?.price || 0;
              const itemQty = item.quantity || 1;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750"
                >
                  <div className="flex items-center gap-3">
                    {itemImg ? (
                      <img
                        src={itemImg}
                        alt={itemName}
                        className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 object-contain p-1 border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{itemName}</h4>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        گارانتی ۲۴ ماهه طلایی فعال شد
                      </span>
                    </div>
                  </div>

                  <div className="text-left font-mono shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {formatToman(itemPrice * itemQty)}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {toPersianDigits(itemQty)} عدد
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery and Customer Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2">اطلاعات تحویل‌گیرنده:</h5>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <p><span className="text-slate-400 dark:text-slate-500">نام:</span> {customerName}</p>
                <p><span className="text-slate-400 dark:text-slate-500">تلفن:</span> <span className="font-mono">{customerPhone}</span></p>
                <p><span className="text-slate-400 dark:text-slate-500">آدرس:</span> {customerAddress}</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2">روش پرداخت و تحویل:</h5>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <p><span className="text-slate-400 dark:text-slate-500">پرداخت:</span> {paymentMethodLabel}</p>
                <p><span className="text-slate-400 dark:text-slate-500">ارسال:</span> {shippingMethodLabel}</p>
                <p><span className="text-slate-400 dark:text-slate-500">وضعیت مالی:</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">تسویه کامل تایید شد</span></p>
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            <span>مبلغ کل پرداخت شده:</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono text-lg sm:text-xl font-black">{formatToman(displayTotal)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
          <button
            onClick={() => navigateTo('tracking')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Truck className="w-4 h-4" />
            <span>رهگیری لحظه‌ای وضعیت سفارش</span>
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>بازگشت به فروشگاه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
