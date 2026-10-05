import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Laptop,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  FileText,
  Lock,
  ChevronLeft,
  Award,
  X,
  ExternalLink,
  Sparkles,
  Heart,
  Scale,
  Clock,
  Compass
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();
  const [activeCert, setActiveCert] = useState<'enamad' | 'union' | null>(null);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mb-10 border-b border-slate-800/80 text-xs">
          <button
            onClick={() => navigateTo('warranty')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-right group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">ضمانت طلایی ۲۴ ماهه</div>
              <div className="text-[11px] text-slate-400 mt-0.5">اصالت ۱۰۰٪ قطعات فابریک</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('returns')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-right group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">مهلت تست ۷ روزه</div>
              <div className="text-[11px] text-slate-400 mt-0.5">تضمین تعویض یا بازگشت وجه</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('shipping')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-right group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">ارسال فوق‌سریع</div>
              <div className="text-[11px] text-slate-400 mt-0.5">اکسپرس تهران و بیمه سراسری</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-right group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">مشاوره تخصصی سخت‌افزار</div>
              <div className="text-[11px] text-slate-400 mt-0.5">پاسخگویی ۷ روز هفته</div>
            </div>
          </button>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800 text-xs">
          
          {/* Brand & About (4 cols) */}
          <div className="lg:col-span-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 mb-4 text-right group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-900/20 group-hover:scale-105 transition-transform">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors block">
                  نکسورا (NEXORA)
                </span>
                <span className="text-[10px] text-cyan-400 font-mono tracking-wider">PREMIUM HARDWARE STORE</span>
              </div>
            </button>

            <p className="text-slate-400 leading-relaxed mb-5 text-xs">
              فروشگاه اینترنتی نکسورا مرجع تخصصی تامین، بررسی و عرضه لپ‌تاپ‌های گیمینگ، مهندسی و حرفه‌ای در ایران است. کلیه محصولات به‌صورت مستقیم با پارت‌نامبر معتبر، برچسب اصالت کالا و گارانتی طلایی ۲۴ ماهه ارسال می‌شوند.
            </p>

            <div className="space-y-2.5 text-slate-300">
              <div>
                <a
                  href="tel:02191008877"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors py-0.5"
                >
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono">۰۲۱-۹۱۰۰۸۸۷۷</span>
                  <span className="text-slate-500 text-[11px]">(پشتیبانی و مشاوره پیش از خرید)</span>
                </a>
              </div>
              <div>
                <a
                  href="mailto:support@nexora-tech.ir"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors py-0.5"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono">support@nexora-tech.ir</span>
                </a>
              </div>
              <div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="flex items-start gap-2 text-right text-slate-300 hover:text-cyan-400 transition-colors py-0.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    تهران، خیابان ولیعصر، تقاطع طالقانی، مجتمع نور تهران، طبقه ۴، واحد ۴۰۲
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>خرید بر اساس کاربری</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:gaming')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های گیمینگ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:engineering')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های مهندسی و رندر</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:programming')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های برنامه‌نویسی</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:business')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>اولترابوک و اداری</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:student')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>دانشجویی و روزمره</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'category:budget')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های اقتصادی</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => navigateTo('discounts')}
                  className="text-rose-400 hover:text-rose-300 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-rose-400" />
                  <span>تخفیف‌های ویژه جشنواره</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Brands (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>برندهای معتبر</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:ASUS')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های ایسوس (ASUS)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:Apple')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>اپل مک‌بوک (Apple)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:Lenovo')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های لنوو (Lenovo)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:Dell')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های دل (Dell)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:MSI')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های ام‌اس‌آی (MSI)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'brand:HP')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>لپ‌تاپ‌های اچ‌پی (HP)</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => navigateTo('brands')}
                  className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-cyan-400" />
                  <span>مشاهده همه برندها</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Guides (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>خدمات و راهنما</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('tracking')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>پیگیری وضعیت سفارش</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('compare')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>میز مقایسه مشخصات</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('warranty')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>شرایط گارانتی طلایی</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('returns')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>رویه بازگشت کالا (۷ روز)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>شیوه‌ها و هزینه ارسال</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>سؤالات متداول (FAQ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-slate-600" />
                  <span>مجله تخصصی سخت‌افزار</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee Box (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-4">مجوزها و اصالت</h4>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setActiveCert('enamad')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                title="مشاهده اطلاعات نماد اعتماد الکترونیکی"
              >
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-200">اینماد ۵ ستاره</span>
                <span className="text-[9px] text-slate-400">وزارت صمت</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCert('union')}
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                title="مشاهده پروانه کسب اتحادیه رایانه"
              >
                <CheckCircle2 className="w-6 h-6 text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-slate-200">عضو اتحادیه</span>
                <span className="text-[9px] text-slate-400">صنف رایانه</span>
              </button>
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>ساعات کاری شوروم:</span>
              </div>
              <p>شنبه تا چهارشنبه: ۹ الی ۱۸</p>
              <p>پنج‌شنبه‌ها: ۹ الی ۱۴</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="text-center sm:text-right">
            تمامی حقوق مادی و معنوی متعلق به فروشگاه سخت‌افزار <strong className="text-white">نکسورا (NEXORA)</strong> است. ۱۴۰۳ ©
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              درباره نکسورا
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              تماس با ما
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigateTo('terms')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              قوانین و مقررات
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigateTo('privacy')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              حریم خصوصی
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => navigateTo('warranty')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              شرایط گارانتی
            </button>
          </div>
        </div>

      </div>

      {/* Interactive License Verification Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full text-right shadow-2xl relative">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeCert === 'enamad' ? (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    نماد اعتماد الکترونیکی (اینماد ۵ ستاره)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    صادر شده توسط مرکز توسعه تجارت الکترونیکی (وزارت صنعت، معدن و تجارت)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">نام کسب‌وکار:</span>
                    <span className="font-sans font-bold text-white">فروشگاه آنلاین نکسورا</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">شناسه یکتای ثبت:</span>
                    <span>9842019-IR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">وضعیت اعتبار:</span>
                    <span className="text-emerald-400 font-sans font-bold">معتبر و فعال (۵ ستاره)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">تاریخ تمدید:</span>
                    <span>1405/12/29</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setActiveCert(null);
                      navigateTo('warranty');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
                  >
                    مشاهده ضمانت‌نامه طلایی
                  </button>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                  >
                    بستن
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    پروانه کسب رسمی اتحادیه صنف رایانه
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    اتحادیه صنف فناوران رایانه تهران و اتاق اصناف ایران
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">عنوان پروانه:</span>
                    <span className="font-sans font-bold text-white">فروش و خدمات سخت‌افزار رایانه</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">شماره پروانه کسب:</span>
                    <span>4829/T-TH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">وضعیت:</span>
                    <span className="text-blue-400 font-sans font-bold">عضو رسمی اتحادیه رایانه</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setActiveCert(null);
                      navigateTo('contact');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    آدرس و اطلاعات شوروم
                  </button>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                  >
                    بستن
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
