import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import {
  User,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, isAuthenticated, isAdmin } = useAuth();
  const { navigateTo, showToast, currentRoute, routeParam } = useStore();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(() => {
    if (currentRoute === 'register') return 'register';
    if (currentRoute === 'forgot-password') return 'forgot-password';
    if (routeParam === 'register') return 'register';
    if (routeParam === 'forgot-password') return 'forgot-password';
    return initialMode;
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigateTo('admin');
      } else {
        navigateTo('account');
      }
    }
  }, [isAuthenticated, isAdmin, navigateTo]);

  // Update mode if route changes
  useEffect(() => {
    if (currentRoute === 'register' || routeParam === 'register') {
      setMode('register');
    } else if (currentRoute === 'forgot-password' || routeParam === 'forgot-password') {
      setMode('forgot-password');
    } else if (currentRoute === 'login' || routeParam === 'login') {
      setMode('login');
    }
  }, [currentRoute, routeParam]);

  // Form Fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Forgot Password Fields
  const [resetEmailOrPhone, setResetEmailOrPhone] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Validation / Error States
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('لطفاً ایمیل، شماره موبایل یا نام کاربری را وارد فرمایید.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('لطفاً رمز عبور خود را وارد فرمایید.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(identifier, password);
      if (res.success && res.user) {
        showToast('ورود موفقیت‌آمیز', `خوش آمدید، ${res.user.firstName} عزیز.`, 'success');
        if (res.user.role === 'admin') {
          navigateTo('admin');
        } else {
          navigateTo('account');
        }
      } else {
        setErrorMessage(res.error || 'نام کاربری یا رمز عبور اشتباه است.');
      }
    } catch {
      setErrorMessage('خطایی در ارتباط با سامانه رخ داد.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Register handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('لطفاً نام و نام خانوادگی خود را کامل وارد نمایید.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('لطفاً یک آدرس ایمیل معتبر وارد نمایید.');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMessage('لطفاً شماره تلفن همراه معتبر (۱۱ رقم) وارد فرمایید.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('رمز عبور باید حداقل شامل ۸ کاراکتر باشد.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('رمز عبور و تکرار آن با یکدیگر مطابقت ندارند.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        phone,
        password
      });

      if (res.success && res.user) {
        showToast('عضویت موفق', 'حساب کاربری شما با موفقیت ایجاد شد.', 'success');
        navigateTo('account');
      } else {
        setErrorMessage(res.error || 'خطا در فرآیند ثبت‌نام. لطفاً مجدداً تلاش کنید.');
      }
    } catch {
      setErrorMessage('خطایی در فرآیند ثبت‌نام رخ داد.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot password handler
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!resetEmailOrPhone.trim()) {
      setErrorMessage('لطفاً ایمیل یا شماره همراه خود را وارد کنید.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResetSent(true);
      showToast('لینک ارسال شد', 'دستورالعمل بازیابی رمز عبور به آدرس شما ارسال گردید.', 'success');
    }, 600);
  };

  // Demo Credentials quick fills
  const handleDemoAdmin = async () => {
    setIsSubmitting(true);
    const res = await login('admin', 'admin');
    setIsSubmitting(false);
    if (res.success) {
      showToast('ورود مدیر سیستم', 'با موفقیت با حساب مدیر وارد شدید.', 'success');
      navigateTo('admin');
    }
  };

  const handleDemoUser = async () => {
    setIsSubmitting(true);
    const res = await login('mohammad@nexora.ir', 'user123');
    setIsSubmitting(false);
    if (res.success) {
      showToast('ورود کاربر نمونه', 'با موفقیت با حساب محمد نجفی وارد شدید.', 'success');
      navigateTo('account');
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-[85vh] flex items-center justify-center text-right px-4">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative">
        
        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400 shadow-inner">
            {mode === 'login' ? (
              <User className="w-6 h-6" />
            ) : mode === 'register' ? (
              <ShieldCheck className="w-6 h-6" />
            ) : (
              <KeyRound className="w-6 h-6" />
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1">
            {mode === 'login' && 'ورود به حساب کاربری نکسورا'}
            {mode === 'register' && 'ایجاد حساب کاربری جدید'}
            {mode === 'forgot-password' && 'بازیابی رمز عبور'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && 'برای دسترسی به سفارش‌ها و سبد خرید خود وارد شوید.'}
            {mode === 'register' && 'با ایجاد حساب، از خدمات اختصاصی و رهگیری سفارش بهره‌مند شوید.'}
            {mode === 'forgot-password' && 'ایمیل یا شماره همراه خود را برای بازیابی رمز عبور وارد نمایید.'}
          </p>
        </div>

        {/* Tab Switcher for Login / Register */}
        {mode !== 'forgot-password' && (
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                navigateTo('login');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ورود به حساب
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                navigateTo('register');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ثبت‌نام کاربر جدید
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                ایمیل، شماره موبایل یا نام کاربری:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="مثلاً mohammad@nexora.ir یا 09123456789 یا admin"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                  required
                />
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                  رمز عبور:
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot-password');
                    setErrorMessage('');
                    navigateTo('forgot-password');
                  }}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد نمایید"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors font-mono text-left"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors mt-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'در حال ورود...' : 'ورود به حساب نکسورا'}</span>
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  نام: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="مثلاً علی"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  نام خانوادگی: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="مثلاً محمدی"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                آدرس ایمیل: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors text-left font-mono"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                شماره تلفن همراه: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors font-mono text-left"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                رمز عبور (حداقل ۸ کاراکتر): <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="حداقل ۸ کاراکتر"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors font-mono text-left"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                تکرار رمز عبور: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors font-mono text-left"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors mt-3 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'در حال ایجاد حساب...' : 'ثبت‌نام و ورود به نکسورا'}</span>
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot-password' && (
          <div className="space-y-4 text-xs">
            {resetSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  لینک بازیابی ارسال گردید
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  دستورالعمل تنظیم مجدد رمز عبور به آدرس یا شماره وارد شده ارسال گردید. لطفاً صندوق ورودی خود را بررسی فرمایید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setMode('login');
                    navigateTo('login');
                  }}
                  className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                >
                  بازگشت به صفحه ورود
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    ایمیل یا شماره تلفن همراه:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={resetEmailOrPhone}
                      onChange={e => setResetEmailOrPhone(e.target.value)}
                      placeholder="ایمیل یا شماره موبایل خود را وارد نمایید"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 transition-colors font-mono text-left"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>{isSubmitting ? 'در حال ارسال...' : 'ارسال لینک بازیابی رمز عبور'}</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage('');
                      navigateTo('login');
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
                  >
                    بازگشت به ورود
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* DEMO ACCOUNTS HELPER BOX */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2.5 text-center flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ورود سریع آزمایشی (بدون نیاز به تایپ)</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoUser}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 text-right transition-colors group"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                حساب کاربر عادی
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                mohammad@nexora.ir
              </div>
            </button>

            <button
              type="button"
              onClick={handleDemoAdmin}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-purple-50/70 dark:hover:bg-purple-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-800 text-right transition-colors group"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-1">
                <span>مدیر سیستم (Admin)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                admin / admin
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
