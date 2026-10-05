import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LazyImage } from '../components/common/LazyImage';
import { BookOpen, Clock, ChevronLeft } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const { navigateTo, blogPosts } = useStore();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'راهنمای خرید', label: 'راهنمای خرید' },
    { id: 'معماری سخت‌افزار', label: 'معماری سخت‌افزار' },
    { id: 'هوش مصنوعی', label: 'هوش مصنوعی و NPU' },
    { id: 'بررسی تخصصی', label: 'بررسی تخصصی' }
  ];

  const filteredPosts = selectedCat === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCat);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مجله تخصصی فناوری و سخت‌افزار نکسورا</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            تحلیل عمیق، بنچمارک و راهنماهای خرید لپ‌تاپ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            دانش فنی به‌روز دنیای پردازنده‌ها، گرافیک‌ها و نوآوری‌های کامپیوترهای همراه توسط تیم کارشناسی نکسورا
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCat === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => navigateTo('blog-post', post.slug)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <LazyImage
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-[11px] font-bold text-blue-700 dark:text-blue-300 shadow-2xs border border-blue-100 dark:border-blue-900/50 z-2">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-[11px] mb-2.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{post.readingTime} مطالعه</span>
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LazyImage
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    wrapperClassName="w-7 h-7 rounded-full overflow-hidden"
                    fallbackIconType="image"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{post.author.name}</span>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                  <span>مطالعه کامل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
