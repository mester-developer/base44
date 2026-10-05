import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { toPersianDigits } from '../utils/persian';
import { Percent, Clock } from 'lucide-react';

export const DiscountsPage: React.FC = () => {
  const { products } = useStore();
  const discountedProducts = products.filter(
    p => p.discountPercent && p.discountPercent > 0
  );

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 text-white shadow-sm mb-8 border border-transparent dark:border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 dark:bg-white/15 text-blue-100 text-xs font-bold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>جشنواره تخفیف‌های نکسورا</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">
              تخفیف‌های ویژه روی انواع لپ‌تاپ
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 dark:text-blue-200/90 leading-relaxed">
              فرصت خرید لپ‌تاپ‌های گیمینگ، مهندسی و اداری با قیمت ویژه، ارسال اکسپرس رایگان و مهلت تست ۷ روزه.
            </p>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>لپ‌تاپ‌های دارای تخفیف</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {toPersianDigits(discountedProducts.length)} کالا
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
