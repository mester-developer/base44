import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, Percent, Clock } from 'lucide-react';

export const PromoBannerSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
          
          {/* Content */}
          <div className="relative z-10 text-right max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-3 backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>جشنواره فروش پاییزی نکسورا</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              تا ۱۵٪ تخفیف روی لپ‌تاپ‌های منتخب
            </h3>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              فرصت محدود برای خرید لپ‌تاپ‌های گیمینگ، مهندسی و اداری با قیمت ویژه، ارسال اکسپرس رایگان و گارانتی طلایی تعویض.
            </p>
          </div>

          {/* Action Button & Thumbnail */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => navigateTo('discounts')}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>مشاهده تخفیف‌ها</span>
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
