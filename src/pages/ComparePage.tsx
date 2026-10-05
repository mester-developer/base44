import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/persian';
import { LazyImage } from '../components/common/LazyImage';
import { CompareProductPickerModal } from '../components/compare/CompareProductPickerModal';
import {
  Scale,
  Trash2,
  Plus,
  ShoppingCart,
  X,
  Sparkles,
  RefreshCw,
  Check,
  Cpu,
  Zap,
  HardDrive,
  Tv,
  Battery,
  ShieldCheck,
  Layers,
  ArrowRightLeft,
  Share2,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    setCompareSlot,
    setCompareProducts,
    addToCart,
    navigateTo,
    products,
    showToast
  } = useStore();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activePickerSlot, setActivePickerSlot] = useState<number>(0);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Get compared products up to 4
  const comparedProducts = compareList
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  const handleOpenPicker = (slotIndex: number) => {
    setActivePickerSlot(slotIndex);
    setIsPickerOpen(true);
  };

  const handleSelectProduct = (productId: string) => {
    setCompareSlot(activePickerSlot, productId);

    // If we just selected Slot 0 (laptop 1) and Slot 1 (laptop 2) is empty, guide user to slot 2
    if (activePickerSlot === 0 && (!compareList[1] || compareList.length === 1)) {
      setTimeout(() => {
        showToast('انتخاب گام دوم', 'حالا لپ‌تاپ دوم را برای مقایسه مستقیم انتخاب کنید.', 'info');
      }, 300);
    }
  };

  const handleApplyPreset = (id1: string, id2: string) => {
    const p1 = products.find(p => p.id === id1 || p.slug.includes(id1));
    const p2 = products.find(p => p.id === id2 || p.slug.includes(id2));
    if (p1 && p2) {
      setCompareProducts([p1.id, p2.id]);
    } else {
      // Fallback to first two available products
      if (products.length >= 2) {
        setCompareProducts([products[0].id, products[1].id]);
      }
    }
  };

  const handleShare = () => {
    setCopiedLink(true);
    showToast('لینک مقایسه', 'لینک این جدول مقایسه در کلیپ‌بورد کپی شد.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Popular duel presets
  const presets = [
    {
      title: 'ایسوس ROG Strix G16 در برابر لنوو Legion Pro 5',
      badge: 'دوئل گیمینگ پرچمدار',
      id1: 'nx-asus-rog-strix-g16',
      id2: 'nx-lenovo-legion-pro-5'
    },
    {
      title: 'مک‌بوک پرو ۱۶ M3 Max در برابر ایسوس Zenbook 14 OLED',
      badge: 'تولید محتوا و برنامه‌نویسی',
      id1: 'nx-apple-macbook-pro-16-m3-max',
      id2: 'nx-asus-zenbook-14-oled'
    },
    {
      title: 'ایسوس TUF Gaming F15 در برابر لنوو LOQ 15',
      badge: 'گیمینگ اقتصادی و محبوب',
      id1: 'nx-asus-tuf-gaming-f15',
      id2: 'nx-lenovo-loq-15'
    }
  ];

  // Spec comparison rows structure
  const specGroups = [
    {
      groupTitle: 'اطلاعات پایه و قیمت',
      icon: Layers,
      rows: [
        { label: 'برند سازنده', getValue: (p: any) => p.brand },
        { label: 'دسته‌بندی و کاربری', getValue: (p: any) => p.categoryFa },
        {
          label: 'قیمت مصرف‌کننده',
          getValue: (p: any) => (
            <div className="font-mono font-extrabold text-sm text-slate-900 dark:text-white">
              {formatToman(p.discountPrice || p.price)}
              {p.discountPrice && (
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal line-through">
                  {formatToman(p.price)}
                </div>
              )}
            </div>
          ),
          raw: (p: any) => p.discountPrice || p.price
        },
        {
          label: 'وضعیت موجودی در انبار',
          getValue: (p: any) =>
            p.stock > 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-bold">
                موجود در انبار ({toPersianDigits(p.stock)} عدد)
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 font-bold text-[11px]">ناموجود</span>
            ),
          raw: (p: any) => (p.stock > 0 ? 'instock' : 'out')
        },
        { label: 'گارانتی و خدمات پس از فروش', getValue: (p: any) => p.specs?.warranty || '۲۴ ماه گارانتی نکسورا' }
      ]
    },
    {
      groupTitle: 'پردازنده مرکزی (CPU)',
      icon: Cpu,
      rows: [
        { label: 'مدل پردازنده', getValue: (p: any) => p.specs?.cpu || '---' },
        { label: 'تعداد هسته و رشته', getValue: (p: any) => p.specs?.cpuCores || 'استاندارد' },
        { label: 'نسل / معماری', getValue: (p: any) => p.specs?.cpuGen || 'نسل جدید' }
      ]
    },
    {
      groupTitle: 'پردازنده گرافیکی (GPU)',
      icon: Zap,
      rows: [
        { label: 'مدل کارت گرافیک', getValue: (p: any) => p.specs?.gpu || '---' },
        { label: 'حافظه اختصاصی (VRAM)', getValue: (p: any) => p.specs?.gpuVram || 'اشتراکی' }
      ]
    },
    {
      groupTitle: 'حافظه رم و ذخیره‌سازی',
      icon: HardDrive,
      rows: [
        { label: 'ظرفیت رم (RAM)', getValue: (p: any) => `${p.specs?.ram || '---'} ${p.specs?.ramType ? `(${p.specs.ramType})` : ''}`, raw: (p: any) => p.specs?.ram },
        { label: 'فضای ذخیره‌سازی (SSD)', getValue: (p: any) => `${p.specs?.storage || '---'} ${p.specs?.storageType ? `(${p.specs.storageType})` : ''}`, raw: (p: any) => p.specs?.storage }
      ]
    },
    {
      groupTitle: 'صفحه نمایش و تصویر',
      icon: Tv,
      rows: [
        { label: 'ابعاد و رزولوشن صفحه', getValue: (p: any) => `${p.specs?.display || '---'} ${p.specs?.resolution ? `(${p.specs.resolution})` : ''}`, raw: (p: any) => p.specs?.display },
        { label: 'نرخ نوسازی (Refresh Rate)', getValue: (p: any) => <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{p.specs?.refreshRate || '60Hz'}</span>, raw: (p: any) => p.specs?.refreshRate },
        { label: 'نوع پنل نمایشگر', getValue: (p: any) => p.specs?.panelType || 'IPS' }
      ]
    },
    {
      groupTitle: 'باتری، وزن و بدنه',
      icon: Battery,
      rows: [
        { label: 'باتری و شارژدهی', getValue: (p: any) => p.specs?.battery || 'استاندارد' },
        { label: 'وزن دستگاه', getValue: (p: any) => p.specs?.weight || '---' },
        { label: 'سیستم‌عامل پیش‌فرض', getValue: (p: any) => p.specs?.os || 'Windows 11' },
        { label: 'رنگ بدنه', getValue: (p: any) => p.specs?.color || 'خاکستری' }
      ]
    },
    {
      groupTitle: 'پورت‌ها و درگاه‌ها',
      icon: ShieldCheck,
      rows: [
        {
          label: 'درگاه‌های ارتباطی',
          getValue: (p: any) => (
            <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
              {p.specs?.ports && p.specs.ports.length > 0 ? (
                p.specs.ports.map((port: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{port}</span>
                  </div>
                ))
              ) : (
                <span>درگاه‌های استاندارد Type-C / USB / HDMI</span>
              )}
            </div>
          ),
          raw: (p: any) => (p.specs?.ports || []).join(', ')
        }
      ]
    }
  ];

  // Number of slots to show: at least 2, up to 4
  const totalSlotsCount = Math.max(2, Math.min(4, comparedProducts.length + 1));
  const slotsIndices = Array.from({ length: totalSlotsCount }, (_, i) => i);

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-right min-h-screen transition-colors" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 mb-6 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <span>میز مقایسه تخصصی لپ‌تاپ‌های نکسورا</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1">
                مقایسه هوشمند مشخصات فنی لپ‌تاپ‌ها
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                دو یا چند لپ‌تاپ را برای مقایسه مستقیم در جایگاه‌های زیر انتخاب کنید تا مشخصات فنی، عملکرد، نمایشگر و قیمت آن‌ها را در یک نگاه بسنجید.
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {comparedProducts.length > 1 && (
                <button
                  onClick={() => setShowOnlyDifferences(prev => !prev)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    showOnlyDifferences
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{showOnlyDifferences ? 'نمایش همه مشخصات' : 'فقط نمایش تفاوت‌ها'}</span>
                </button>
              )}

              {comparedProducts.length > 0 && (
                <>
                  <button
                    onClick={handleShare}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'کپی شد!' : 'اشتراک‌گذاری'}</span>
                  </button>

                  <button
                    onClick={clearCompare}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>پاک‌سازی کامل</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick 1-Click Popular Duels */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>دوئل‌های پرطرفدار پیشنهادی:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset.id1, preset.id2)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all flex items-center gap-1.5"
                >
                  <ArrowRightLeft className="w-3 h-3 text-blue-500" />
                  <span>{preset.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Slots Grid (2 to 4 Slots) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {slotsIndices.map(slotIdx => {
            const product = comparedProducts[slotIdx];
            const isSlot1Filled = comparedProducts.length >= 1;
            const isTargetForStep2 = slotIdx === 1 && isSlot1Filled && !product;

            if (product) {
              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs flex flex-col justify-between relative group"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors z-10"
                    title="حذف از مقایسه"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    {/* Slot Index Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 px-2 py-0.5 rounded-md">
                        لپ‌تاپ شماره {toPersianDigits(slotIdx + 1)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold uppercase">
                        {product.brand}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="h-32 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-2 mb-3 flex items-center justify-center overflow-hidden">
                      <LazyImage
                        src={product.images[0]}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        wrapperClassName="w-full h-full"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate mb-2">
                      {product.englishName}
                    </p>

                    {/* Price */}
                    <div className="font-mono font-extrabold text-sm text-slate-900 dark:text-white mb-3">
                      {formatToman(product.discountPrice || product.price)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleOpenPicker(slotIdx)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>تغییر این لپ‌تاپ</span>
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>افزودن به سبد</span>
                    </button>

                    <button
                      onClick={() => navigateTo('product', product.slug)}
                      className="w-full py-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>مشاهده مشخصات کامل کالا</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            }

            // Empty Slot Card
            return (
              <motion.div
                key={`empty-slot-${slotIdx}`}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleOpenPicker(slotIdx)}
                className={`rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[340px] ${
                  isTargetForStep2
                    ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50/70 dark:hover:bg-blue-950/50 ring-4 ring-blue-100 dark:ring-blue-950/60 animate-pulse-subtle'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-850'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    isTargetForStep2
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <Plus className="w-7 h-7" />
                </div>

                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                  جایگاه {slotIdx === 0 ? 'لپ‌تاپ اول' : slotIdx === 1 ? 'لپ‌تاپ دوم' : `لپ‌تاپ ${toPersianDigits(slotIdx + 1)}`}
                </span>

                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">
                  {slotIdx === 0
                    ? '+ انتخاب لپ‌تاپ اول'
                    : slotIdx === 1
                    ? '+ انتخاب لپ‌تاپ دوم جهت مقایسه'
                    : '+ افزودن لپ‌تاپ دیگر'}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4 max-w-[200px]">
                  {isTargetForStep2
                    ? 'لپ‌تاپ اول انتخاب شده است. حالا لپ‌تاپ رقیب را برای مقایسه اضافه کنید.'
                    : 'برای انتخاب از کاتالوگ و قرار دادن در این ستون کلیک کنید.'}
                </p>

                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors ${
                    isTargetForStep2
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>انتخاب لپ‌تاپ</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Side-by-Side Spec Matrix */}
        {comparedProducts.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden mb-12">
            <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>جدول مقایسه تطبیقی جزئیات فنی</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {toPersianDigits(comparedProducts.length)} لپ‌تاپ در حال مقایسه
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                {/* Product Column Headers */}
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <th className="p-4 w-48 min-w-[180px] text-slate-500 dark:text-slate-400 font-bold bg-slate-50/50 dark:bg-slate-800/50">
                      ویژگی فنی
                    </th>
                    {comparedProducts.map((p, idx) => (
                      <th key={p.id} className="p-4 min-w-[220px] max-w-[280px] align-top bg-white dark:bg-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 border border-slate-100 dark:border-slate-700 shrink-0 overflow-hidden flex items-center justify-center">
                            <LazyImage
                              src={p.images[0]}
                              alt={p.name}
                              className="max-h-full max-w-full object-contain"
                              wrapperClassName="w-full h-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block">
                              مدل #{toPersianDigits(idx + 1)}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white truncate block text-xs">
                              {p.name}
                            </span>
                          </div>
                        </div>
                      </th>
                    ))}
                    {/* If only 1 product compared, show slot 2 action column */}
                    {comparedProducts.length === 1 && (
                      <th className="p-4 min-w-[220px] align-middle text-center bg-slate-50/40 dark:bg-slate-800/30 border-r border-dashed border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => handleOpenPicker(1)}
                          className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>افزودن لپ‌تاپ دوم به جدول</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Body Rows grouped by category */}
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {specGroups.map((group, groupIdx) => {
                    // Filter rows if showOnlyDifferences is true
                    const visibleRows = group.rows.filter(row => {
                      if (!showOnlyDifferences || comparedProducts.length < 2) return true;
                      const firstVal = row.raw ? row.raw(comparedProducts[0]) : row.getValue(comparedProducts[0]);
                      return comparedProducts.some(p => {
                        const currentVal = row.raw ? row.raw(p) : row.getValue(p);
                        return JSON.stringify(firstVal) !== JSON.stringify(currentVal);
                      });
                    });

                    if (visibleRows.length === 0) return null;

                    const GroupIcon = group.icon;

                    return (
                      <React.Fragment key={groupIdx}>
                        {/* Category Header Row */}
                        <tr className="bg-slate-100/70 dark:bg-slate-800/70 font-black text-slate-900 dark:text-white">
                          <td
                            colSpan={comparedProducts.length + 1 + (comparedProducts.length === 1 ? 1 : 0)}
                            className="py-2.5 px-4 text-xs"
                          >
                            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                              <GroupIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              <span>{group.groupTitle}</span>
                            </div>
                          </td>
                        </tr>

                        {/* Category Data Rows */}
                        {visibleRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-3.5 font-bold text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800/30 text-[11px]">
                              {row.label}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-slate-800 dark:text-slate-200">
                                {row.getValue(p)}
                              </td>
                            ))}
                            {comparedProducts.length === 1 && (
                              <td className="p-3.5 text-center text-slate-300 dark:text-slate-600 text-[11px] border-r border-dashed border-slate-200 dark:border-slate-700">
                                ---
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* When 0 products are in compare list, show guidance banner */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 text-center shadow-2xs mb-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              میز مقایسه در انتظار انتخاب شماست
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              برای شروع مقایسه، روی یکی از جایگاه‌های بالا کلیک کنید تا لپ‌تاپ اول و سپس لپ‌تاپ دوم را انتخاب نمایید، یا از دوئل‌های پرطرفدار پیشنهادی نکسورا استفاده کنید.
            </p>
            <button
              onClick={() => handleOpenPicker(0)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>انتخاب اولین لپ‌تاپ برای مقایسه</span>
            </button>
          </div>
        )}

      </div>

      {/* Product Picker Modal */}
      <CompareProductPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelectProduct={handleSelectProduct}
        slotIndex={activePickerSlot}
        currentComparedIds={compareList}
        products={products}
      />
    </div>
  );
};
