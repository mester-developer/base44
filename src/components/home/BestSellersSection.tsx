import React, { useState } from 'react';
import { ProductCard } from '../common/ProductCard';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, Flame } from 'lucide-react';

export const BestSellersSection: React.FC = () => {
  const { navigateTo, products } = useStore();
  const [activeBrand, setActiveBrand] = useState<string>('all');

  const brandPills = [
    { id: 'all', label: 'همه' },
    { id: 'ASUS', label: 'ایسوس (ASUS)' },
    { id: 'Apple', label: 'اپل (Apple)' },
    { id: 'Lenovo', label: 'لنوو (Lenovo)' },
    { id: 'Dell', label: 'دل (Dell)' }
  ];

  const bestSellers = products.filter(p => p.bestSeller || p.reviewCount > 10);
  const filtered = activeBrand === 'all'
    ? bestSellers.slice(0, 8)
    : bestSellers.filter(p => p.brand === activeBrand).slice(0, 8);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>پرفروش‌ترین‌های این هفته</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              پرفروش‌ترین‌ها
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              مدل‌های پرتقاضا با بیشترین رضایت و امتیاز کاربران نکسورا
            </p>
          </div>

          {/* Brand Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {brandPills.map(b => (
              <button
                key={b.id}
                onClick={() => setActiveBrand(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeBrand === b.id
                    ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold rounded-xl text-xs shadow-2xs transition-colors"
          >
            <span>مشاهده لیست کامل محصولات در فروشگاه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
