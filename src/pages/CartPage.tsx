import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import { LazyImage } from '../components/common/LazyImage';
import {
  Trash2,
  ShoppingCart,
  ChevronLeft,
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    navigateTo,
    showToast
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'NEXORA' || code === 'NEXORA2024') {
      const extraDiscount = Math.round(cartTotal * 0.05);
      setCouponDiscount(extraDiscount);
      setCouponApplied(true);
      showToast('کد تخفیف اعمال شد', 'کد تخفیف ۵ درصدی با موفقیت محاسبه گردید.', 'success');
    } else {
      showToast('کد تخفیف نامعتبر', 'کد وارد شده معتبر نمی‌باشد (کد آزمایشی: NEXORA)', 'warning');
    }
  };

  const finalOrderAmount = Math.max(cartTotal - couponDiscount, 0);

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-[75vh] flex items-center justify-center text-right transition-colors">
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">سبد خرید شما خالی است</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            انواع لپ‌تاپ‌های گیمینگ، مهندسی و اداری با گارانتی طلایی در نکسورا موجود است.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors"
          >
            مشاهده و خرید لپ‌تاپ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
              <ShoppingCart className="w-4 h-4" />
              <span>سبد خرید آنلاین</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              سبد خرید ({toPersianDigits(cartCount)} دستگاه)
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>ادامه خرید</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Layout: Items (8 cols) + Invoice Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map(item => {
              const unitPrice = item.product.discountPrice || item.product.price;
              const totalItemPrice = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-2 shrink-0 overflow-hidden flex items-center justify-center">
                      <LazyImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain cursor-pointer"
                        wrapperClassName="w-full h-full"
                        onClick={() => navigateTo('product', item.product.slug)}
                      />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold">
                        {item.product.brand}
                      </span>
                      <h3
                        onClick={() => navigateTo('product', item.product.slug)}
                        className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer mt-1 mb-1 line-clamp-1 transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono line-clamp-1 mb-1.5">
                        {(item.product.specs?.cpu || '').split('(')[0]} | {(item.product.specs?.gpu || '').split('(')[0]}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>گارانتی ۲۴ ماهه طلایی نکسورا</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 gap-3">
                    <div className="text-left">
                      <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                        {formatToman(totalItemPrice)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          هر دستگاه {formatToman(unitPrice)}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Stepper */}
                      <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 font-mono text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-slate-900 dark:text-white">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="حذف از سبد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Invoice Summary Card */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs sticky top-20">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              خلاصه صورت‌حساب
            </h3>

            {/* Price Details */}
            <div className="space-y-2.5 text-xs mb-5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>قیمت کالاها:</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{formatToman(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                  <span>تخفیف ویژه کالاها:</span>
                  <span className="font-mono font-bold">- {formatToman(cartDiscount)}</span>
                </div>
              )}

              {couponApplied && (
                <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
                  <span>کد تخفیف (NEXORA):</span>
                  <span className="font-mono font-bold">- {formatToman(couponDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>هزینه ارسال اکسپرس:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">رایگان</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-blue-600 dark:text-blue-400 font-black text-base font-mono">
                  {formatToman(finalOrderAmount)}
                </span>
              </div>
            </div>

            {/* Coupon Code Box */}
            <div className="mb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="کد تخفیف (NEXORA)"
                  disabled={couponApplied}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white uppercase placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-left font-mono"
                />
                <button
                  type="submit"
                  disabled={couponApplied}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
                >
                  {couponApplied ? 'ثبت شد' : 'اعمال'}
                </button>
              </form>
              {couponApplied && (
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تخفیف ۵٪ اعمال شد.</span>
                </span>
              )}
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <span>ادامه فرآیند خرید</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Reassurance */}
            <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>ارسال اکسپرس و تحویل ۲ ساعته تهران</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
