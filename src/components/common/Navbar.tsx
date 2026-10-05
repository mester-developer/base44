import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { ThemeToggle } from './ThemeToggle';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  User,
  Menu,
  X,
  Laptop,
  ChevronDown,
  Phone,
  ShieldCheck,
  Truck,
  Percent,
  ArrowLeft,
  Shield,
  LogOut,
  Package
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    cartCount,
    cartTotal,
    wishlist,
    compareList,
    products
  } = useStore();

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close search and user popup on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(
        p =>
          (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.englishName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.specs?.cpu || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.specs?.gpu || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigateTo('shop');
    }
  };

  const handleSelectProduct = (slug: string) => {
    setSearchFocused(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
    navigateTo('product', slug);
  };

  const categories = [
    { id: 'gaming', label: 'لپ‌تاپ گیمینگ', desc: 'بالاترین قدرت گرافیکی و خنک‌کنندگی' },
    { id: 'programming', label: 'لپ‌تاپ برنامه‌نویسی', desc: 'رم بالا، پردازنده سریع و کیبورد ارگونومیک' },
    { id: 'engineering', label: 'لپ‌تاپ مهندسی و رندرینگ', desc: 'پردازش سنگین سه‌بعدی و شبیه‌سازی' },
    { id: 'student', label: 'لپ‌تاپ دانشجویی', desc: 'باتری بادوام، سبک و قابل حمل' },
    { id: 'business', label: 'لپ‌تاپ اداری و تجاری', desc: 'طراحی شیک، پایدار و امن' },
    { id: 'budget', label: 'لپ‌تاپ اقتصادی', desc: 'بهترین کارایی به ازای قیمت پرداختی' }
  ];

  return (
    <>
      {/* 1. Small Promotional Strip */}
      <div className="bg-slate-900 text-slate-200 text-[11px] sm:text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>ارسال سریع و رایگان سفارش‌های بالای ۱۰ میلیون تومان</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ضمانت طلایی ۲۴ ماهه تعویض قطعات فابریک</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => navigateTo('tracking')}
              className="hover:text-white transition-colors"
            >
              پیگیری سفارش
            </button>
            <span className="text-slate-600">|</span>
            <a
              href="tel:02191008877"
              className="flex items-center gap-1 hover:text-white transition-colors font-mono"
              dir="ltr"
            >
              <span>021-91008877</span>
              <Phone className="w-3 h-3 text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4 sm:gap-6">
            {/* Right: Mobile Menu Button + Brand Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="منوی سایت"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2.5 group text-right"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    نِکسورا
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider font-mono uppercase mt-0.5">
                    NEXORA
                  </span>
                </div>
              </button>
            </div>

            {/* Middle-Right: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  onClick={() => navigateTo('shop')}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>دسته‌بندی‌ها</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {categoriesOpen && (
                  <div className="absolute top-full right-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategoriesOpen(false);
                          navigateTo('shop', cat.id);
                        }}
                        className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col transition-colors group"
                      >
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {cat.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo('shop')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'shop'
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/70 dark:bg-blue-950/40'
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                لپ‌تاپ‌ها
              </button>

              <button
                onClick={() => navigateTo('brands')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'brands'
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/70 dark:bg-blue-950/40'
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                برندها
              </button>

              <button
                onClick={() => navigateTo('discounts')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                  currentRoute === 'discounts'
                    ? 'text-rose-600 dark:text-rose-400 font-bold bg-rose-50/70 dark:bg-rose-950/40'
                    : 'hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Percent className="w-3 h-3 text-rose-500" />
                <span>تخفیف‌ها</span>
              </button>

              <button
                onClick={() => navigateTo('blog')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'blog'
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/70 dark:bg-blue-950/40'
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                مجله
              </button>
            </nav>

            {/* Center: Prominent Search Bar */}
            <div ref={searchContainerRef} className="flex-1 max-w-md relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="جستجوی لپ‌تاپ، برند یا مشخصات (مثلاً RTX 4070)..."
                  className="w-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>

              {/* Autocomplete Popup */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50 p-2 animate-in fade-in duration-150">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1 border-b border-slate-100 dark:border-slate-800 mb-1">
                    نتایج پیشنهادی:
                  </div>
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.slug)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                            {prod.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {prod.specs.cpu} • {prod.specs.ram}
                          </div>
                        </div>
                      </div>
                      <div className="text-left font-mono font-bold text-xs text-blue-600 dark:text-blue-400 shrink-0 mr-2">
                        {formatToman(prod.price)}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setSearchFocused(false);
                      navigateTo('shop');
                    }}
                    className="w-full text-center py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 rounded-xl mt-1 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>مشاهده تمام نتایج در فروشگاه</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Left: Quick Actions [ ☀️/🌙 ] [ ♡ ] [ ⚖️ ] [ 👤 ] [ 🛒 ] */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Theme Toggle Button */}
              <ThemeToggle variant="icon" />

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="لیست علاقه‌مندی‌ها"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute 0 top-1 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                    {toPersianDigits(wishlist.length)}
                  </span>
                )}
              </button>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <button
                  onClick={() => navigateTo('compare')}
                  className="relative p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                  title="میز مقایسه"
                  aria-label="مقایسه"
                >
                  <Scale className="w-5 h-5" />
                  <span className="absolute top-1 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                    {toPersianDigits(compareList.length)}
                  </span>
                </button>
              )}

              {/* User Account / Login Dropdown */}
              <div ref={userMenuRef} className="relative">
                {isAuthenticated && user ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs border border-blue-200 dark:border-blue-800">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          user.firstName.charAt(0)
                        )}
                      </div>
                      <span className="hidden sm:inline font-bold">
                        {user.firstName}
                      </span>
                      {isAdmin && (
                        <span className="hidden md:inline-flex px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                          مدیر
                        </span>
                      )}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50 p-2 text-xs text-right animate-in fade-in duration-150">
                        {/* Header */}
                        <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {user.phone || user.email}
                          </div>
                        </div>

                        {/* Admin Link if admin */}
                        {isAdmin && (
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigateTo('admin');
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-xl text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 font-bold transition-colors mb-1"
                          >
                            <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span>ورود به پنل مدیریت</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigateTo('account');
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>حساب کاربری من</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigateTo('account/orders');
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                        >
                          <Package className="w-4 h-4 text-slate-400" />
                          <span>سفارش‌های من</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigateTo('account/wishlist');
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span>علاقه‌مندی‌ها</span>
                        </button>

                        <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                            navigateTo('login');
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>خروج از حساب</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigateTo('login')}
                    className="flex items-center gap-1.5 p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
                    title="ورود / ثبت‌نام در نکسورا"
                  >
                    <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    <span className="hidden sm:inline font-bold">ورود / ثبت‌نام</span>
                  </button>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => navigateTo('cart')}
                className="flex items-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all"
                title="سبد خرید"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -left-2 min-w-[16px] h-[16px] px-0.5 rounded-full bg-white text-blue-700 text-[10px] font-mono font-black flex items-center justify-center shadow-xs">
                      {toPersianDigits(cartCount)}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline">سبد خرید</span>
                {cartTotal > 0 && (
                  <span className="hidden lg:inline text-[11px] font-mono font-normal border-r border-blue-400 pr-2 mr-1">
                    {formatToman(cartTotal)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-50">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <span className="font-black text-base text-slate-900 dark:text-white">نکسورا</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme toggle in mobile drawer */}
              <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <ThemeToggle variant="switch" />
              </div>

              {/* Drawer Links */}
              <nav className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  صفحه اصلی
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  همه لپ‌تاپ‌ها
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('brands');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  برندها
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('discounts');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-rose-600 dark:text-rose-400 flex items-center justify-between"
                >
                  <span>تخفیف‌های ویژه</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold">
                    جشنواره
                  </span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('blog');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  مجله سخت‌افزار
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('tracking');
                  }}
                  className="w-full text-right px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  پیگیری مرسوله
                </button>
              </nav>

              {/* Categories Subsection */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-400 mb-2 px-3">
                  دسته‌بندی‌ها:
                </div>
                <div className="space-y-1 text-xs">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('shop', c.id);
                      }}
                      className="w-full text-right px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="font-mono text-center mb-2">پشتیبانی: ۰۲۱-۹۱۰۰۸۸۷۷</div>
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold flex items-center justify-center">
                        {user.firstName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{user.firstName} {user.lastName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{user.phone}</div>
                      </div>
                    </div>
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                        مدیر
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('admin');
                      }}
                      className="w-full py-2.5 bg-purple-600 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>پنل مدیریت فروشگاه</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full py-2.5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl text-center"
                  >
                    حساب کاربری من
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                      navigateTo('login');
                    }}
                    className="w-full py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold rounded-xl text-center transition-colors"
                  >
                    خروج از حساب
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('login');
                  }}
                  className="w-full py-2.5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl text-center"
                >
                  ورود / ثبت‌نام در نکسورا
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
