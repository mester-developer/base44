import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  FileText,
  Lock,
  Package,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// About Us Page
export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>داستان تولد برند نکسورا</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
            پیشگام در عرضه لپ‌تاپ‌های پرچمدار و ورک‌استیشن
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            نکسورا (NEXORA) در سال ۱۳۹۸ با هدف پایان دادن به چالش‌های خرید لپ‌تاپ‌های وارداتی، عدم تطابق کانفیگ و گارانتی‌های غیرواقعی تاسیس شد.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">رسالت و رویکرد ما</h2>
            <p className="mb-4">
              ما بر این باوریم که هر مهندس، برنامه‌نویس، طراح سه‌بعدی و گیمر شایسته دسترسی به دقیق‌ترین و پرقدرت‌ترین ابزار کاری است. به همین منظور، تمامی لپ‌تاپ‌های موجود در نکسورا با پارت‌نامبرهای رسمی کارخانه مادر، بدون دست‌کاری و پلمپ وارد کشور می‌شوند.
            </p>
            <p>
              آزمایشگاه کنترل کیفیت نکسورا (Hardware QA Lab) قبل از ارسال سفارشات، تمامی سنسورها، دمای هسته‌ها زیر لود ۱۰۰٪ و پیکسل‌های نمایشگر را تست و با برگه تاییدیه نکسورا تحویل خریدار می‌دهد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mb-1">۲۵،۰۰۰+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">لپ‌تاپ تحویل داده شده به سراسر کشور</div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mb-1">۹۸.۶٪</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">رضایت جامعه متخصصین و مشتریان</div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mb-1">۲۴ ماه</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">پشتیبانی و گارانتی طلایی بی‌قیدوشرط</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page
export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('پیام شما ثبت شد', 'کارشناسان نکسورا حداکثر تا ۲ ساعت آینده با شما تماس خواهند گرفت.', 'success');
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">تماس با نکسورا</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            تیم پشتیبانی فنی و فروش ما در ۷ روز هفته آماده پاسخگویی و ارائه مشاوره تخصصی هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">مرکز تماس و مشاوره تلفنی</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mb-1">۰۲۱-۹۱۰۰۸۸۷۷</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">۰۲۱-۸۸۲۲۳۳۴۴</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">نشانی شوروم و دفتر مرکزی</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری نکسورا، طبقه ۶، واحد ۶۰۲
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">ساعات کاری و پذیرش حضوری</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">شنبه تا چهارشنبه: ۹:۰۰ الی ۲۱:۰۰</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">پنج‌شنبه‌ها: ۹:۰۰ الی ۱۸:۰۰</p>
              </div>
            </div>
          </div>

          {/* Form - 7 cols */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">ارسال پیام یا درخواست مشاوره خرید</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: نیما شریفی"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">شماره تلفن همراه:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 font-mono text-left"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">متن پیام یا سوال سخت‌افزاری:</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="در مورد لپ‌تاپ مورد نظر، بودجه یا کانفیگ دلخواه خود بنویسید..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>ارسال پیام به واحد کارشناسی</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Page
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'آیا لپ‌تاپ‌های نکسورا اصل و با پلمپ کارخانه تحویل داده می‌شوند؟',
      a: 'بله، صد درصد. تمام لپ‌تاپ‌های عرضه شده در نکسورا با بسته‌بندی اورجینال کمپانی مادر (Asus، Apple، Lenovo و ...) وارد کشور شده و پلمپ اولیه آن‌ها در حضور مشتری یا قبل از ارسال در آزمایشگاه با هولوگرام نکسورا بیمه می‌شود.'
    },
    {
      q: 'گارانتی طلایی ۲۴ ماهه نکسورا چه مواردی را پوشش می‌دهد؟',
      a: 'این گارانتی شامل کلیه قطعات داخلی (مادربورد، پردازنده، کارت گرافیک، صفحه نمایش، رم، SSD و اسپیکرها) بوده و برخلاف گارانتی‌های متفرقه، باتری و آداپتور شارژر نیز تا ۱۲ ماه تحت پوشش کامل تعویض قطعه قرار دارند.'
    },
    {
      q: 'آیا امکان ارتقاء رم و SSD قبل از ارسال کالا وجود دارد؟',
      a: 'بله. تیم فنی نکسورا با استفاده از قطعات اورجینال سامسونگ، کروشال و کورسیر امکان ارتقاء کانفیگ را فراهم می‌کند. مهم‌تر اینکه ارتقاء توسط نکسورا هیچ‌گونه خللی در اعتبار گارانتی ۲۴ ماهه ایجاد نمی‌کند.'
    },
    {
      q: 'ارسال سفارشات چقدر زمان می‌برد؟',
      a: 'سفارشات شهر تهران با پیک اختصاصی اکسپرس ظرف کمتر از ۲ ساعت تحویل می‌شوند. برای سایر استان‌ها، ارسال از طریق تیپاکس هوایی و پست پیشتاز ۲۴ ساعته صورت می‌پذیرد.'
    },
    {
      q: 'شرایط مهلت تست ۷ روزه به چه صورت است؟',
      a: 'خریدار از لحظه دریافت فیزیکی کالا، ۷ روز کامل فرصت دارد عملکرد فنی، عدم وجود پیکسل سوخته، پایداری حرارتی و بنچمارک‌های دستگاه را بسنجد. در صورت وجود کوچک‌ترین ایراد، دستگاه تعویض یا مبلغ بدون کسر عودت داده می‌شود.'
    }
  ];

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>پاسخ به سوالات پرتکرار</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            پرسش‌های متداول خریداران
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            پاسخ سریع به ابهامات پیرامون گارانتی، ارسال و اصالت سخت‌افزار
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 overflow-hidden cursor-pointer transition-colors shadow-xs"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {openIndex === idx && (
                <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Policy Navigation Helper
