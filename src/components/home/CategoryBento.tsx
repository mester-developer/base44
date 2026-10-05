import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LazyImage } from '../common/LazyImage';
import {
  Gamepad2,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronLeft
} from 'lucide-react';

export const CategoryBento: React.FC = () => {
  const { navigateTo } = useStore();

  const categories = [
    {
      id: 'gaming',
      title: 'لپ‌تاپ‌های گیمینگ',
      desc: 'قدرتمندترین کارت‌های گرافیک RTX 40 و نرخ نوسازی بالا',
      icon: <Gamepad2 className="w-5 h-5 text-rose-600" />,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
      badge: 'سری ROG و Legion'
    },
    {
      id: 'engineering',
      title: 'مهندسی و رندرینگ',
      desc: 'پردازش‌های سنگین سه‌بعدی، CAD، شبیه‌سازی و تدوین',
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80',
      badge: '۳۲ و ۶۴ گیگابایت RAM'
    },
    {
      id: 'programming',
      title: 'برنامه‌نویسی و توسعه',
      desc: 'نمایشگرهای ۱۶:۱۰ با وضوح بالا، کیبورد ارگونومیک و سرعت بالا',
      icon: <Code2 className="w-5 h-5 text-emerald-600" />,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      badge: 'مک‌بوک و تینک‌پد'
    },
    {
      id: 'student',
      title: 'دانشجویی و آموزشی',
      desc: 'شارژدهی طولانی، وزن سبک، حمل آسان و قیمت متناسب',
      icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80',
      badge: 'شارژدهی بالای ۱۰ ساعت'
    },
    {
      id: 'business',
      title: 'اداری و بیزینس',
      desc: 'طراحی شیک، سنسورهای بیومتریک و امنیت داده سازمانی',
      icon: <Briefcase className="w-5 h-5 text-slate-700" />,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80',
      badge: 'امنیت و پایداری'
    },
    {
      id: 'budget',
      title: 'اقتصادی و عمومی',
      desc: 'بیشترین ارزش خرید برای کارهای روزمره، وب‌گردی و تماشای فیلم',
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80',
      badge: 'قیمت رقابتی'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              دسته‌بندی لپ‌تاپ‌ها
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              بر اساس نوع کاربری مورد نظر خود انتخاب کنید
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>همه دسته‌ها</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all hover:shadow-xs group cursor-pointer"
            >
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>

                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                  <span>مشاهده محصولات</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Category Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700 p-1">
                <LazyImage
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  wrapperClassName="w-full h-full rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
