import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BlogPost } from '../../types';
import { BookOpen, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { toPersianDigits } from '../../utils/persian';

export const AdminBlog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('تیم تحریریه نکسورا');
  const [readTime, setReadTime] = useState('۵ دقیقه');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('راهنمای خرید');
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setAuthor('تیم تحریریه نکسورا');
    setReadTime('۵ دقیقه');
    setCoverImage('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80');
    setContent('');
    setCategory('راهنمای خرید');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setAuthor(typeof post.author === 'object' ? post.author.name : post.author);
    setReadTime(post.readingTime || post.readTime || '۵ دقیقه');
    setCoverImage(post.coverImage);
    setContent(Array.isArray(post.content) ? post.content.join('\n\n') : (post.content || ''));
    setCategory(post.category);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('عنوان مقاله الزامی است.');
      return;
    }

    const safeSlug = slug.trim().toLowerCase().replace(/\s+/g, '-') || 'post-' + Date.now();
    const formattedAuthor = {
      name: author.trim() || 'نویسنده نکسورا',
      role: 'کارشناس فناوری',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };
    const contentParagraphs = content.trim().split('\n\n').filter(Boolean);

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: title.trim(),
        slug: safeSlug,
        excerpt: excerpt.trim(),
        author: formattedAuthor,
        readingTime: readTime.trim() || '۵ دقیقه',
        readTime: readTime.trim() || '۵ دقیقه',
        coverImage: coverImage.trim() || editingPost.coverImage || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        content: contentParagraphs.length ? contentParagraphs : [content.trim()],
        category
      });
    } else {
      addBlogPost({
        id: 'blog-' + Date.now(),
        title: title.trim(),
        slug: safeSlug,
        excerpt: excerpt.trim() || title.trim(),
        author: formattedAuthor,
        date: new Date().toLocaleDateString('fa-IR'),
        readingTime: readTime.trim() || '۵ دقیقه',
        readTime: readTime.trim() || '۵ دقیقه',
        coverImage: coverImage.trim() || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        content: contentParagraphs.length ? contentParagraphs : [content.trim() || excerpt.trim() || title.trim()],
        category,
        tags: ['لپ‌تاپ', category]
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, postTitle: string) => {
    if (window.confirm(`آیا از حذف مقاله "${postTitle}" اطمینان دارید؟`)) {
      deleteBlogPost(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت مقالات و وبلاگ نکسورا ({toPersianDigits(blogPosts.length)} مقاله)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            انتشار مقالات بررسی فنی، راهنمای خرید و جدیدترین اخبار سخت‌افزار.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>نگارش مقاله جدید</span>
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogPosts.map(post => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs hover:border-purple-300 dark:hover:border-purple-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-bold backdrop-blur-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-2 font-mono">
                  <span>{post.date}</span>
                  <span>زمان مطالعه: {post.readingTime || post.readTime}</span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                نویسنده: {typeof post.author === 'object' ? post.author.name : post.author}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(post)}
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                  title="ویرایش"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Blog Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingPost ? 'ویرایش مقاله وبلاگ' : 'نگارش مقاله و مطلب جدید'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  عنوان مقاله: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثلاً راهنمای انتخاب بهترین لپ‌تاپ برنامه‌نویسی در سال ۲۰۲۵"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">دسته‌بندی مطلب:</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  >
                    <option value="راهنمای خرید">راهنمای خرید</option>
                    <option value="بررسی تخصصی">بررسی تخصصی</option>
                    <option value="آموزش و ترفند">آموزش و ترفند</option>
                    <option value="اخبار سخت‌افزار">اخبار سخت‌افزار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">نام نویسنده:</label>
                  <input
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="نام نویسنده..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">تصویر کاور (URL):</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">چکیده و خلاصه کوتاه:</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="توضیح دو خطی برای پیش‌نمایش در کارت مقاله..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">متن کامل مقاله:</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="پاراگراف‌های مقاله را با یک خط خالی از هم جدا کنید..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                >
                  {editingPost ? 'ذخیره تغییرات مقاله' : 'انتشار مقاله'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
