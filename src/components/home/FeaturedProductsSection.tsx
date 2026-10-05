import React from 'react';
import { ProductCard } from '../common/ProductCard';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, Sparkles } from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const { navigateTo, products } = useStore();

  // Pick top 4 featured products
  const featured = products.filter(p => p.featured || p.rating >= 4.8).slice(0, 4);

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>پیشنهادهای ویژه نکسورا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              محبوب‌ترین لپ‌تاپ‌ها
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              انتخاب‌هایی که بیشترین رضایت خریداران و متخصصین را جلب کرده‌اند
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
