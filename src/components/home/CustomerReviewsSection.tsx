import React from 'react';
import { CUSTOMER_REVIEWS } from '../../data/reviews';
import { toPersianDigits } from '../../utils/persian';
import { Star, CheckCircle2 } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            دیدگاه خریداران نکسورا
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            تجربه واقعی مشتریان پس از خرید، تست و استفاده از لپ‌تاپ‌ها
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.slice(0, 3).map(rev => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between text-right"
            >
              <div>
                {/* User & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                      {rev.userName[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {rev.userName}
                      </h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Purchased product */}
                <div className="mb-3 px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">خریدار: {rev.productName}</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Verified buyer and pros */}
              {rev.pros && rev.pros[0] && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  + {rev.pros[0]}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
