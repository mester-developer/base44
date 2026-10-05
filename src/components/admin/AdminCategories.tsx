import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryItem } from '../../types';
import { FolderTree, Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { toPersianDigits } from '../../utils/persian';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [name, setName] = useState('');
  const [nameFa, setNameFa] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setNameFa('');
    setSlug('');
    setDescription('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setNameFa(cat.nameFa);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !nameFa.trim()) {
      setErrorMsg('نام و عنوان فارسی دسته‌بندی الزامی است.');
      return;
    }

    const safeSlug = slug.trim().toLowerCase().replace(/\s+/g, '-') || name.trim().toLowerCase();

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: name.trim(),
        nameFa: nameFa.trim(),
        slug: safeSlug,
        description: description.trim()
      });
    } else {
      addCategory({
        id: 'cat-' + Date.now(),
        name: name.trim(),
        nameFa: nameFa.trim(),
        slug: safeSlug,
        icon: 'Folder',
        description: description.trim()
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (catId: string, catName: string) => {
    if (window.confirm(`آیا از حذف دسته‌بندی "${catName}" اطمینان دارید؟`)) {
      deleteCategory(catId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت دسته‌بندی‌های لپ‌تاپ ({toPersianDigits(categories.length)} دسته)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            دسته‌بندی‌های موضوعی محصولات جهت فیلتر و جستجوی آسان‌تر خریداران.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن دسته‌بندی جدید</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:border-purple-300 dark:hover:border-purple-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-md font-bold border border-purple-100 dark:border-purple-900">
                  {cat.slug}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
                    title="ویرایش"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.nameFa)}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {cat.nameFa} ({cat.name})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px]">
                {cat.description || 'توضیحات دسته‌بندی'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingCategory ? 'ویرایش دسته‌بندی' : 'تعریف دسته‌بندی جدید'}
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
                  نام انگلیسی (لاتین): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثلاً Gaming Laptops"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  عنوان فارسی دسته‌بندی: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameFa}
                  onChange={e => setNameFa(e.target.value)}
                  placeholder="مثلاً لپ‌تاپ‌های گیمینگ و بازی"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">نامک (Slug):</label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="مثلاً gaming"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">توضیحات کوتاه:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="توضیح کوتاه کاربرد این دسته‌بندی..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
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
                  {editingCategory ? 'ذخیره تغییرات' : 'افزودن دسته‌بندی'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
