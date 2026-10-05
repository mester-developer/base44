import React, { useState, useEffect } from 'react';
import { ProductCard } from '../common/ProductCard';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits } from '../../utils/persian';
import { Flame, Clock, ChevronLeft } from 'lucide-react';

export const SpecialOffersSection: React.FC = () => {
  const { navigateTo, products } = useStore();

  // 14 hours countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialOfferProducts = products.filter(p => p.specialOffer || (p.discountPercent && p.discountPercent > 10)).slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 border-t border-slate-900 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header with Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-xs font-bold mb-3">
              <Flame className="w-4 h-4 fill-current" />
              <span>پیشنهاد شگفت‌انگیز محدود نکسورا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              تخفیف‌های استثنایی با تحویل فوری
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              فرصت محدود برای خرید لپ‌تاپ‌های گیمینگ و مهندسی با قیمت وارداتی ویژه
            </p>
          </div>

          {/* Countdown timer widget */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>زمان باقی‌مانده:</span>
            </div>

            <div className="flex items-center gap-2 font-mono" dir="ltr">
              <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[48px]">
                <span className="text-lg font-black text-amber-400 block">
                  {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
                </span>
                <span className="text-[9px] text-slate-500">ساعت</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[48px]">
                <span className="text-lg font-black text-amber-400 block">
                  {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
                </span>
                <span className="text-[9px] text-slate-500">دقیقه</span>
              </div>
              <span className="text-amber-400 font-bold">:</span>
              <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[48px]">
                <span className="text-lg font-black text-amber-400 block">
                  {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
                </span>
                <span className="text-[9px] text-slate-500">ثانیه</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialOfferProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('discounts')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
          >
            <span>مشاهده همه محصولات تخفیف‌دار نکسورا</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