const PolicyNav: React.FC<{ active: 'warranty' | 'terms' | 'privacy' | 'shipping' | 'returns' }> = ({ active }) => {
  const { navigateTo } = useStore();
  const items = [
    { id: 'warranty', label: 'گارانتی ۲۴ ماهه طلایی', icon: ShieldCheck, route: 'warranty' },
    { id: 'terms', label: 'قوانین و مقررات خرید', icon: FileText, route: 'terms' },
    { id: 'returns', label: 'رویه بازگرداندن کالا (۷ روزه)', icon: RotateCcw, route: 'returns' },
    { id: 'shipping', label: 'رویه ارسال و بسته‌بندی', icon: Truck, route: 'shipping' },
    { id: 'privacy', label: 'حریم خصوصی کاربران', icon: Lock, route: 'privacy' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.route)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/40 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Warranty Page
export const WarrantyPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyNav active="warranty" />

        <div className="text-center mb-12">
          <ShieldCheck className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            ضمانت‌نامه طلایی ۲۴ ماهه نکسورا
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            کامل‌ترین چتر حمایتی خدمات پس از فروش لپ‌تاپ در کشور با تضمین قطعات اصلی
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xl">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>شرایط و مفاد گارانتی رسمی ۲۴ ماهه نکسورا:</span>
          </h2>
          <ul className="list-disc list-inside space-y-3 pr-2 text-slate-700 dark:text-slate-300 leading-loose">
            <li>تعویض فوری قطعه معیوب با قطعات فابریک کارخانه اصلی (Asus, Apple, Lenovo, Dell, MSI) بدون اخذ هزینه دستمزد.</li>
            <li>پوشش اختصاصی باتری و شارژر فابریک تا ۱۲ ماه پس از تاریخ صدور فاکتور رسمی.</li>
            <li>تست استرس حرارتی، تمیزکاری دوره‌ای فن‌ها و کالیبراسیون نمایشگر به مدت ۲ سال به‌صورت کاملاً رایگان.</li>
            <li>پشتیبانی نرم‌افزاری، نصب درایورهای اختصاصی، آپدیت‌های ایمن بایوس و فریمور رسمی.</li>
            <li>در صورت تکرار یک ایراد فنی بیش از ۳ بار، دستگاه با مدل نو و پلمپ جایگزین خواهد شد.</li>
          </ul>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">موارد خارج از شمول گارانتی:</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              صدمات ناشی از نوسانات شدید برق فاقد محافظ، ضربه و شکستگی فیزیکی، ریختن مایعات بر روی کیبورد و دستگاه، و باز شدن پلمپ پیچ‌ها توسط مراکز غیرمجاز خارج از شبکه تخصصی نکسورا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terms & Conditions Page
export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyNav active="terms" />

        <div className="text-center mb-12">
          <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            قوانین و مقررات خرید از نکسورا
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            شفافیت در حقوق خریدار و اصول تجارت الکترونیکی طبق قوانین جمهوری اسلامی ایران
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xl">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>۱. شرایط ثبت و پردازش سفارش:</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-loose">
              ثبت سفارش در تمامی روزهای هفته و ۲۴ ساعت شبانه‌روز امکان‌پذیر است. پردازش و آماده‌سازی مرسولات در روزهای کاری (شنبه تا چهارشنبه ۹ الی ۱۸ و پنج‌شنبه ۹ الی ۱۴) انجام می‌گردد. پس از ثبت نهایی، پیامک تاییدیه حاوی شناسه سفارش و لینک پیگیری برای خریدار ارسال می‌شود.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>۲. صحت کانفیگ و اصالت فابریک قطعات:</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-loose">
              تمام لپ‌تاپ‌های عرضه شده در فروشگاه نکسورا با برچسب اصالت کالا و بدون هرگونه تعویض غیرمجاز قطعات داخلی (نظیر رم و حافظه SSD تقلبی) ارسال می‌شوند. خریدار حق دارد در مهلت تست ۷ روزه مشخصات سخت‌افزاری دستگاه را با فاکتور صادرشده مطابقت دهد.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>۳. قیمت‌گذاری و شفافیت مالی:</span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-loose">
              قیمت درج شده در نکسورا قطعی و نهایی است و هیچ‌گونه هزینه اضافه بابت مالیات پنهان، بسته‌بندی یا گارانتی پایه از مشتری دریافت نمی‌شود. تغییرات نرخ ارز بر سفارشاتی که وجه آن‌ها نهایی شده تاثیری نخواهد داشت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Returns Policy Page (7 Days Guarantee)
export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyNav active="returns" />

        <div className="text-center mb-12">
          <RotateCcw className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            رویه بازگرداندن کالا و مهلت تست ۷ روزه
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            تضمین بازگشت وجه یا تعویض آنی کالا در صورت وجود کوچک‌ترین مغایرت یا نقص فنی
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xl">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
              خریدار تا ۷ روز تقویمی پس از تحویل مرسوله فرصت دارد تا عملکرد فنی لپ‌تاپ را بررسی کند. در صورت وجود ایراد فنی سخت‌افزاری یا مغایرت با کانفیگ اعلامی، نکسورا بدون هیچ هزینه‌ای کالا را مرجوع می‌نماید.
            </p>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-white">مراحل استرداد یا تعویض کالا:</h2>
          <ol className="list-decimal list-inside space-y-3 pr-2 text-slate-700 dark:text-slate-300 leading-loose">
            <li>تماس با کارشناسان فنی نکسورا از طریق شماره ۰۲۱-۹۱۰۰۸۸۷۷ یا ثبت تیکت پشتیبانی در پنل کاربری.</li>
            <li>بسته‌بندی دستگاه به همراه تمام متعلقات، جعبه اصلی، آداپتور، کابل‌ها و فاکتور خرید.</li>
            <li>ارسال کالا از طریق پیک اختصاصی (در تهران) یا پست پیشتاز/تیپاکس به آدرس دفتر مرکزی نکسورا (هزینه ارسال بر عهده نکسورا می‌باشد).</li>
            <li>بررسی فنی کالا توسط کارشناسان در کمتر از ۲۴ ساعت کاری.</li>
            <li>واریز کل مبلغ به شماره شبای خریدار یا ارسال فوری دستگاه نو و بدون نقص.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

// Shipping Policy Page
export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyNav active="shipping" />

        <div className="text-center mb-12">
          <Truck className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            رویه ارسال، بسته‌بندی و تحویل سفارشات
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            ارسال سریع، بسته‌بندی ۵ لایه ضدضربه با پوشش بیمه ۱۰۰ درصدی ارزش محموله
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">تحویل اکسپرس تهران (کمتر از ۳ ساعت)</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              سفارشات ثبت‌شده تا ساعت ۱۷ در شهر تهران با پیک ویژه امن نکسورا تحویل خریدار می‌گردد. امکان پرداخت در محل و بررسی پلمپ جعبه در حضور سفیر فراهم است.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">ارسال هوایی و تیپاکس به سراسر کشور</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              ارسال به تمام مراکز استان‌ها ظرف ۲۴ ساعت و سایر شهرستان‌ها ظرف ۴۸ ساعت کاری با کد رهگیری آنلاین و پیامک لحظه‌ای انجام می‌پذیرد.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4 shadow-xl">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">استاندارد بسته‌بندی فوق امن نکسورا:</h3>
          <p className="leading-loose text-slate-700 dark:text-slate-300">
            تمام لپ‌تاپ‌ها ابتدا با نایلون‌های حباب‌دار صنعتی ۵ لایه ضد ضربه محافظت شده و سپس در کارتن‌های ضخیم پلمپ و با برچسب امنیتی «حساس به ضربه و شکستنی» پلمپ می‌شوند. تمامی مرسولات پیش از ارسال، تحت بیمه ۱۰۰٪ شرکت‌های حمل‌ونقل رسمی قرار می‌گیرند.
          </p>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PolicyNav active="privacy" />

        <div className="text-center mb-12">
          <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            حریم خصوصی و امنیت اطلاعات کاربران
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            تعهد خلل‌ناپذیر نکسورا به حراست از اطلاعات شخصی، هویتی و مالی شما
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xl">
          <p className="leading-loose">
            فروشگاه نکسورا به حریم خصوصی کاربران خود نهایت احترام را قائل است. اطلاعات هویتی و پستی جمع‌آوری‌شده (نظیر شماره تماس، آدرس پستی و نام) منحصراً برای فرآیند پردازش، صدور فاکتور رسمی و ارسال سفارشات پستی استفاده می‌شود.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">امنیت درگاه پرداخت و اطلاعات بانکی:</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-loose">
              کلیه تراکنش‌های مالی نکسورا از طریق بستر شبکه الکترونیکی پرداخت کارت (شاپرک) و با رمزنگاری پیشرفته SSL صورت می‌گیرد. نکسورا به هیچ‌یک از اطلاعات حساس کارت بانکی، رمز دوم یا CVV2 خریداران دسترسی نداشته و ذخیره‌سازی نمی‌کند.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">عدم اشتراک‌گذاری با اشخاص ثالث:</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-loose">
              نکسورا متعهد است اطلاعات محرمانه کاربران را تحت هیچ شرایطی به شرکت‌های تبلیغاتی یا اشخاص ثالث واگذار نکند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
