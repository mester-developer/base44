import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LazyImage } from '../common/LazyImage';
import {
  Cpu,
  Monitor,
  Zap,
  Feather,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ProductStorySection: React.FC = () => {
  const { navigateTo } = useStore();
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const specs = [
    {
      id: 0,
      title: 'پردازنده قدرتمند نسل جدید',
      subtitle: 'معماری هایبرید با هوش مصنوعی اختصاصی (NPU)',
      desc: 'پردازنده‌های پرچمدار با حداکثر ۲۴ هسته پردازشی و فرکانس کاری تا ۵.۸ گیگاهرتز جهت اجرای روان سنگین‌ترین برنامه‌های شبیه‌سازی، مهندسی و رندرینگ سه‌بعدی.',
      stat: '۲۴ هسته',
      label: 'پردازش همزمان',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
      icon: <Cpu className="w-5 h-5 text-blue-600" />
    },
    {
      id: 1,
      title: 'نمایشگر چشم‌نواز Mini-LED',
      subtitle: 'دقت رنگ ۱۰۰٪ DCI-P3 و نرخ نوسازی ۲۴۰ هرتز',
      desc: 'وضوح تصویر فوق‌العاده با حداکثر روشنایی ۱۱۰۰ نیت و پشتیبانی کامل از HDR، ایده‌آل برای طراحان گرافیک، ادیتورهای ویدیو و گیمرهای حرفه‌ای.',
      stat: '۲۴۰Hz',
      label: 'رفرش‌ریت پنل',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
      icon: <Monitor className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 2,
      title: 'شتاب‌دهنده گرافیکی RTX 40',
      subtitle: 'فناوری DLSS 3.5 و هسته‌های ردیابی پرتو (Ray Tracing)',
      desc: 'توان گرافیکی خالص تا ۱۷۵ وات همراه با حافظه پرسرعت GDDR6X برای بالاترین نرخ فریم ممکن در بازی‌های AAA و خروجی بلادرنگ پروژه‌ها.',
      stat: '۱۷۵W TGP',
      label: 'توان گرافیکی',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      icon: <Zap className="w-5 h-5 text-amber-600" />
    },
    {
      id: 3,
      title: 'شاسی آلومینیومی مستحکم و باریک',
      subtitle: 'تراش خورده با فرز دقیق CNC با حداقل وزن',
      desc: 'مهندسی دقیق بدنه با مقاومت در برابر فشار و خمش، با ضخامت کمتر از ۱۶ میلی‌متر و وزن متعادل که حمل آن در رفت‌وآمدهای روزانه را آسان می‌سازد.',
      stat: '۱۶ میلی‌متر',
      label: 'ضخامت شاسی',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      icon: <Feather className="w-5 h-5 text-emerald-600" />
    }
  ];

  const active = specs[selectedSpec];

  return (
    <section className="py-16 bg-slate-100/70 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
            معماری و مهندسی پیشرفته
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            قدرت و ظرافت در یک نگاه
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ترکیب استثنایی مهندسی سخت‌افزار، سیستم خنک‌کننده نوآورانه و بالاترین راندمان پردازشی در لپ‌تاپ‌های منتخب نکسورا
          </p>
        </div>

        {/* Studio Showcase & Spec Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Studio Image & Spec Visual Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
              <span>{active.title}</span>
            </div>

            <div className="relative w-full h-[260px] sm:h-[320px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800 my-3">
              <LazyImage
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover rounded-xl transition-all duration-500 hover:scale-105"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white pointer-events-none z-2">
                <span className="text-xs text-blue-300 font-bold mb-1">{active.label}</span>
                <span className="text-xl sm:text-2xl font-black font-mono">{active.stat}</span>
              </div>
            </div>

            <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                تست و تایید شده توسط تیم فنی نکسورا
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">NEXORA PRO SELECTION</span>
            </div>
          </div>

          {/* 4 Specifications List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {specs.map((item, index) => {
              const isSelected = selectedSpec === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSpec(index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-right ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-50 dark:bg-blue-950/80' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        {item.icon}
                      </div>
                      <h3 className={`text-sm font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'}`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="text-left font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      {item.stat}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1 mr-8">
                    {item.subtitle}
                  </div>

                  {isSelected && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 mr-8 animate-in fade-in duration-200">
                      {item.desc}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => navigateTo('shop')}
              className="mt-2 w-full py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <span>مشاهده و سفارش لپ‌تاپ‌های این رده</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
