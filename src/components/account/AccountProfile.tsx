import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { User, Mail, Phone, Calendar, Shield, Camera, Check, Edit2, AlertCircle } from 'lucide-react';

export const AccountProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('نام و نام خانوادگی نمی‌تواند خالی باشد.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('لطفاً یک آدرس ایمیل معتبر وارد فرمایید.');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMsg('لطفاً شماره تلفن همراه معتبر وارد فرمایید.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phone: phone.trim(),
        avatar: avatarUrl.trim() || undefined
      });

      if (res.success) {
        setIsEditing(false);
        showToast('به‌روزرسانی اطلاعات', 'مشخصات حساب کاربری شما با موفقیت ذخیره شد.', 'success');
      } else {
        setErrorMsg(res.error || 'خطا در ذخیره‌سازی اطلاعات.');
      }
    } catch {
      setErrorMsg('خطایی در برقراری ارتباط رخ داد.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setAvatarUrl(user?.avatar || '');
    setErrorMsg('');
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">مشخصات و اطلاعات هویتی</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            اطلاعات ثبت‌شده جهت صدور فاکتور و ارسال سفارش‌ها استفاده می‌شود.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>ویرایش اطلاعات</span>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-2xl overflow-hidden shadow-inner">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user?.firstName} className="w-full h-full object-cover" />
              ) : (
                user?.firstName?.charAt(0) || 'ک'
              )}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              تصویر نمایه (آواتار)
            </div>
            {isEditing ? (
              <input
                type="url"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                placeholder="آدرس اینترنتی تصویر (URL)..."
                className="w-full max-w-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-mono text-left"
              />
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500">تصویر حساب کاربری نکسورا</p>
            )}
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* First Name */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              نام:
            </label>
            <div className="relative">
              <input
                type="text"
                disabled={!isEditing}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 disabled:bg-slate-50/50 dark:disabled:bg-slate-800/50 border border-slate-200 dark:border-slate-700 disabled:border-slate-100 dark:disabled:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white disabled:text-slate-700 dark:disabled:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              نام خانوادگی:
            </label>
            <div className="relative">
              <input
                type="text"
                disabled={!isEditing}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 disabled:bg-slate-50/50 dark:disabled:bg-slate-800/50 border border-slate-200 dark:border-slate-700 disabled:border-slate-100 dark:disabled:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white disabled:text-slate-700 dark:disabled:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                required
              />
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              پست الکترونیک (ایمیل):
            </label>
            <div className="relative">
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 disabled:bg-slate-50/50 dark:disabled:bg-slate-800/50 border border-slate-200 dark:border-slate-700 disabled:border-slate-100 dark:disabled:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white disabled:text-slate-700 dark:disabled:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-colors font-mono text-left"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              شماره تلفن همراه:
            </label>
            <div className="relative">
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 disabled:bg-slate-50/50 dark:disabled:bg-slate-800/50 border border-slate-200 dark:border-slate-700 disabled:border-slate-100 dark:disabled:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white disabled:text-slate-700 dark:disabled:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-colors font-mono text-left"
                required
              />
              <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Read-only Account Meta Info */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>تاریخ عضویت در نکسورا:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{user?.createdAt || '۱۴۰۳/۰۵/۰۱'}</span>
          </div>

          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>نقش و سطح دسترسی:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {user?.role === 'admin' ? 'مدیر ارشد فروشگاه' : 'کاربر ویژه و تأییدشده'}
            </span>
          </div>
        </div>

        {/* Edit Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
