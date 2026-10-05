import React from 'react';
import { BRANDS_DATA } from '../data/brands';
import { useStore } from '../context/StoreContext';
import { toPersianDigits } from '../utils/persian';
import { LazyImage } from '../components/common/LazyImage';
import { ChevronLeft, Globe } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-8 bg-slate-50 text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
            برندهای معتبر جهانی در نکسورا
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            عرضه مستقیم جدیدترین لپ‌تاپ‌های دنیا با تضمین اصالت ۱۰۰٪، گارانتی ۲۴ ماهه طلایی و خدمات پس از فروش
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BRANDS_DATA.map(brand => (
            <div
              key={brand.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden">
                      <LazyImage
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain"
                        wrapperClassName="w-full h-full"
                        fallbackIconType="image"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{brand.nameFa}</h3>
                      <span className="text-xs text-slate-400 font-mono">{brand.name}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold">
                    {toPersianDigits(brand.productCount)} مدل
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {brand.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>کشور مبدأ: {brand.country}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">گارانتی رسمی ۲۴ ماهه</span>
                <button
                  onClick={() => navigateTo('shop', brand.name)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>مشاهده محصولات {brand.nameFa}</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
