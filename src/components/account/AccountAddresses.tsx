import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { UserAddress } from '../../types';
import { MapPin, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, Phone, User } from 'lucide-react';

export const AccountAddresses: React.FC = () => {
  const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { showToast } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState<UserAddress | null>(null);

  // Form Fields
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [fullAddress, setFullAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingAddr(null);
    setRecipientName(user ? `${user.firstName} ${user.lastName}` : '');
    setPhone(user?.phone || '');
    setProvince('تهران');
    setCity('تهران');
    setFullAddress('');
    setPostalCode('');
    setIsDefault(user?.addresses?.length === 0);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (addr: UserAddress) => {
    setEditingAddr(addr);
    setRecipientName(addr.recipientName);
    setPhone(addr.phone);
    setProvince(addr.province);
    setCity(addr.city);
    setFullAddress(addr.fullAddress);
    setPostalCode(addr.postalCode);
    setIsDefault(!!addr.isDefault);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!recipientName.trim()) {
      setErrorMsg('لطفاً نام گیرنده را وارد فرمایید.');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMsg('لطفاً شماره تلفن همراه معتبر وارد فرمایید.');
      return;
    }

    if (!fullAddress.trim()) {
      setErrorMsg('نشانی دقیق پستی الزامی است.');
      return;
    }

    try {
      if (editingAddr) {
        await updateAddress(editingAddr.id, {
          recipientName: recipientName.trim(),
          phone: phone.trim(),
          province,
          city: city.trim(),
          fullAddress: fullAddress.trim(),
          postalCode: postalCode.trim(),
          isDefault
        });
        showToast('ویرایش آدرس', 'آدرس مورد نظر با موفقیت به‌روزرسانی شد.', 'success');
      } else {
        await addAddress({
          recipientName: recipientName.trim(),
          phone: phone.trim(),
          province,
          city: city.trim(),
          fullAddress: fullAddress.trim(),
          postalCode: postalCode.trim(),
          isDefault
        });
        showToast('افزودن آدرس', 'آدرس جدید با موفقیت ثبت گردید.', 'success');
      }
      setIsModalOpen(false);
    } catch {
      setErrorMsg('خطایی در ثبت آدرس رخ داد.');
    }
  };

  const handleDelete = async (addrId: string) => {
    if (window.confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
      await deleteAddress(addrId);
      showToast('حذف آدرس', 'آدرس با موفقیت حذف گردید.', 'info');
    }
  };

  const handleSetDefault = async (addrId: string) => {
    await setDefaultAddress(addrId);
    showToast('آدرس پیش‌فرض', 'این نشانی به عنوان آدرس پیش‌فرض انتخاب شد.', 'success');
  };

  const PROVINCES = [
    'تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'البرز', 'خوزستان',
    'مازندران', 'گیلان', 'کرمان', 'یزد', 'قم', 'مرکزی', 'هرمزگان'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>آدرس‌های من</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            نشانی‌های ثبت‌شده برای تحویل سفارش‌های شما در سامانه نکسورا.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن نشانی جدید</span>
        </button>
      </div>

      {/* Addresses Grid */}
      {(!user?.addresses || user.addresses.length === 0) ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center shadow-xs">
          <MapPin className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            هنوز هیچ آدرسی ثبت نکرده‌اید
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 max-w-sm mx-auto">
            برای تسریع در فرآیند ثبت سفارش، پیشنهاد می‌کنیم نشانی منزل یا محل کار خود را ثبت کنید.
          </p>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            افزودن اولین نشانی
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map(addr => (
            <div
              key={addr.id}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-2xs relative flex flex-col justify-between transition-all ${
                addr.isDefault
                  ? 'border-blue-500 ring-2 ring-blue-50 dark:ring-blue-950/50'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {addr.province}، {addr.city}
                    </span>
                  </div>

                  {addr.isDefault ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                      آدرس پیش‌فرض
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
                    >
                      انتخاب به عنوان پیش‌فرض
                    </button>
                  )}
                </div>

                {/* Address Body */}
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-4 min-h-[40px]">
                  {addr.fullAddress}
                </p>

                {/* Recipient details */}
                <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>تحویل‌گیرنده:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{addr.recipientName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>شماره همراه:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{addr.phone}</span>
                  </div>
                  {addr.postalCode && (
                    <div className="flex items-center gap-2 font-mono">
                      <span>کد پستی:</span>
                      <span className="text-slate-800 dark:text-slate-200">{addr.postalCode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                <button
                  onClick={() => openEditModal(addr)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-xs flex items-center gap-1 font-semibold"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>ویرایش</span>
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors text-xs flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit Address */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              {editingAddr ? 'ویرایش آدرس تحویل' : 'افزودن نشانی پستی جدید'}
            </h3>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    نام تحویل‌گیرنده: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    placeholder="مثلاً علی رضایی"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    شماره همراه: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono text-left"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">استان:</label>
                  <select
                    value={province}
                    onChange={e => setProvince(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    {PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">شهر:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="نام شهر"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  نشانی کامل پستی (شامل خیابان، کوچه، پلاک، واحد): <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={fullAddress}
                  onChange={e => setFullAddress(e.target.value)}
                  placeholder="خیابان، میدان، کوچه، پلاک، طبقه و واحد..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">کد پستی ۱۰ رقمی:</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder="مثلاً ۱۹۶۹۷۵۴۳۲۱"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono text-left"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="defaultCheck"
                  checked={isDefault}
                  onChange={e => setIsDefault(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 bg-white dark:bg-slate-800"
                />
                <label htmlFor="defaultCheck" className="text-xs text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                  انتخاب به عنوان آدرس پیش‌فرض جهت ارسال سفارش‌ها
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                >
                  {editingAddr ? 'ذخیره تغییرات' : 'ثبت آدرس'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
