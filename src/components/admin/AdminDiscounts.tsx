import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { DiscountCode } from '../../types';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { Tag, Plus, Trash2, CheckCircle2, Clock, X, AlertCircle } from 'lucide-react';

export const AdminDiscounts: React.FC = () => {
  const { discounts, addDiscount, updateDiscount, deleteDiscount } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'fixed'>('percent');
  const [amount, setAmount] = useState('');
  const [minPurchase, setMinPurchase] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setCode('');
    setType('percent');
    setAmount('');
    setMinPurchase('');
    setEndDate('۱۴۰۳/۰۸/۰۱');
    setUsageLimit('100');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!code.trim()) {
      setErrorMsg('کد تخفیف الزامی است.');
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setErrorMsg('مقدار تخفیف باید عدد معتبر باشد.');
      return;
    }

    const newDiscount: DiscountCode = {
      id: 'disc-' + Date.now(),
      code: code.trim().toUpperCase(),
      type,
      amount: numAmount,
      minPurchase: minPurchase ? Number(minPurchase) : undefined,
      startDate: '۱۴۰۳/۰۶/۰۱',
      endDate: endDate.trim() || '۱۴۰۳/۰۸/۰۱',
      usageLimit: usageLimit ? Number(usageLimit) : undefined,
      usedCount: 0,
      status: 'active'
    };

    addDiscount(newDiscount);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (disc: DiscountCode) => {
    const newStatus = disc.status === 'active' ? 'expired' : 'active';
    updateDiscount(disc.id, { status: newStatus });
  };

  const handleDelete = (id: string, dCode: string) => {
    if (window.confirm(`آیا از حذف کد تخفیف "${dCode}" اطمینان دارید؟`)) {
      deleteDiscount(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت کدهای تخفیف و جشنواره‌ها ({toPersianDigits(discounts.length)} کد)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            تعریف کوپن‌های تخفیف درصدی یا مقداری با محدودیت سقف و تاریخ انقضا.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>کد تخفیف جدید</span>
        </button>
      </div>

      {/* Discounts Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 pr-4">کد تخفیف</th>
                <th className="py-3.5 px-3">نوع و مقدار</th>
                <th className="py-3.5 px-3">حداقل خرید</th>
                <th className="py-3.5 px-3">تاریخ انقضا</th>
                <th className="py-3.5 px-3">تعداد استفاده</th>
                <th className="py-3.5 px-3">وضعیت</th>
                <th className="py-3.5 pl-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {discounts.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pr-4 font-mono font-black text-sm text-purple-700 dark:text-purple-400 select-all">
                    {d.code}
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {d.type === 'percent' ? (
                      <span className="font-mono">{toPersianDigits(d.amount)}٪ درصد</span>
                    ) : (
                      <span className="font-mono">{formatToman(d.amount)}</span>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                    {d.minPurchase ? formatToman(d.minPurchase) : 'بدون سقف'}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono">
                    {d.endDate}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                    {toPersianDigits(d.usedCount)} {d.usageLimit ? `از ${toPersianDigits(d.usageLimit)}` : ''}
                  </td>

                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleToggleStatus(d)}
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-colors ${
                        d.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {d.status === 'active' ? 'فعال' : 'منقضی/غیرفعال'}
                    </button>
                  </td>

                  <td className="py-3 pl-4 text-left">
                    <button
                      onClick={() => handleDelete(d.id, d.code)}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Discount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">تعریف کد تخفیف جدید</h3>
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
                  کد کوپن (انگلیسی): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="مثلاً NEXORA2025"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">نوع تخفیف:</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  >
                    <option value="percent">درصدی (%)</option>
                    <option value="fixed">مبلغ ثابت (تومان)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    مقدار تخفیف: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder={type === 'percent' ? 'مثلاً 15' : 'مثلاً 2000000'}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">حداقل خرید (تومان):</label>
                  <input
                    type="number"
                    value={minPurchase}
                    onChange={e => setMinPurchase(e.target.value)}
                    placeholder="اختیاری"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">محدودیت تعداد کل:</label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={e => setUsageLimit(e.target.value)}
                    placeholder="مثلاً 100"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">تاریخ انقضا:</label>
                <input
                  type="text"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  placeholder="۱۴۰۳/۰۸/۰۱"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono"
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
                  افزودن کد تخفیف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
