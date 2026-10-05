import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Scale, ArrowLeft, Trash2 } from 'lucide-react';
import { toPersianDigits } from '../../utils/persian';

export const AccountCompare: React.FC = () => {
  const { compareList, products, removeFromCompare, clearCompare, navigateTo } = useStore();

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>میز مقایسه تخصصی محصولات</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            محصولات انتخاب شده جهت سنجش مشخصات فنی ({toPersianDigits(comparedProducts.length)} از حداکثر ۴ محصول).
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-3 py-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>پاکسازی لیست</span>
            </button>
            <button
              onClick={() => navigateTo('compare')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>مشاهده جدول کامل مقایسه</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            هیچ محصولی در میز مقایسه وجود ندارد
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
            در صفحه هر لپ‌تاپ، با کلیک روی گزینه "مقایسه"، ویژگی‌های فنی مدل‌ها را کنار هم مقایسه کنید.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('compare')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>ورود به میز مقایسه و انتخاب لپ‌تاپ‌ها</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              مشاهده فروشگاه
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comparedProducts.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-3 left-3 z-20 p-2 bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-full shadow-xs transition-colors"
                title="حذف از مقایسه"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
