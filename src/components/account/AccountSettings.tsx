import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Bell,
  ShieldCheck
} from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { user, changePassword } = useAuth();
  const { showToast } = useStore();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preference Toggles
  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(true);
  const [orderStatusSms, setOrderStatusSms] = useState(true);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword) {
      setErrorMsg('لطفاً رمز عبور فعلی خود را وارد فرمایید.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg('رمز عبور جدید باید حداقل ۸ کاراکتر باشد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('تکرار رمز عبور جدید با آن همخوانی ندارد.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        setSuccessMsg('رمز عبور شما با موفقیت تغییر یافت.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showToast('تغییر رمز عبور', 'رمز عبور جدید با موفقیت اعمال شد.', 'success');
      } else {
        setErrorMsg(res.error || 'رمز عبور فعلی نادرست است.');
      }
    } catch {
      setErrorMsg('خطایی در فرآیند تغییر رمز عبور رخ داد.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Change Form */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="pb-5 border-b border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-600" />
            <span>تغییر رمز عبور حساب کاربری</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            جهت حفظ امنیت حساب خود، رمز عبور پیچیده‌ای شامل حروف، اعداد و نمادها انتخاب کنید.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4 text-xs">
          {/* Current Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              رمز عبور فعلی: <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="رمز عبور کنونی خود را وارد نمایید"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono text-left"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              رمز عبور جدید (حداقل ۸ کاراکتر): <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="حداقل ۸ کاراکتر لاتین"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono text-left"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              تکرار رمز عبور جدید: <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="رمز عبور جدید را مجدداً وارد فرمایید"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono text-left"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? 'در حال ثبت تغییرات...' : 'به‌روزرسانی رمز عبور'}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="pb-5 border-b border-slate-100 mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>تنظیمات اعلان‌ها و پیامک‌ها</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            انتخاب کنید چه پیام‌ها و هشدارهایی برای شما ارسال شوند.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-bold text-slate-900">پیامک تغییر وضعیت سفارش</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                اطلاع‌رسانی پیامکی در زمان آماده‌سازی و ارسال بسته پستی
              </div>
            </div>
            <input
              type="checkbox"
              checked={orderStatusSms}
              onChange={e => setOrderStatusSms(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-bold text-slate-900">پیامک جشنواره‌ها و تخفیف‌های ویژه</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                دریافت کدهای تخفیف اختصاصی مناسبتی نکسورا
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsNotification}
              onChange={e => setSmsNotification(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="font-bold text-slate-900">خبرنامه هفتگی مقالات سخت‌افزار و لپ‌تاپ</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                ارسال جدیدترین بررسی‌های تخصصی لپ‌تاپ‌ها به ایمیل
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailNewsletter}
              onChange={e => setEmailNewsletter(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
