import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LazyImage } from '../common/LazyImage';
import { Clock, ChevronLeft } from 'lucide-react';

export const BlogPreviewSection: React.FC = () => {
  const { navigateTo, blogPosts } = useStore();

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              مجله تخصصی سخت‌افزار
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              راهنماهای خرید، نقد و بررسی و مقایسه جدیدترین پردازنده‌ها و کارت‌های گرافیک
            </p>
          </div>

          <button
            onClick={() => navigateTo('blog')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>همه مقالات</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map(post => (
            <article
              key={post.id}
              onClick={() => navigateTo('blog-post', post.slug)}
              className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 p-4 transition-all hover:shadow-2xs cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                  <LazyImage
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 dark:text-slate-200 shadow-2xs z-2">
                    {post.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                <span>مطالعه مقاله</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
