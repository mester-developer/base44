import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('خطا در ثبت ایمیل', 'لطفاً یک آدرس ایمیل معتبر وارد فرمایید.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('عضویت موفق', 'ایمیل شما با موفقیت در خبرنامه تخفیف‌های ویژه نکسورا ثبت شد.', 'success');
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 text-right">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border border-cyan-800/40 shadow-2xl overflow-hidden text-center">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              عضویت در باشگاه مشتریان VIP نکسورا
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              از ورود جدیدترین پارت‌نامبرهای لپ‌تاپ‌های گیمینگ، افت قیمت‌های لحظه‌ای و کدهای تخفیف اختصاصی پیش از دیگران باخبر شوید.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>سپاس! ایمیل شما با موفقیت به جمع مشترکین نکسورا پیوست.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="آدرس ایمیل خود را وارد نمایید..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-right"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-98"
                >
                  <span>عضویت آنی</span>
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ما به حریم خصوصی شما احترام می‌گذاریم؛ ارسال پیام تنها برای تخفیف‌های ویژه و واقعی.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
