import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LazyImage } from '../common/LazyImage';
import {
  ChevronLeft,
  Scale,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
  BatteryCharging
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="bg-gradient-to-b from-slate-100/80 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-8 lg:py-16 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content (Right side in Persian RTL) */}
          <div className="lg:col-span-6 flex flex-col items-start text-right">
            {/* Small Label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>فروشگاه تخصصی نکسورا</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.25] tracking-tight mb-4">
              لپ‌تاپ مناسب،
              <br />
              <span className="text-blue-600 dark:text-blue-400">برای کاری که انجام می‌دهید.</span>
            </h1>

            {/* Short Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mb-8">
              از لپ‌تاپ‌های اقتصادی تا قدرتمندترین سیستم‌های حرفه‌ای، انتخابت را هوشمندانه انجام بده. مشاوره تخصصی، ضمانت اصالت ۱۰۰٪ و ارسال سریع به سراسر ایران.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>مشاهده لپ‌تاپ‌ها</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('compare')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <Scale className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>مقایسه لپ‌تاپ‌ها</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>ضمانت اصالت و پلمپ کارخانه</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>ارسال اکسپرس رایگان</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>۷ روز مهلت تست فنی</span>
              </div>
            </div>
          </div>

          {/* Clean Studio Product Showcase (Left side in Persian RTL) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px]">
              
              {/* Product Badge Tag */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  FLAGSHIP 2024
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  گارانتی معتبر نکسورا
                </span>
              </div>

              {/* High-res Studio Image */}
              <div className="relative w-full flex flex-col items-center py-6">
                <LazyImage
                  src="/images/products/macbook-m3-max.jpg"
                  fallbackSrc="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                  alt="MacBook Pro M3 Max"
                  priority={true}
                  className="max-h-[260px] sm:max-h-[300px] object-contain hover:scale-102 transition-transform duration-500 drop-shadow-md rounded-xl"
                  wrapperClassName="w-full flex justify-center"
                />
                {/* Studio Pedestal Shadow */}
                <div className="w-3/4 h-3 bg-slate-300/40 dark:bg-black/50 rounded-full blur-md mt-4" />
              </div>

              {/* Quick Specs Highlight Bar */}
              <div className="grid grid-cols-3 gap-2 w-full mb-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-center">
                  <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">پردازنده</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">M3 Max 16-Core</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-center">
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">گرافیک</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">40-Core GPU</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-center">
                  <BatteryCharging className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">باتری</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">تا ۲۲ ساعت</span>
                </div>
              </div>

              {/* Feature Spec Floating Pill */}
              <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">MacBook Pro M3 Max</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">16-inch Liquid Retina XDR</span>
                </div>
                <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  ۱۴۹,۰۰۰,۰۰۰ تومان
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
