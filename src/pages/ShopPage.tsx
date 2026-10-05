import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/Skeleton';
import { useStore } from '../context/StoreContext';
import { toPersianDigits, formatToman } from '../utils/persian';
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Check,
  Sparkles
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { routeParam, navigateTo, products } = useStore();

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGpu, setSelectedGpu] = useState<string>('all');
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [priceMax, setPriceMax] = useState<number>(300000000); // 300 Million Tomans
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'discount'>('newest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Brands list (dynamic from products)
  const brands = useMemo(() => {
    const base = ['all', 'ASUS', 'Apple', 'Lenovo', 'Dell', 'MSI', 'HP', 'Acer', 'Gigabyte'];
    const dynamicBrands = products.map(p => p.brand).filter(Boolean);
    return Array.from(new Set([...base, ...dynamicBrands]));
  }, [products]);

  // Categories list
  const categories = [
    { id: 'all', label: 'همه دسته‌ها' },
    { id: 'gaming', label: 'گیمینگ و رندرینگ' },
    { id: 'engineering', label: 'مهندسی و طراحی' },
    { id: 'programming', label: 'برنامه‌نویسی' },
    { id: 'student', label: 'دانشجویی و روزمره' },
    { id: 'business', label: 'اداری و بیزینس' },
    { id: 'budget', label: 'اقتصادی و عمومی' }
  ];

  // Sync route param (e.g. brand or category passed from other pages/navbar/footer)
  useEffect(() => {
    if (routeParam) {
      if (routeParam === 'all') {
        setSelectedBrand('all');
        setSelectedCategory('all');
        setSelectedGpu('all');
        setSelectedRam('all');
        setOnlyDiscounted(false);
      } else if (routeParam === 'discounts' || routeParam === 'discounted') {
        setOnlyDiscounted(true);
      } else if (routeParam.startsWith('brand:')) {
        const brand = routeParam.replace('brand:', '');
        setSelectedBrand(brand);
        setSelectedCategory('all');
      } else if (routeParam.startsWith('cat:') || routeParam.startsWith('category:')) {
        const cat = routeParam.replace(/^cat(egory)?:/, '');
        setSelectedCategory(cat);
        setSelectedBrand('all');
      } else if (brands.includes(routeParam)) {
        setSelectedBrand(routeParam);
        setSelectedCategory('all');
      } else if (categories.some(c => c.id === routeParam)) {
        setSelectedCategory(routeParam);
        setSelectedBrand('all');
      }
    }
  }, [routeParam, brands]);

  const gpus = [
    { id: 'all', label: 'همه گرافیک‌ها' },
    { id: 'RTX 4090', label: 'NVIDIA RTX 4090' },
    { id: 'RTX 4080', label: 'NVIDIA RTX 4080' },
    { id: 'RTX 4070', label: 'NVIDIA RTX 4070' },
    { id: 'RTX 4060', label: 'NVIDIA RTX 4060' },
    { id: 'RTX 4050', label: 'NVIDIA RTX 4050' },
    { id: 'Apple', label: 'Apple Silicon GPU' }
  ];

  const rams = [
    { id: 'all', label: 'همه مقادیر RAM' },
    { id: '16GB', label: '۱۶ گیگابایت' },
    { id: '32GB', label: '۳۲ گیگابایت' },
    { id: '64GB', label: '۶۴ گیگابایت' },
    { id: '128GB', label: '۱۲۸ گیگابایت' }
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedGpu('all');
    setSelectedRam('all');
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setPriceMax(300000000);
    setSearchQuery('');
    setSortBy('newest');
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          (product.name || '').toLowerCase().includes(q) ||
          (product.englishName || '').toLowerCase().includes(q) ||
          (product.brand || '').toLowerCase().includes(q) ||
          (product.specs?.cpu || '').toLowerCase().includes(q) ||
          (product.specs?.gpu || '').toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // GPU
      if (selectedGpu !== 'all') {
        if (!product.specs?.gpu || !product.specs.gpu.includes(selectedGpu)) {
          return false;
        }
      }

      // RAM
      if (selectedRam !== 'all') {
        if (!product.specs?.ram || !product.specs.ram.includes(selectedRam)) {
          return false;
        }
      }

      // In stock
      if (onlyInStock && !product.inStock && (product.stock ?? 0) <= 0) {
        return false;
      }

      // Discounted
      if (onlyDiscounted && (!product.discountPercent || product.discountPercent <= 0)) {
        return false;
      }

      // Price Max
      const activePrice = product.discountPrice || product.price;
      if (activePrice > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'bestseller') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0; // Default newest
    });
  }, [
    products,
    selectedBrand,
    selectedCategory,
    selectedGpu,
    selectedRam,
    onlyInStock,
    onlyDiscounted,
    priceMax,
    sortBy,
    searchQuery
  ]);

  const filterContent = (
    <div className="space-y-5 text-right">
      {/* Reset Filters */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>فیلترهای انتخابی</span>
        </span>
        <button
          onClick={handleResetFilters}
          className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>پاک‌سازی</span>
        </button>
      </div>

      {/* Brand Selection */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">برند سازنده</h4>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {brands.map(b => (
            <label
              key={b}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedBrand === b
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === b}
                  onChange={() => setSelectedBrand(b)}
                  className="hidden"
                />
                <span>{b === 'all' ? 'همه برندها' : b}</span>
              </div>
              {selectedBrand === b && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">کاربری لپ‌تاپ</h4>
        <div className="space-y-1">
          {categories.map(c => (
            <label
              key={c.id}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedCategory === c.id
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === c.id}
                  onChange={() => setSelectedCategory(c.id)}
                  className="hidden"
                />
                <span>{c.label}</span>
              </div>
              {selectedCategory === c.id && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* GPU Selection */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">کارت گرافیک (GPU)</h4>
        <div className="space-y-1">
          {gpus.map(g => (
            <label
              key={g.id}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedGpu === g.id
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gpu"
                  checked={selectedGpu === g.id}
                  onChange={() => setSelectedGpu(g.id)}
                  className="hidden"
                />
                <span className="font-mono text-[11px]">{g.label}</span>
              </div>
              {selectedGpu === g.id && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* RAM Selection */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">حافظه رم (RAM)</h4>
        <div className="space-y-1">
          {rams.map(r => (
            <label
              key={r.id}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedRam === r.id
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="ram"
                  checked={selectedRam === r.id}
                  onChange={() => setSelectedRam(r.id)}
                  className="hidden"
                />
                <span>{r.label}</span>
              </div>
              {selectedRam === r.id && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">سقف قیمت</h4>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
            {formatToman(priceMax)}
          </span>
        </div>
        <input
          type="range"
          min={40000000}
          max={300000000}
          step={5000000}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
          <span>۴۰ م</span>
          <span>۳۰۰ م تومان</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs text-slate-700 dark:text-slate-300">فقط کالاهای موجود</span>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={e => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs text-slate-700 dark:text-slate-300">فقط کالاهای دارای تخفیف</span>
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={e => setOnlyDiscounted(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-right transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">فروشگاه لپ‌تاپ</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            خرید انواع لپ‌تاپ گیمینگ، مهندسی و اداری
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            مشاهده، مقایسه و خرید آنلاین لپ‌تاپ‌های اصل با گارانتی طلایی ۲۴ ماهه تعویض
          </p>
        </div>

        {/* Top Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs mb-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام مدل، پردازنده، گرافیک..."
              className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all text-right"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>فیلترها</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 hidden md:inline">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
              >
                <option value="newest">جدیدترین</option>
                <option value="bestseller">پرفروش‌ترین‌ها</option>
                <option value="price-asc">ارزان‌ترین قیمت</option>
                <option value="price-desc">گران‌ترین قیمت</option>
                <option value="discount">بیشترین تخفیف</option>
              </select>
            </div>

            {/* Test Skeleton Loading State Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 900);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 transition-colors"
              title="مشاهده و تست انیمیشن اسکلتون لودینگ"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>پیش‌نمایش اسکلتون</span>
            </motion.button>

            {/* Count Badge */}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">
              {toPersianDigits(filteredProducts.length)} لپ‌تاپ
            </span>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(selectedBrand !== 'all' || selectedCategory !== 'all' || selectedGpu !== 'all' || selectedRam !== 'all' || onlyInStock || onlyDiscounted || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">فیلترهای فعال:</span>

            {selectedBrand !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800">
                برند: {selectedBrand}
                <button onClick={() => setSelectedBrand('all')} className="hover:text-blue-900 dark:hover:text-blue-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800">
                دسته: {categories.find(c => c.id === selectedCategory)?.label || selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-blue-900 dark:hover:text-blue-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedGpu !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800">
                گرافیک: {selectedGpu}
                <button onClick={() => setSelectedGpu('all')} className="hover:text-blue-900 dark:hover:text-blue-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedRam !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800">
                رم: {selectedRam}
                <button onClick={() => setSelectedRam('all')} className="hover:text-blue-900 dark:hover:text-blue-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onlyInStock && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-100 dark:border-emerald-800">
                فقط موجود در انبار
                <button onClick={() => setOnlyInStock(false)} className="hover:text-emerald-900 dark:hover:text-emerald-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onlyDiscounted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold border border-rose-100 dark:border-rose-800">
                فقط تخفیف‌دارها
                <button onClick={() => setOnlyDiscounted(false)} className="hover:text-rose-900 dark:hover:text-rose-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-100 dark:border-amber-800">
                جستجو: «{searchQuery}»
                <button onClick={() => setSearchQuery('')} className="hover:text-amber-900 dark:hover:text-amber-200">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="mr-auto text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>پاکسازی همه</span>
            </button>
          </div>
        )}

        {/* Main Content Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs sticky top-20">
            {filterContent}
          </div>

          {/* Product Cards Grid with AnimatePresence & Loading Skeleton */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <ProductGridSkeleton count={6} />
                </motion.div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  key="product-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(idx * 0.035, 0.25),
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <ProductCard key={product.id} product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    لپ‌تاپی با فیلترهای انتخابی شما یافت نشد!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
                    می‌توانید با تغییر فیلترها، حذف محدوده قیمت یا جستجوی کلمات دیگر مدل‌های بیشتری مشاهده نمایید.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    بازنشانی همه فیلترها
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Mobile Filters Drawer Modal with Animated Transitions */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full p-6 z-10 overflow-y-auto shadow-2xl flex flex-col justify-between ml-auto border-l border-slate-200 dark:border-slate-800"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">فیلترهای جستجو</span>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {filterContent}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs"
                >
                  نمایش نتایج ({toPersianDigits(filteredProducts.length)} لپ‌تاپ)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
