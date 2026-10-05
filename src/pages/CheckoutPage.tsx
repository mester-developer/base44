import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import { LazyImage } from '../components/common/LazyImage';
import {
  Truck,
  CreditCard,
  Building,
  MapPin,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, navigateTo, showToast } = useStore();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'tipax' | 'post'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'card' | 'cod'>('online');
  const [orderNotes, setOrderNotes] = useState('');
  const [upgradeRequest, setUpgradeRequest] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigateTo('cart');
    }
  }, [cart.length, navigateTo]);

  if (cart.length === 0) {
    return null;
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showToast('اطلاعات ناقص است', 'لطفاً تمامی فیلدهای الزامی ستاره‌دار را تکمیل فرمایید.', 'warning');
      return;
    }

    if (phone.length < 10) {
      showToast('شماره تماس نامعتبر', 'لطفاً یک شماره همراه معتبر وارد فرمایید.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const fullAddress = `${province}، شهر ${city}، ${address} (کد پستی: ${postalCode || '---'})`;
      const order = placeOrder({
        fullName,
        phone,
        address: fullAddress,
        paymentMethod: paymentMethod === 'online' ? 'درگاه پرداخت اینترنتی شاپرک' : paymentMethod === 'card' ? 'کارت به کارت' : 'پرداخت در محل',
        shippingMethod: shippingMethod === 'express' ? 'پیک اکسپرس نکسورا' : shippingMethod === 'tipax' ? 'تیپاکس فوری بیمه‌دار' : 'پست پیشتاز',
        notes: orderNotes + (upgradeRequest ? ' | کاربر درخواست تماس کارشناس جهت ارتقاء RAM یا SSD دارد.' : '')
      });

      setIsSubmitting(false);
      navigateTo('order-success', order.id);
    }, 800);
  };

  const provinces = [
    'تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'البرز', 'خوزستان',
    'مازندران', 'گیلان', 'کرمان', 'یزد', 'قم', 'مرکزی', 'هرمزگان'
  ];

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-6">
          <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">
            <span>سبد خرید</span> / <span className="text-slate-700 dark:text-slate-300 font-semibold">تکمیل اطلاعات و پرداخت</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            نهایی‌سازی سفارش و ثبت آدرس
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Checkout Steps - 8 Cols */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Step 1: Receiver Details */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                  ۱
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  اطلاعات گیرنده و نشانی تحویل
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="مثلاً: علی رضایی"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    شماره تلفن همراه <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 font-mono text-left transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">استان:</label>
                  <select
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
                  >
                    {provinces.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">شهر:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="نام شهر"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    نشانی دقیق پستی (پلاک و واحد) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="خیابان، کوچه، پلاک، طبقه و زنگ واحد..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    placeholder="۱۲۳۴۵۶۷۸۹۰"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 font-mono text-left"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                  ۲
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  شیوه ارسال کالا
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <label
                  className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mt-0.5 text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                        ارسال اکسپرس نکسورا (تهران ۲ ساعته / سایر شهرها ۲۴ ساعته)
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                        بسته‌بندی ۵ لایه ضد ضربه، پلمپ رسمی و بیمه ۱۰۰٪ ارزش دستگاه
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold shrink-0">رایگان</span>
                </label>

                <label
                  className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'tipax'
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'tipax'}
                      onChange={() => setShippingMethod('tipax')}
                      className="mt-0.5 text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                        تیپاکس هوایی پیشتاز (سراسر کشور)
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">تحویل درب منزل با پیامک رهگیری لحظه‌ای بارنامه</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold shrink-0">رایگان</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                  ۳
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  شیوه پرداخت
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">پرداخت اینترنتی امن شاپرک</div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">اتصال به درگاه بانکی با تمامی کارت‌های عضو شتاب</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">کارت به کارت / حواله پایا و ساتنا</div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">واریز به شماره شبای حساب رسمی فروشگاه نکسورا</p>
                    </div>
                  </div>
                  <Building className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </label>
              </div>

              {/* Upgrades */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer mb-2.5">
                  <input
                    type="checkbox"
                    checked={upgradeRequest}
                    onChange={e => setUpgradeRequest(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    درخواست تماس کارشناس جهت ارتقاء RAM یا SSD قبل از ارسال
                  </span>
                </label>

                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="توضیحات تکمیلی یا یادداشت اختصاصی برای ارسال کالا..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800"
                />
              </div>
            </div>

          </div>

          {/* Side Summary & Order Button - 4 Cols */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs sticky top-20">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              اقلام سفارش ({toPersianDigits(cart.length)} قلم)
            </h3>

            <div className="space-y-2.5 max-h-56 overflow-y-auto mb-4 pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-2.5 text-xs">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-750 shrink-0 overflow-hidden flex items-center justify-center">
                    <LazyImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                      wrapperClassName="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 dark:text-white truncate text-[11px]">{item.product.name}</h5>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      {toPersianDigits(item.quantity)} عدد × {formatToman(item.product.discountPrice || item.product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs mb-5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>هزینه ارسال و بسته‌بندی:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">رایگان</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>گارانتی:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">۲۴ ماهه طلایی نکسورا</span>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>مبلغ نهایی سفارش:</span>
                <span className="text-blue-600 dark:text-blue-400 font-black text-base font-mono">{formatToman(cartTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              {isSubmitting ? (
                <span>در حال انتقال به درگاه بانکی...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>تایید و پرداخت اینترنتی</span>
                </>
              )}
            </button>

            <div className="mt-3 text-center">
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                اتصال مستقیم به درگاه امن بانکی تحت نظارت بانک مرکزی (شاپرک)
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
