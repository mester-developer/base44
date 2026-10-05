import React from 'react';
import { motion } from 'motion/react';
import { LaptopProduct } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { LazyImage } from './LazyImage';
import {
  Heart,
  Scale,
  ShoppingCart,
  Star,
  Check
} from 'lucide-react';

interface ProductCardProps {
  product: LaptopProduct;
  showCompareOption?: boolean;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  showCompareOption = true
}) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
    cart
  } = useStore();

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  // Clean CPU and GPU names for compact specs line
  const cpuText = product.specs?.cpu || '';
  const gpuText = product.specs?.gpu || '';
  const cleanCpu = (cpuText.split('(')[0] || '').replace(/Intel|Core|AMD|Ryzen/gi, '').trim() || cpuText;
  const cleanGpu = (gpuText.split('(')[0] || '').replace(/NVIDIA|GeForce/gi, '').trim() || gpuText;
  const ramText = product.specs?.ram || '';
  const storageText = product.specs?.storage || '';
  const specsSummary = [cleanCpu, ramText, storageText, cleanGpu].filter(Boolean).join(' • ');

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigateTo('product', product.slug);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-colors duration-200 p-4 flex flex-col justify-between group cursor-pointer text-right select-none"
    >
      <div>
        {/* Top Bar: Badges + Wishlist & Compare Buttons */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Discount Badge */}
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 font-mono font-bold text-[11px]">
              {toPersianDigits(product.discountPercent)}٪ تخفیف
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-mono uppercase">
              {product.brand}
            </span>
          )}

          {/* Actions: Heart + Compare */}
          <div className="flex items-center gap-1">
            {showCompareOption && (
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={e => {
                  e.stopPropagation();
                  if (isCompared) {
                    removeFromCompare(product.id);
                  } else {
                    addToCompare(product.id);
                  }
                }}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isCompared
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={isCompared ? 'حذف از مقایسه' : 'مقایسه'}
                aria-label="مقایسه"
              >
                {isCompared ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Scale className="w-3.5 h-3.5" />}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={e => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:text-rose-500'
              }`}
              title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
              aria-label="علاقه‌مندی"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Product Image: Visual Focus */}
        <div className="relative w-full h-44 sm:h-48 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl overflow-hidden mb-3 p-3 flex items-center justify-center">
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
            wrapperClassName="w-full h-full"
          />
        </div>

        {/* Brand */}
        <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
          {product.brand}
        </div>

        {/* Full Laptop Name */}
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-xs">
            {toPersianDigits(product.rating)}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            ({toPersianDigits(product.reviewCount)} نظر)
          </span>
        </div>

        {/* Short Specs Pill */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans line-clamp-1 py-1 px-2 rounded-md bg-slate-100/80 dark:bg-slate-800/80 mb-3 border border-slate-100 dark:border-slate-800">
          {specsSummary}
        </div>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
        <div className="flex flex-col mb-3">
          {product.discountPercent && product.originalPrice ? (
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="line-through text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                {formatToman(product.originalPrice)}
              </span>
            </div>
          ) : (
            <div className="h-4" />
          )}
          <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
            {formatToman(product.price)}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={e => {
            e.stopPropagation();
            addToCart(product);
          }}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
            isInCart
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>در سبد خرید</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>افزودن به سبد</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);

