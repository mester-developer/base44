import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { toPersianDigits } from '../../utils/persian';

export const AccountWishlist: React.FC = () => {
  const { wishlist, products, navigateTo } = useStore();

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>لیست کالاهای مورد علاقه</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            محصولاتی که برای بررسی یا خرید در آینده نشان کرده‌اید ({toPersianDigits(favoriteProducts.length)} کالا).
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            onClick={() => navigateTo('shop')}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-colors"
          >
            مشاهده سایر محصولات
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {favoriteProducts.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            لیست علاقه‌مندی‌های شما خالی است
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
            با کلیک روی آیکون قلب در کنار هر لپ‌تاپ در فروشگاه، می‌توانید آن را به این لیست اضافه کنید.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            مشاهده کاتالوگ لپ‌تاپ‌ها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
