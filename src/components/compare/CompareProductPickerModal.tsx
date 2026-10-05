import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LaptopProduct } from '../../types';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { LazyImage } from '../common/LazyImage';
import {
  Search,
  X,
  Plus,
  Check,
  Cpu,
  Zap,
  HardDrive,
  Tv,
  Filter
} from 'lucide-react';

interface CompareProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  slotIndex: number;
  currentComparedIds: string[];
  products: LaptopProduct[];
}

const BRANDS = ['همه', 'ASUS', 'Lenovo', 'Apple', 'HP', 'Dell', 'Acer', 'MSI'];

const CATEGORIES = [
  { id: 'all', name: 'همه دسته‌ها' },
  { id: 'gaming', name: 'گیمینگ' },
  { id: 'engineering', name: 'مهندسی' },
  { id: 'programming', name: 'برنامه‌نویسی' },
  { id: 'student', name: 'دانشجویی' },
  { id: 'business', name: 'اداری و بیزینس' },
  { id: 'budget', name: 'اقتصادی' }
];

export const CompareProductPickerModal: React.FC<CompareProductPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  slotIndex,
  currentComparedIds,
  products
}) => {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('همه');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const slotTitle = slotIndex === 0 ? 'لپ‌تاپ اول' : slotIndex === 1 ? 'لپ‌تاپ دوم' : `لپ‌تاپ شماره ${toPersianDigits(slotIndex + 1)}`;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search filter
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchEn = p.englishName.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCpu = (p.specs?.cpu || '').toLowerCase().includes(query);
        const matchGpu = (p.specs?.gpu || '').toLowerCase().includes(query);
        if (!matchName && !matchEn && !matchBrand && !matchCpu && !matchGpu) return false;
      }

      // Brand filter
      if (selectedBrand !== 'همه' && p.brand.toUpperCase() !== selectedBrand.toUpperCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [products, search, selectedBrand, selectedCategory]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs text-right" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 flex items-center justify-between gap-3 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  انتخاب {slotTitle} جهت مقایسه
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                از میان لپ‌تاپ‌های زیر، مدل مد نظرتان را جستجو کرده و انتخاب کنید.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="جستجوی لپ‌تاپ با نام، پردازنده، گرافیک یا برند (مثلاً: Legion, ROG, M3, i7)..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-10 pl-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3.5 top-3" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium shrink-0 ml-1">برند:</span>
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all shrink-0 ${
                    selectedBrand === brand
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium shrink-0 ml-1">کاربری:</span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid / List */}
          <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <Filter className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  هیچ لپ‌تاپی با این مشخصات یافت نشد
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  عبارت جستجو یا فیلتر برند/دسته‌بندی را تغییر دهید.
                </p>
              </div>
            ) : (
              filteredProducts.map(product => {
                const isCurrentInSlot = currentComparedIds[slotIndex] === product.id;
                const isAlreadyComparedElsewhere = currentComparedIds.includes(product.id) && !isCurrentInSlot;

                return (
                  <div
                    key={product.id}
                    className={`py-3.5 px-2.5 sm:px-3.5 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                      isCurrentInSlot
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {/* Left: Image & Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <LazyImage
                          src={product.images[0]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          wrapperClassName="w-full h-full"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-[10px]">
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                            {product.categoryFa}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mb-0.5">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate mb-2">
                          {product.englishName}
                        </p>

                        {/* Quick Specs Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            <Cpu className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span>{(product.specs?.cpu || '').split('(')[0] || 'CPU'}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            <Zap className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            <span>{(product.specs?.gpu || '').split('(')[0] || 'GPU'}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            <HardDrive className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{product.specs?.ram}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            <Tv className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span>{product.specs?.refreshRate || product.specs?.display}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Selection Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      <div className="text-right">
                        <div className="font-mono font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                          {formatToman(product.discountPrice || product.price)}
                        </div>
                        {product.discountPrice && (
                          <div className="font-mono text-[10px] text-slate-400 dark:text-slate-500 line-through">
                            {formatToman(product.price)}
                          </div>
                        )}
                      </div>

                      {isCurrentInSlot ? (
                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>انتخاب شده در این جایگاه</span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            onSelectProduct(product.id);
                            onClose();
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
                            isAlreadyComparedElsewhere
                              ? 'bg-amber-500 hover:bg-amber-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isAlreadyComparedElsewhere ? 'جابجایی به این جایگاه' : 'انتخاب برای مقایسه'}</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-500 dark:text-slate-400 font-mono">
              تعداد لپ‌تاپ‌های در دسترس: {toPersianDigits(filteredProducts.length)}
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
            >
              انصراف و بستن
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
