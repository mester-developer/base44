import React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones
} from 'lucide-react';

export const WhyNexoraSection: React.FC = () => {
  const trustItems = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: 'ضمانت اصالت کالا',
      desc: 'تمامی لپ‌تاپ‌ها ۱۰۰٪ اصل، پلمپ فابریک کارخانه و دارای سریال معتبر استعلام کمپانی سازنده هستند.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-emerald-600" />,
      title: '۷ روز ضمانت بازگشت',
      desc: 'امکان تست کامل دستگاه با مهلت ۷ روزه و بازگشت کامل وجه در صورت وجود هرگونه ایراد فنی یا مغایرت.'
    },
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'ارسال سریع و مطمئن',
      desc: 'تحویل اکسپرس ۲ ساعته در تهران و ارسال ۲۴ ساعته پیشتاز به سراسر کشور با بیمه کامل محموله.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-600" />,
      title: 'پشتیبانی تخصصی',
      desc: 'مشاوره فنی رایگان پیش از خرید توسط مهندسین سخت‌افزار جهت انتخاب دقیق‌ترین کانفیگ مورد نیاز.'
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            چرا خرید از نکسورا؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            تعهد ما به کیفیت، سرعت و ایجاد خریدی بدون دغدغه برای شماست
          </p>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-right flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
