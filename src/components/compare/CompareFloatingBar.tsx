import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../context/StoreContext';
import { Scale, ArrowLeft, X, Trash2 } from 'lucide-react';
import { toPersianDigits } from '../../utils/persian';
import { LazyImage } from '../common/LazyImage';

export const CompareFloatingBar: React.FC = () => {
  const { compareList, products, currentRoute, navigateTo, removeFromCompare, clearCompare } = useStore();

  // Don't show on compare page or if empty
  if (compareList.length === 0 || currentRoute === 'compare' || currentRoute === 'admin') {
    return null;
  }

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-lg w-full bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-slate-700/80 text-right"
        dir="rtl"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Info & Thumbnails */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Scale className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span>میز مقایسه</span>
                <span className="bg-blue-500/30 text-blue-300 font-mono text-[11px] px-2 py-0.5 rounded-full">
                  {toPersianDigits(comparedProducts.length)} از ۴
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {comparedProducts.length === 1 ? 'یک لپ‌تاپ دیگر برای مقایسه اضافه کنید' : 'لپ‌تاپ‌ها آماده مقایسه هستند'}
              </p>
            </div>
          </div>

          {/* Right: Thumbs + Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Small Thumbnails with remove button */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              {comparedProducts.map(p => (
                <div key={p.id} className="relative group/thumb">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 p-0.5 border border-slate-700 overflow-hidden flex items-center justify-center">
                    <LazyImage
                      src={p.images[0]}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                      wrapperClassName="w-full h-full"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                    title="حذف"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCompare}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
              title="پاک‌سازی"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('compare')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>مشاهده میز مقایسه</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
