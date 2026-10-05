import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import { ProductCard } from '../components/common/ProductCard';
import { ProductDetailSkeleton } from '../components/common/Skeleton';
import { LazyImage } from '../components/common/LazyImage';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Scale,
  ShoppingCart,
  Cpu,
  Zap,
  HardDrive,
  Tv,
  Sparkles,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface ProductDetailPageProps {
  slug?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    showToast,
    products
  } = useStore();

  const product = products.find(p => p.slug === slug || p.id === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'reviews'>('specs');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Reset states & trigger skeleton loading when viewing a different product
  useEffect(() => {
    setIsLoading(true);
    setActiveImageIndex(0);
    setQuantity(1);
    setActiveTab('specs');
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [slug]);

  // New review form
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const isFavorite = product ? isInWishlist(product.id) : false;
  const isCompared = product ? isInCompare(product.id) : false;

  // Related products
  const relatedProducts = product ? products.filter(
    p => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
  ).slice(0, 4) : [];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      showToast('خطا در ثبت دیدگاه', 'لطفاً نام و متن نظر خود را وارد فرمایید.', 'warning');
      return;
    }
    showToast('دیدگاه شما ثبت شد', 'دیدگاه شما با موفقیت ثبت شد و پس از بازبینی منتشر می‌گردد.', 'success');
    setReviewAuthor('');
    setReviewComment('');
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <ProductDetailSkeleton key={`skeleton-${slug || product.id}`} />
      ) : (
        <motion.div
          key={`detail-${product.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb & Preview Skeleton Toggle */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 overflow-x-auto pb-1">
                <button onClick={() => navigateTo('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">خانه</button>
                <span>/</span>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">فروشگاه لپ‌تاپ</button>
                <span>/</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{product.brand}</span>
                <span>/</span>
                <span className="text-slate-900 dark:text-white font-bold truncate max-w-xs">{product.name}</span>
              </div>

              {/* Dev/Preview Skeleton trigger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 900);
                }}
                className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-800 shadow-2xs transition-colors"
                title="مشاهده و تست انیمیشن اسکلتون صفحه محصول"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>پیش‌نمایش اسکلتون</span>
              </motion.button>
            </div>

            {/* Product Top Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-8 mb-8 shadow-2xs">
          
          {/* Gallery - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Main Featured Image */}
            <div className="relative aspect-4/3 w-full bg-slate-50/60 dark:bg-slate-800/60 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 p-6 flex items-center justify-center mb-4">
              <LazyImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                priority={true}
                className="w-full h-full object-contain object-center transition-all duration-300"
                wrapperClassName="w-full h-full"
              />
              {product.discountPercent && product.discountPercent > 0 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs shadow-2xs z-2">
                  {toPersianDigits(product.discountPercent)}٪ تخفیف ویژه
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-18 h-14 rounded-lg bg-slate-50 dark:bg-slate-800 border p-1 overflow-hidden shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900'
                        : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <LazyImage
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      className="w-full h-full object-contain"
                      wrapperClassName="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Action Column - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Brand & Stock Header */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono">
                  {product.brand}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-amber-500">
                  <span className="text-slate-400 dark:text-slate-500">({toPersianDigits(product.reviewCount)} دیدگاه)</span>
                  <span className="font-bold font-mono text-slate-700 dark:text-slate-300">{toPersianDigits(product.rating)}</span>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* Titles */}
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-1">
                {product.name}
              </h1>
              <h2 className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-4">
                {product.englishName}
              </h2>

              {/* Short Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Core 4 Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>پردازنده</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-mono truncate">
                    {(product.specs?.cpu || '').split('(')[0] || '---'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>کارت گرافیک</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-mono truncate">
                    {(product.specs?.gpu || '').split('(')[0] || '---'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>حافظه رم</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-mono truncate">
                    {product.specs?.ram || '---'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">
                    <Tv className="w-3.5 h-3.5" />
                    <span>نمایشگر</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-mono truncate">
                    {product.specs?.refreshRate || ''} {product.specs?.panelType ? `- ${(product.specs.panelType.split('با')[0] || product.specs.panelType).trim()}` : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Box & CTA */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">قیمت مصرف‌کننده:</span>
                  {product.discountPrice ? (
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {formatToman(product.discountPrice)}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                        {formatToman(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatToman(product.price)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div>
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>موجود در انبار ({toPersianDigits(product.stock)} عدد)</span>
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 font-bold text-xs">ناموجود</span>
                  )}
                </div>
              </div>

              {/* Quantity + Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Quantity stepper */}
                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 font-mono text-xs">
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold"
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center font-bold text-slate-900 dark:text-white">
                    {toPersianDigits(quantity)}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setQuantity(prev => Math.min(prev + 1, product.stock))}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold"
                  >
                    +
                  </motion.button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>افزودن به سبد خرید</span>
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorite
                      ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                  title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.button>

                {/* Compare */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => addToCompare(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isCompared
                      ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                  title={isCompared ? 'در لیست مقایسه موجود است' : 'افزودن به مقایسه'}
                >
                  <Scale className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Guarantees Mini Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{product.specs.warranty}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>ارسال سریع و بیمه کامل حمل</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>۷ روز ضمانت بازگشت نکسورا</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Specifications, Highlights, Reviews */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-8 mb-10 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'specs'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              مشخصات فنی دستگاه
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('highlights')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'highlights'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              ویژگی‌های کلیدی ({toPersianDigits(product.highlights?.length || 0)})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              دیدگاه خریداران
            </motion.button>
          </div>

          {/* AnimatePresence for Tab Content */}
          <AnimatePresence mode="wait">
            {/* Specs Table Tab */}
            {activeTab === 'specs' && (
              <motion.div
                key="tab-specs"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100 dark:divide-slate-800 text-xs"
              >
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">پردازنده مرکزی (CPU):</span>
                  <span className="sm:col-span-2 text-slate-900 dark:text-slate-100 font-mono font-semibold">{product.specs?.cpu || 'مشخص نشده'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">تعداد هسته و رشته:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.specs?.cpuCores || 'استاندارد'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">پردازنده گرافیکی (GPU):</span>
                  <span className="sm:col-span-2 text-slate-900 dark:text-slate-100 font-mono font-semibold">{product.specs?.gpu || 'مشخص نشده'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">حافظه گرافیک (VRAM):</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-mono">{product.specs?.gpuVram || 'اشتراکی / استاندارد'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">حافظه رم (RAM):</span>
                  <span className="sm:col-span-2 text-slate-900 dark:text-slate-100 font-mono font-semibold">{product.specs?.ram || 'مشخص نشده'} {product.specs?.ramType ? `(${product.specs.ramType})` : ''}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">فضای ذخیره‌سازی:</span>
                  <span className="sm:col-span-2 text-slate-900 dark:text-slate-100 font-mono font-semibold">{product.specs?.storage || 'مشخص نشده'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">صفحه نمایش:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-mono">{product.specs?.display || 'مشخص نشده'} {product.specs?.resolution ? `(${product.specs.resolution})` : ''}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">نرخ نوسازی تصویر:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-mono">{product.specs?.refreshRate || '60Hz'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">نوع پنل:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.specs?.panelType || 'IPS'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">باتری:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.specs?.battery || 'مشخص نشده'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">وزن دستگاه:</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.specs?.weight || 'مشخص نشده'}</span>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">درگاه‌ها و اتصالات:</span>
                  <div className="sm:col-span-2 space-y-1 text-slate-700 dark:text-slate-300">
                    {(product.specs?.ports && product.specs.ports.length > 0) ? (
                      product.specs.ports.map((port, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{port}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500">درگاه‌های استاندارد Type-C / USB / HDMI</span>
                    )}
                  </div>
                </div>
                <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">گارانتی:</span>
                  <span className="sm:col-span-2 text-blue-700 dark:text-blue-400 font-semibold">{product.specs?.warranty || 'گارانتی ۱۸ ماهه رسمی نکسورا'}</span>
                </div>
              </motion.div>
            )}

            {/* Highlights Tab */}
            {activeTab === 'highlights' && (
              <motion.div
                key="tab-highlights"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {(product.highlights && product.highlights.length > 0) ? (
                  product.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">ویژگی #{toPersianDigits(i + 1)}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{h}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs">
                    ویژگی‌های کلیدی برای این کالا ثبت نشده است.
                  </div>
                )}
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                key="tab-reviews"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>ثبت نظر در مورد این محصول</span>
                  </h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-300 mb-1">نام شما:</label>
                        <input
                          type="text"
                          value={reviewAuthor}
                          onChange={e => setReviewAuthor(e.target.value)}
                          placeholder="مثلاً: علیرضا محمدی"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 dark:text-slate-300 mb-1">امتیاز:</label>
                        <select
                          value={reviewRating}
                          onChange={e => setReviewRating(Number(e.target.value))}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value={5}>۵ ستاره - عالی</option>
                          <option value={4}>۴ ستاره - خیلی خوب</option>
                          <option value={3}>۳ ستاره - معمولی</option>
                          <option value={2}>۲ ستاره - ضعیف</option>
                          <option value={1}>۱ ستاره - نامناسب</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 mb-1">متن نظر:</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                        placeholder="تجربه کار با دستگاه، کیفیت ساخت، دما و کاربری..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                    >
                      ثبت دیدگاه
                    </motion.button>
                  </form>
                </div>

                {/* Sample Review */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">کیوان حیدری</span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">خریدار تاییدشده</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    دستگاه فوق‌العاده سریع و خوش‌ساخت هست. برای کارهای کامپایل و پروژه‌های هوش مصنوعی و کدنویسی بسیار روان عمل می‌کند و صفحه‌نمایش شفافیت و زاویه دید عالی دارد.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-4">
              محصولات مرتبط
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
