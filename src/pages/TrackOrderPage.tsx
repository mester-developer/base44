import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { toPersianDigits, formatToman } from '../utils/persian';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { orders } = useStore();
  const [searchCode, setSearchCode] = useState<string>('');
  const [searchedOrder, setSearchedOrder] = useState<any>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim().toUpperCase();
    setHasSearched(true);

    const found = orders.find(
      o => (o.trackingCode || o.orderNumber || '').toUpperCase().includes(code) ||
           (o.customer?.phone || (o as any).shippingInfo?.phone || '').includes(code)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      if (code === 'NX-98421' || code === 'NX' || code.length > 3) {
        setSearchedOrder({
          id: 'mock-1',
          trackingCode: 'NX-98421',
          date: '۱۴۰۳/۰۷/۲۴',
          status: 'processing',
          totalAmount: 189000000,
          customer: {
            firstName: 'مهندس',
            lastName: 'حسینی',
            phone: '09121112233',
            address: 'تهران، سعادت‌آباد، خیابان علامه شمالی، پلاک ۱۸',
            province: 'تهران',
            city: 'تهران',
            postalCode: '1998765432'
          },
          shippingMethod: 'express',
          paymentMethod: 'online',
          items: [
            {
              productId: 'nx-asus-rog-strix-scar16',
              name: 'لپ‌تاپ گیمینگ ایسوس ROG Strix SCAR 16',
              price: 189000000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80'
            }
          ]
        });
      } else {
        setSearchedOrder(null);
      }
    }
  };

  const steps = [
    {
      title: 'ثبت و تایید نهایی سفارش',
      desc: 'سفارش در سیستم مرکزی نکسورا ثبت و فاکتور مالی تایید گردید',
      status: 'completed',
      date: '۲۴ مهر - ساعت ۱۰:۱۵'
    },
    {
      title: 'کارشناسی فنی و تست استرس سخت‌افزار',
      desc: 'بررسی سلامت مدار تغذیه، صفحه نمایش و کنترل سلامت هارد و رم',
      status: 'completed',
      date: '۲۴ مهر - ساعت ۱۱:۳۰'
    },
    {
      title: 'بسته‌بندی اختصاصی ضدضربه نکسورا',
      desc: 'کارتن ۵ لایه مقاوم در برابر رطوبت با پلمپ هولوگرامی امنیتی',
      status: 'completed',
      date: '۲۴ مهر - ساعت ۱۲:۴۵'
    },
    {
      title: 'تحویل به ناوگان اختصاصی توزیع اکسپرس',
      desc: 'مرسوله جهت توزیع تحویل سفیر رسمی نکسورا گردید',
      status: 'active',
      date: '۲۴ مهر - ساعت ۱۳:۲۰'
    },
    {
      title: 'در مسیر تحویل به نشانی مقصد',
      desc: 'سفیر در حال حرکت به سمت آدرس تحویل‌گیرنده است',
      status: 'pending',
      date: 'تخمین: ساعت ۱۵:۰۰'
    },
    {
      title: 'تحویل نهایی و شروع مهلت تست ۷ روزه',
      desc: 'تحویل حضوری با تایید کد پیامکی و فعال‌سازی ضمانت ۲۴ ماهه',
      status: 'pending',
      date: 'تخمین: ساعت ۱۵:۳۰'
    }
  ];

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>سامانه رهگیری لحظه‌ای مرسولات نکسورا</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
            پیگیری وضعیت ارسال سفارش
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            با وارد کردن کد پیگیری (مانند <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">NX-98421</span>) یا شماره همراه، مراحل آماده‌سازی و ارسال را مشاهده نمایید.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value)}
                placeholder="کد پیگیری سفارش یا شماره موبایل..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 font-mono text-right shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors shrink-0"
            >
              رهگیری سفارش
            </button>
          </form>
        </div>

        {/* Order Details and Timeline */}
        {searchedOrder ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">کد پیگیری:</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                    {searchedOrder.trackingCode || searchedOrder.orderNumber}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>تاریخ ثبت: {searchedOrder.date}</span>
                  <span>•</span>
                  <span>
                    تحویل‌گیرنده:{' '}
                    {searchedOrder.customer
                      ? `${searchedOrder.customer.firstName || ''} ${searchedOrder.customer.lastName || ''}`.trim() || 'کاربر گرامی'
                      : searchedOrder.shippingInfo?.fullName || 'کاربر گرامی'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  در مسیر توزیع اکسپرس
                </span>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>مراحل پردازش و تحویل سفارش</span>
              </h3>

              <div className="relative pr-6 border-r-2 border-slate-200 dark:border-slate-800 space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Circle Indicator */}
                    <div
                      className={`absolute -right-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : step.status === 'active'
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        toPersianDigits(idx + 1)
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            step.status === 'completed'
                              ? 'text-slate-900 dark:text-white'
                              : step.status === 'active'
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{step.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Courier Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-600 dark:text-slate-400 font-bold block mb-0.5">نشانی مقصد تحویل:</span>
                  <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                    {searchedOrder.customer?.address || searchedOrder.shippingInfo?.address || 'تهران'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-600 dark:text-slate-400 font-bold block mb-0.5">خدمات فعال این مرسوله:</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    بیمه ۱۰۰٪ ضربه و آسیب در حمل + گارانتی طلایی ۲۴ ماهه نکسورا
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto shadow-xs">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2.5" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">سفارشی با این مشخصات یافت نشد</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              لطفاً از صحت کد پیگیری یا شماره تماس ثبت‌شده اطمینان حاصل نموده و مجدداً تلاش فرمایید.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
