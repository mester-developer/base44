import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LaptopProduct } from '../../types';
import { formatToman, toPersianDigits } from '../../utils/persian';
import { LazyImage } from '../common/LazyImage';
import {
  Laptop,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  AlertCircle,
  X,
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface AdminProductsProps {
  initialAction?: string;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ initialAction }) => {
  const { products, addProduct, updateProduct, deleteProduct, categories, navigateTo } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStock, setSelectedStock] = useState<'all' | 'instock' | 'outstock'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(initialAction === 'new');
  const [editingProduct, setEditingProduct] = useState<LaptopProduct | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('ASUS');
  const [category, setCategory] = useState('gaming');
  const [price, setPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Specs
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [screen, setScreen] = useState('');
  const [battery, setBattery] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('ASUS');
    setCategory('gaming');
    setPrice('');
    setDiscountPercent('');
    setInStock(true);
    setImageUrl('https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80');
    setDescription('');
    setCpu('Intel Core i7-14700HX');
    setGpu('NVIDIA GeForce RTX 4060 8GB');
    setRam('16GB DDR5 5600MHz');
    setStorage('1TB PCIe Gen4 NVMe M.2');
    setScreen('16.0" WQXGA (2560x1600) 165Hz IPS');
    setBattery('90Wh');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: LaptopProduct) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setPrice(product.price.toString());
    setDiscountPercent(product.discountPercent ? product.discountPercent.toString() : '');
    setInStock(product.stock > 0 || !!product.inStock);
    setImageUrl(product.images[0] || '');
    setDescription(product.description || product.shortDescription || '');
    setCpu(product.specs.cpu);
    setGpu(product.specs.gpu);
    setRam(product.specs.ram);
    setStorage(product.specs.storage);
    setScreen(product.specs.display || product.specs.screen || '');
    setBattery(product.specs.battery);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('نام محصول الزامی است.');
      return;
    }

    const numericPrice = Number(price);
    if (!numericPrice || numericPrice <= 0) {
      setErrorMsg('قیمت محصول باید یک عدد معتبر بزرگتر از صفر باشد.');
      return;
    }

    const numDiscount = discountPercent ? Number(discountPercent) : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: name.trim(),
        brand: brand as any,
        category: category as any,
        price: numericPrice,
        discountPercent: numDiscount,
        discountPrice: numDiscount ? Math.round(numericPrice * (1 - numDiscount / 100)) : undefined,
        stock: inStock ? (editingProduct.stock || 5) : 0,
        inStock,
        images: [imageUrl.trim() || editingProduct.images[0]],
        description: description.trim(),
        shortDescription: description.trim(),
        specs: {
          ...editingProduct.specs,
          cpu: cpu.trim(),
          gpu: gpu.trim(),
          ram: ram.trim(),
          storage: storage.trim(),
          display: screen.trim(),
          screen: screen.trim(),
          battery: battery.trim(),
          weight: editingProduct.specs.weight || '2.2 kg',
          os: editingProduct.specs.os || 'Windows 11 Home',
          color: editingProduct.specs.color || 'خاکستری'
        }
      });
    } else {
      const slug = name.trim().toLowerCase().replace(/[\s/]+/g, '-').replace(/[^\w-]/g, '');
      const newProduct: LaptopProduct = {
        id: 'nx-' + (slug || Date.now().toString()),
        slug: slug || 'laptop-' + Date.now(),
        name: name.trim(),
        englishName: name.trim(),
        brand: brand as any,
        category: category as any,
        categoryFa: 'لپ‌تاپ ' + (category === 'gaming' ? 'گیمینگ' : category),
        price: numericPrice,
        discountPercent: numDiscount,
        discountPrice: numDiscount ? Math.round(numericPrice * (1 - numDiscount / 100)) : undefined,
        stock: inStock ? 8 : 0,
        inStock,
        rating: 5,
        reviewCount: 1,
        reviewsCount: 1,
        images: [imageUrl.trim() || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'],
        tags: ['جدید', brand],
        features: ['گارانتی رسمی ۲۴ ماهه نکسورا', 'ارسال رایگان اکسپرس'],
        highlights: [
          `عملکرد عالی با پردازنده ${cpu.trim() || 'نسل جدید'}`,
          `گرافیک قدرتمند ${gpu.trim() || 'مجزا'}`,
          `صفحه نمایش باکیفیت ${screen.trim() || 'IPS'}`
        ],
        description: description.trim() || name.trim(),
        shortDescription: description.trim() || name.trim(),
        specs: {
          cpu: cpu.trim(),
          gpu: gpu.trim(),
          ram: ram.trim(),
          storage: storage.trim(),
          display: screen.trim(),
          screen: screen.trim(),
          battery: battery.trim(),
          weight: '2.2 kg',
          os: 'Windows 11 Home',
          color: 'خاکستری',
          ports: ['1x USB Type-C', '2x USB 3.2', '1x HDMI 2.1', '1x Audio Combo Jack'],
          warranty: '۲۴ ماه گارانتی نکسورا'
        }
      };
      addProduct(newProduct);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`آیا از حذف محصول "${prodName}" اطمینان دارید؟ این عملیات غیرقابل بازگشت است.`)) {
      deleteProduct(id);
    }
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
    if (selectedStock === 'instock' && !p.inStock) return false;
    if (selectedStock === 'outstock' && p.inStock) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.specs.cpu.toLowerCase().includes(term) ||
        p.specs.gpu.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const BRANDS = ['ASUS', 'Apple', 'Lenovo', 'HP', 'Dell', 'MSI', 'Acer'];

  return (
    <div className="space-y-6">
      {/* Header with Search and New Product button */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>مدیریت کاتالوگ محصولات ({toPersianDigits(products.length)} کالا)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            تعریف لپ‌تاپ جدید، به‌روزرسانی قیمت‌ها، تخفیف‌ها و مدیریت موجودی انبار.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
        <div className="flex-1 min-w-[220px] relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="جستجوی نام لپ‌تاپ، پردازنده یا گرافیک..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pr-9 pl-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">برند:</span>
          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          >
            <option value="all">همه برندها</option>
            {BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">وضعیت انبار:</span>
          <select
            value={selectedStock}
            onChange={e => setSelectedStock(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="instock">فقط موجود</option>
            <option value="outstock">ناموجود در انبار</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 pr-4">محصول</th>
                <th className="py-3.5 px-3">برند / دسته</th>
                <th className="py-3.5 px-3">قیمت اصلی</th>
                <th className="py-3.5 px-3">تخفیف</th>
                <th className="py-3.5 px-3">موجودی انبار</th>
                <th className="py-3.5 pl-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0 overflow-hidden flex items-center justify-center">
                        <LazyImage
                          src={product.images[0]}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          wrapperClassName="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
                          {product.specs.cpu} • {product.specs.gpu}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{product.brand}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{product.category}</div>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {formatToman(product.price)}
                  </td>

                  <td className="py-3 px-3">
                    {product.discountPercent ? (
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-mono font-bold text-[11px] border border-rose-200 dark:border-rose-800">
                        {toPersianDigits(product.discountPercent)}٪
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500">-</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {product.inStock ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                        موجود
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                        ناموجود
                      </span>
                    )}
                  </td>

                  <td className="py-3 pl-4 text-left">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                        title="ویرایش"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="حذف محصول"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'ویرایش مشخصات محصول' : 'تعریف و ثبت لپ‌تاپ جدید'}
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

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  نام کامل لپ‌تاپ: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثلاً لپ‌تاپ ایسوس ROG Zephyrus G16 (2024)"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  required
                />
              </div>

              {/* Brand, Category, Stock in Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">برند سازنده:</label>
                  <select
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  >
                    {BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">دسته‌بندی:</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  >
                    <option value="gaming">گیمینگ</option>
                    <option value="engineering">مهندسی</option>
                    <option value="programming">برنامه‌نویسی</option>
                    <option value="business">اداری و تجاری</option>
                    <option value="student">دانشجویی</option>
                    <option value="budget">اقتصادی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">وضعیت انبار:</label>
                  <select
                    value={inStock ? 'true' : 'false'}
                    onChange={e => setInStock(e.target.value === 'true')}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                  >
                    <option value="true">موجود در انبار</option>
                    <option value="false">عدم موجودی</option>
                  </select>
                </div>
              </div>

              {/* Price & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    قیمت به تومان: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="مثلاً 95000000"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    درصد تخفیف (اختیاری):
                  </label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(e.target.value)}
                    placeholder="مثلاً 10"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                    min="0"
                    max="99"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">آدرس تصویر (URL):</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 font-mono text-left"
                />
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">مشخصات فنی و سخت‌افزاری:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">پردازنده (CPU):</label>
                    <input
                      type="text"
                      value={cpu}
                      onChange={e => setCpu(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">کارت گرافیک (GPU):</label>
                    <input
                      type="text"
                      value={gpu}
                      onChange={e => setGpu(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">حافظه رم (RAM):</label>
                    <input
                      type="text"
                      value={ram}
                      onChange={e => setRam(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">حافظه داخلی (Storage):</label>
                    <input
                      type="text"
                      value={storage}
                      onChange={e => setStorage(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">صفحه نمایش (Screen):</label>
                    <input
                      type="text"
                      value={screen}
                      onChange={e => setScreen(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-400 block mb-1">ظرفیت باتری:</label>
                    <input
                      type="text"
                      value={battery}
                      onChange={e => setBattery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">توضیح کوتاه معرفی:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="ویژگی‌های برجسته محصول..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 dark:focus:border-purple-500"
                />
              </div>

              {/* Submit Buttons */}
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
                  {editingProduct ? 'ذخیره تغییرات محصول' : 'ثبت و انتشار محصول'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
