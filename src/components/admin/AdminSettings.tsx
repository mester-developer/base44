import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Settings, Save, CheckCircle2, Store, Phone, Mail, MapPin, Truck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { storeSettings, updateStoreSettings } = useStore();

  const [storeName, setStoreName] = useState(storeSettings.storeName);
  const [phone, setPhone] = useState(storeSettings.phone);
  const [email, setEmail] = useState(storeSettings.email);
  const [address, setAddress] = useState(storeSettings.address);
  const [shippingFee, setShippingFee] = useState(storeSettings.shippingFee.toString());
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    storeSettings.freeShippingThreshold.toString()
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateStoreSettings({
      storeName: storeName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      shippingFee: Number(shippingFee) || 0,
      freeShippingThreshold: Number(freeShippingThreshold) || 0
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>تنظیمات عمومی فروشگاه نکسورا</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            پیکربندی اطلاعات تماس، نام تجاری، هزینه‌های پستی و سقف ارسال رایگان.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>تنظیمات فروشگاه با موفقیت ذخیره گردید و در سامانه اعمال شد.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5 text-xs">
        {/* Brand & Store Name */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>نام فروشگاه / برند:</span>
          </label>
          <input
            type="text"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
            required
          />
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>شماره تلفن پشتیبانی:</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>پست الکترونیک رسمی:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
              required
            />
          </div>
        </div>

        {/* Physical Address */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>نشانی فیزیکی دفتر مرکزی / فروشگاه:</span>
          </label>
          <textarea
            rows={2}
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
            required
          />
        </div>

        {/* Shipping settings */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>تنظیمات ارسال و تعرفه پستی:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                هزینه ثابت ارسال عادی (تومان):
              </label>
              <input
                type="number"
                value={shippingFee}
                onChange={e => setShippingFee(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                سقف خرید برای ارسال رایگان (تومان):
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={e => setFreeShippingThreshold(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره کلیه تنظیمات فروشگاه</span>
          </button>
        </div>
      </form>
    </div>
  );
};
