import React from 'react';
import { useStore } from '../context/StoreContext';
import { LazyImage } from '../components/common/LazyImage';
import { Clock, Calendar, ChevronLeft, Share2, CheckCircle2 } from 'lucide-react';

interface BlogPostPageProps {
  slug?: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const { navigateTo, showToast, blogPosts } = useStore();

  const post = blogPosts.find(p => p.slug === slug || p.id === slug) || blogPosts[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('لینک کپی شد', 'آدرس این مقاله در حافظه کلیپ‌بورد کپی شد.', 'success');
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">صفحه اصلی</button>
          <span>/</span>
          <button onClick={() => navigateTo('blog')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">مجله نکسورا</button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-xs">{post.title}</span>
        </div>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
            {post.category}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <LazyImage
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                wrapperClassName="w-10 h-10 rounded-full overflow-hidden"
                fallbackIconType="image"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{post.author.name}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{post.readingTime} مطالعه</span>
              </div>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="اشتراک‌گذاری"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200/90 dark:border-slate-800 shadow-2xs aspect-16/9 max-h-[440px] bg-slate-100 dark:bg-slate-800">
          <LazyImage
            src={post.coverImage}
            alt={post.title}
            priority={true}
            className="w-full h-full object-cover"
            wrapperClassName="w-full h-full"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xs space-y-6">
          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-loose border-b border-slate-100 dark:border-slate-800 pb-5">
            {post.excerpt}
          </p>

          {/* Key Points Box */}
          <div className="p-5 sm:p-6 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100/90 dark:border-blue-900/50 space-y-3">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>نکات کلیدی این بررسی سخت‌افزاری</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pr-2">
              <li>تفاوت عملکرد معماری‌های هیبریدی در بارهای کاری رندرینگ و گیمینگ</li>
              <li>تاثیر فرکانس حافظه RAM در استخراج راندمان کارت‌های گرافیک سری RTX 40</li>
              <li>نقش سیستم خنک‌کننده محفظه بخار در حفظ فرکانس بوست مداوم بدون Thermal Throttling</li>
            </ul>
          </div>

          <div className="text-slate-700 dark:text-slate-300 leading-loose text-sm sm:text-base space-y-4 whitespace-pre-line">
            {Array.isArray(post.content)
              ? post.content.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))
              : post.content}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">برچسب‌ها:</span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-xs transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Back to Blog Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('blog')}
            className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-2xs border border-transparent dark:border-slate-700"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span>مشاهده سایر مقالات و راهنماهای نکسورا</span>
          </button>
        </div>

      </div>
    </div>
  );
};
