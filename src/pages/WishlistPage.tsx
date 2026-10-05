import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import { LazyImage } from '../components/common/LazyImage';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronLeft,
  Star
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo, products } = useStore();

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-[75vh] flex items-center justify-center text-right transition-colors">
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900 flex items-center justify-center mx-auto mb-4 text-rose-500 dark:text-rose-400">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">لیست علاقه‌مندی‌ها خالی است</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            با کلیک روی آیکون قلب در کارت هر لپ‌تاپ، می‌توانید مدل‌های برگزیده را برای بررسی بعدی در این بخش ذخیره فرمایید.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            مشاهده جدیدترین لپ‌تاپ‌ها
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold mb-1">
              <Heart className="w-4 h-4 fill-current" />
              <span>لیست علاقه‌مندی‌ها</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              لپ‌تاپ‌های برگزیده ({toPersianDigits(favoriteProducts.length)} مورد)
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>بازگشت به فروشگاه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteProducts.map(product => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs relative group"
            >
              <div>
                {/* Image and Delete */}
                <div className="relative aspect-4/3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-2 flex items-center justify-center mb-3 overflow-hidden">
                  <LazyImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain cursor-pointer"
                    wrapperClassName="w-full h-full"
                    onClick={() => navigateTo('product', product.slug)}
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 left-2 p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors z-2"
                    title="حذف از لیست علاقه‌مندی‌ها"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Brand & Rating */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <span className="font-mono text-[11px]">{toPersianDigits(product.rating)}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                <h3
                  onClick={() => navigateTo('product', product.slug)}
                  className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-2 mb-2 transition-colors"
                >
                  {product.name}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono line-clamp-1 mb-3">
                  {(product.specs?.cpu || '').split('(')[0]} | {(product.specs?.gpu || '').split('(')[0]}
                </p>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="mb-3">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block mb-0.5">قیمت روز:</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                    {formatToman(product.discountPrice || product.price)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>انتقال به سبد خرید</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
