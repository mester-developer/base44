import React from 'react';
import { BRANDS_DATA } from '../../data/brands';
import { useStore } from '../../context/StoreContext';
import { toPersianDigits } from '../../utils/persian';
import { LazyImage } from '../common/LazyImage';
import { ChevronLeft } from 'lucide-react';

export const BrandLogosSection: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              برندهای معتبر جهانی
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              عرضه مستقیم لپ‌تاپ‌های اصل با گارانتی معتبر بین‌المللی
            </p>
          </div>
          <button
            onClick={() => navigateTo('brands')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه برندها</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {BRANDS_DATA.map(brand => (
            <div
              key={brand.id}
              onClick={() => navigateTo('shop')}
              className="group p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[120px] hover:shadow-2xs"
            >
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform p-1.5 shadow-2xs">
                <LazyImage
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain rounded"
                  wrapperClassName="w-full h-full"
                  fallbackIconType="image"
                />
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {brand.name}
              </h4>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                {toPersianDigits(brand.productCount)} مدل
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
