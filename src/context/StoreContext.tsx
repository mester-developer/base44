import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import {
  LaptopProduct,
  CartItem,
  Order,
  OrderStatus,
  ToastMessage,
  User,
  CategoryItem,
  DiscountCode,
  StoreSettings,
  BlogPost
} from '../types';
import { LAPTOP_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';
import { authService } from '../services/authService';
import { toPersianDigits } from '../utils/persian';

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'compare'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'admin'
  | 'auth'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'wishlist'
  | 'tracking'
  | 'track-order'
  | 'brands'
  | 'discounts'
  | 'blog'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'returns'
  | 'warranty'
  | 'privacy'
  | 'terms'
  | 'search'
  | 'not-found';

interface StoreContextType {
  // Navigation
  currentPage: PageRoute;
  currentSlug?: string;
  currentRoute: PageRoute;
  routeParam?: string;
  subRouteParam?: string;
  navigateTo: (page: PageRoute | string, slugOrParam?: string, subParam?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: LaptopProduct, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare
  compareList: string[];
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  setCompareSlot: (slotIndex: number, productId: string) => void;
  setCompareProducts: (productIds: string[]) => void;

  // User Auth & Orders
  user: User | null;
  isLoggedIn: boolean;
  login: (phoneOrData: string | (Partial<User> & { name?: string }), name?: string) => void;
  logout: () => void;
  updateUser: (profile: Partial<User>) => void;
  reloadUser: () => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'statusFa'>) => Order;
  placeOrder: (orderData: {
    fullName: string;
    phone: string;
    address: string;
    paymentMethod: string;
    shippingMethod: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, statusFa?: string) => void;
  lastCreatedOrder: Order | null;
  findOrderByTracking: (orderNumber: string, phone: string) => Order | null;

  // Products Management
  products: LaptopProduct[];
  addProduct: (product: LaptopProduct) => void;
  updateProduct: (id: string, product: Partial<LaptopProduct>) => void;
  deleteProduct: (id: string) => void;

  // Categories Management
  categories: CategoryItem[];
  addCategory: (cat: CategoryItem) => void;
  updateCategory: (id: string, cat: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Discounts Management
  discounts: DiscountCode[];
  addDiscount: (discount: DiscountCode) => void;
  updateDiscount: (id: string, discount: Partial<DiscountCode>) => void;
  deleteDiscount: (id: string) => void;

  // Blog Management
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'nexora_theme_v1';
const CART_STORAGE_KEY = 'nexora_cart_v1';
const WISHLIST_STORAGE_KEY = 'nexora_wishlist_v1';
const COMPARE_STORAGE_KEY = 'nexora_compare_v1';
const ORDERS_STORAGE_KEY = 'nexora_orders_v2';
const PRODUCTS_STORAGE_KEY = 'nexora_products_v2';
const CATEGORIES_STORAGE_KEY = 'nexora_categories_v2';
const DISCOUNTS_STORAGE_KEY = 'nexora_discounts_v2';
const BLOGS_STORAGE_KEY = 'nexora_blogs_v2';
const SETTINGS_STORAGE_KEY = 'nexora_settings_v2';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'NX-98421',
    date: '۱۸ شهریور ۱۴۰۳',
    status: 'in_transit',
    statusFa: 'در مسیر تحویل',
    items: [
      {
        productId: 'nx-asus-rog-strix-g16',
        name: 'لپ‌تاپ ایسوس راگ استریکس G16 (2024)',
        price: 114900000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalAmount: 124500000,
    shippingFee: 0,
    discountAmount: 9600000,
    finalAmount: 114900000,
    customer: {
      userId: 'usr-mohammad',
      firstName: 'محمد',
      lastName: 'نجفی',
      phone: '09123456789',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر، نرسیده به میدان ونک، برج نگین، واحد ۴۰۲',
      postalCode: '۱۹۶۹۷۵۴۳۲۱'
    },
    shippingMethod: 'express',
    paymentMethod: 'online',
    trackingCode: 'PST-94821803'
  },
  {
    id: 'ord-2',
    orderNumber: 'NX-96112',
    date: '۲۸ مرداد ۱۴۰۳',
    status: 'delivered',
    statusFa: 'تحویل داده شده',
    items: [
      {
        productId: 'nx-apple-macbook-air-13-m3',
        name: 'مک‌بوک ایر ۱۳ اینچ اپل (تراشه M3)',
        price: 65900000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalAmount: 69900000,
    shippingFee: 0,
    discountAmount: 4000000,
    finalAmount: 65900000,
    customer: {
      userId: 'usr-mohammad',
      firstName: 'محمد',
      lastName: 'نجفی',
      phone: '09123456789',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر، نرسیده به میدان ونک، برج نگین، واحد ۴۰۲',
      postalCode: '۱۹۶۹۷۵۴۳۲۱'
    },
    shippingMethod: 'regular',
    paymentMethod: 'online',
    trackingCode: 'PST-81023942'
  }
];

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', slug: 'gaming', name: 'گیمینگ', nameFa: 'گیمینگ و بازی حرفه‌ای', icon: 'Gamepad2', description: 'لپ‌تاپ‌های فوق قدرتمند با پردازنده‌های گرافیکی سری RTX' },
  { id: 'cat-2', slug: 'engineering', name: 'مهندسی', nameFa: 'مهندسی و طراحی سه‌بعدی', icon: 'Cpu', description: 'ایستگاه‌های کاری پردازشی با نمایشگرهای دقیق و رم بالا' },
  { id: 'cat-3', slug: 'programming', name: 'برنامه‌نویسی', nameFa: 'برنامه‌نویسی و توسعه وب', icon: 'Code', description: 'کیبوردهای ارگونومیک، پردازنده‌های چند‌هسته‌ای و دوام باتری عالی' },
  { id: 'cat-4', slug: 'business', name: 'اداری و مدیریتی', nameFa: 'اداری، مدیریتی و تجاری', icon: 'Briefcase', description: 'طراحی باریک و سبک با بدنه‌های آلومینیومی و امنیت بالا' },
  { id: 'cat-5', slug: 'student', name: 'دانشجویی', nameFa: 'دانشجویی و مالتی‌مدیا', icon: 'GraduationCap', description: 'تعادل عالی میان قیمت مناسب، شارژدهی بالا و وزن کم' },
  { id: 'cat-6', slug: 'budget', name: 'اقتصادی', nameFa: 'اقتصادی و عمومی', icon: 'Wallet', description: 'گزینه‌های مقرون‌به‌صرفه جهت وب‌گردی و کاربردهای روزمره' }
];

const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'NEXORA-NOWRUZ',
    type: 'percent',
    amount: 10,
    minPurchase: 40000000,
    startDate: '۱۴۰۳/۰۶/۰۱',
    endDate: '۱۴۰۳/۰۷/۰۱',
    usageLimit: 100,
    usedCount: 23,
    status: 'active'
  },
  {
    id: 'disc-2',
    code: 'GAMING-PRO',
    type: 'fixed',
    amount: 3000000,
    minPurchase: 80000000,
    startDate: '۱۴۰۳/۰۶/۱۰',
    endDate: '۱۴۰۳/۰۶/۳۰',
    usageLimit: 50,
    usedCount: 18,
    status: 'active'
  },
  {
    id: 'disc-3',
    code: 'STUDENT1403',
    type: 'percent',
    amount: 5,
    minPurchase: 25000000,
    startDate: '۱۴۰۳/۰۶/۱۵',
    endDate: '۱۴۰۳/۰۷/۱۵',
    usageLimit: 200,
    usedCount: 45,
    status: 'active'
  }
];

const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'فروشگاه تخصصی لپ‌تاپ نکسورا (NEXORA)',
  phone: '021-91008877',
  email: 'info@nexora.ir',
  address: 'تهران، بلوار میرداماد، مجتمع کامپیوتر پایتخت، برج A، طبقه ۸، واحد ۸۰۴',
  shippingFee: 150000,
  freeShippingThreshold: 50000000
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);
  const [subRouteParam, setSubRouteParam] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Theme State
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        if (saved === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        return 'dark';
      }
      document.documentElement.classList.remove('dark');
      return 'light';
    } catch {
      return 'light';
    }
  });

  // Sync theme with document element and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Error saving theme', e);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  }, []);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['nx-asus-rog-strix-g16', 'nx-apple-macbook-pro-16-m3-max'];
    } catch {
      return ['nx-asus-rog-strix-g16', 'nx-apple-macbook-pro-16-m3-max'];
    }
  });

  // Compare State
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['nx-asus-rog-strix-g16', 'nx-lenovo-legion-pro-7i'];
    } catch {
      return ['nx-asus-rog-strix-g16', 'nx-lenovo-legion-pro-7i'];
    }
  });

  // User State - synchronized with authService
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  // Products State
  const [products, setProducts] = useState<LaptopProduct[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedIds = new Set(parsed.map((p: LaptopProduct) => p.id));
          const missingBase = LAPTOP_PRODUCTS.filter(bp => !parsedIds.has(bp.id));
          return [...parsed, ...missingBase];
        }
      }
      return LAPTOP_PRODUCTS;
    } catch {
      return LAPTOP_PRODUCTS;
    }
  });

  // Categories State
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Discounts State
  const [discounts, setDiscounts] = useState<DiscountCode[]>(() => {
    try {
      const saved = localStorage.getItem(DISCOUNTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNTS;
    } catch {
      return INITIAL_DISCOUNTS;
    }
  });

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(BLOGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedIds = new Set(parsed.map((b: BlogPost) => b.id));
          const missingBase = BLOG_POSTS.filter(bb => !parsedIds.has(bb.id));
          return [...parsed, ...missingBase];
        }
      }
      return BLOG_POSTS;
    } catch {
      return BLOG_POSTS;
    }
  });

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareList));
    } catch (e) {
      console.warn('Failed to save compare list to localStorage', e);
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.warn('Failed to save categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(DISCOUNTS_STORAGE_KEY, JSON.stringify(discounts));
    } catch (e) {
      console.warn('Failed to save discounts to localStorage', e);
    }
  }, [discounts]);

  useEffect(() => {
    try {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogPosts));
    } catch (e) {
      console.warn('Failed to save blog posts to localStorage', e);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings));
    } catch (e) {
      console.warn('Failed to save store settings to localStorage', e);
    }
  }, [storeSettings]);

  // Keep user in sync with authService
  const reloadUser = () => {
    setUser(authService.getCurrentUser());
  };

  // Handle browser URL hash and navigation
  useEffect(() => {
    const syncFromLocation = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      if (rawHash) {
        const parts = rawHash.split('/');
        let page = parts[0] as PageRoute;
        if ((page as string) === 'track-order') page = 'tracking';
        const p1 = parts[1];
        const p2 = parts[2];
        if (page) {
          setCurrentPage(page);
          setCurrentSlug(p1);
          setRouteParam(p1);
          setSubRouteParam(p2);
        }
      } else {
        setCurrentPage('home');
        setCurrentSlug(undefined);
        setRouteParam(undefined);
        setSubRouteParam(undefined);
      }
    };

    syncFromLocation();

    const handlePopState = () => {
      syncFromLocation();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (page: PageRoute | string, slugOrParam?: string, subParam?: string) => {
    let targetPage = page;
    let targetParam = slugOrParam;
    let targetSub = subParam;

    if (typeof page === 'string' && page.includes('/')) {
      const parts = page.replace(/^\//, '').split('/');
      targetPage = parts[0];
      targetParam = parts[1] || slugOrParam;
      targetSub = parts[2] || subParam;
    }

    if (targetPage === 'track-order') targetPage = 'tracking';

    setCurrentPage(targetPage as PageRoute);
    setCurrentSlug(targetParam);
    setRouteParam(targetParam);
    setSubRouteParam(targetSub);

    let newHash = `#/${targetPage}`;
    if (targetParam) newHash += `/${targetParam}`;
    if (targetSub) newHash += `/${targetSub}`;

    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product: LaptopProduct, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: selectedColor || product.specs.color }];
      }
    });
    showToast('به سبد خرید افزوده شد', `${product.name} با موفقیت به سبد خرید شما اضافه گردید.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('حذف از سبد خرید', 'کالای مورد نظر از سبد خرید شما حذف گردید.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = cart.reduce((sum, item) => {
    const original = item.product.discountPrice
      ? Math.round(item.product.price / (1 - (item.product.discountPercent || 5) / 100))
      : item.product.price;
    return sum + (original - item.product.price) * item.quantity;
  }, 0);
  const cartTotal = cartSubtotal;

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId) || LAPTOP_PRODUCTS.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'محصول';

    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('حذف از علاقه‌مندی‌ها', `${prodName} از لیست علاقه‌مندی‌ها حذف شد.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('افزوده شد به علاقه‌مندی‌ها', `${prodName} به لیست علاقه‌مندی‌های شما اضافه شد.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare Functions
  const addToCompare = (productId: string): boolean => {
    const prod = products.find(p => p.id === productId) || LAPTOP_PRODUCTS.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'محصول';

    if (compareList.includes(productId)) {
      showToast('اطلاعیه', `${prodName} از قبل در لیست مقایسه وجود دارد.`, 'info');
      return true;
    }

    if (compareList.length >= 4) {
      showToast('محدودیت مقایسه', 'حداکثر ۴ محصول را می‌توانید همزمان مقایسه نمایید.', 'warning');
      return false;
    }

    setCompareList(prev => [...prev, productId]);
    showToast('افزوده شد به مقایسه', `${prodName} به میز مقایسه افزوده شد.`, 'success');
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
    showToast('حذف از مقایسه', 'محصول از میز مقایسه حذف گردید.', 'info');
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const clearCompare = () => {
    setCompareList([]);
    showToast('پاکسازی میز مقایسه', 'تمامی محصولات از میز مقایسه حذف شدند.', 'info');
  };

  const setCompareSlot = (slotIndex: number, productId: string) => {
    const prod = products.find(p => p.id === productId) || LAPTOP_PRODUCTS.find(p => p.id === productId);
    const prodName = prod ? prod.name : 'محصول';

    setCompareList(prev => {
      const next = [...prev];
      if (slotIndex >= next.length) {
        next.push(productId);
      } else {
        next[slotIndex] = productId;
      }
      // Deduplicate keeping the newly assigned slot
      const deduped: string[] = [];
      next.forEach((id, idx) => {
        if (!deduped.includes(id) || idx === slotIndex) {
          if (!deduped.includes(id)) deduped.push(id);
        }
      });
      return deduped.slice(0, 4);
    });

    showToast('انتخاب برای مقایسه', `${prodName} در میز مقایسه قرار گرفت.`, 'success');
  };

  const setCompareProducts = (productIds: string[]) => {
    const validIds = productIds.slice(0, 4);
    setCompareList(validIds);
    showToast('بروزرسانی مقایسه', `${toPersianDigits(validIds.length)} لپ‌تاپ در میز مقایسه قرار گرفت.`, 'success');
  };

  // User Functions
  const login = (phoneOrData: string | (Partial<User> & { name?: string }), name?: string) => {
    if (typeof phoneOrData === 'string') {
      const res = authService.login(phoneOrData, 'user123');
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        const fallbackUser: User = {
          id: 'usr-' + Date.now(),
          firstName: name ? name.split(' ')[0] : 'کاربر',
          lastName: name ? name.split(' ').slice(1).join(' ') : 'گرامی',
          name: name || 'کاربر گرامی',
          phone: phoneOrData,
          email: `${phoneOrData}@nexora.ir`,
          role: 'user',
          createdAt: new Date().toLocaleDateString('fa-IR'),
          addresses: [],
          orders: [],
          wishlist: []
        };
        authService.saveCurrentUser(fallbackUser);
        setUser(fallbackUser);
      }
    } else {
      const u = authService.getCurrentUser() || (phoneOrData as User);
      authService.saveCurrentUser(u);
      setUser(u);
    }
    showToast('ورود موفقیت‌آمیز', 'خوش آمدید.', 'success');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    showToast('خروج از حساب', 'شما با موفقیت از حساب کاربری خود خارج شدید.', 'info');
  };

  const updateUser = (profile: Partial<User>) => {
    if (!user) return;
    const res = authService.updateProfile(user.id, profile);
    if (res.success && res.user) {
      setUser({ ...res.user });
      showToast('ویرایش اطلاعات', 'اطلاعات حساب کاربری شما با موفقیت به‌روزرسانی شد.', 'success');
    }
  };

  // Order Functions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'statusFa'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `NX-${randomNum}`;
    const currentUser = authService.getCurrentUser();

    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber,
      date: 'امروز، ' + new Date().toLocaleDateString('fa-IR'),
      status: 'paid',
      statusFa: 'پرداخت موفق و در حال آماده‌سازی',
      trackingCode: `PST-${randomNum + 4000}`,
      customer: {
        ...orderData.customer,
        userId: currentUser?.id
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    if (currentUser) {
      authService.addOrderToUser(currentUser.id, newOrder.id);
    }

    clearCart();
    return newOrder;
  };

  const placeOrder = (orderData: {
    fullName: string;
    phone: string;
    address: string;
    paymentMethod: string;
    shippingMethod: string;
    notes?: string;
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `NX-${randomNum}`;
    const currentUser = authService.getCurrentUser();

    const nameParts = orderData.fullName.trim().split(' ');
    const firstName = nameParts[0] || 'مشتری';
    const lastName = nameParts.slice(1).join(' ') || 'نکسورا';

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: 'امروز، ' + new Date().toLocaleDateString('fa-IR'),
      status: 'paid',
      statusFa: 'پرداخت شده و در انتظار پردازش',
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount: cartSubtotal,
      shippingFee: cartSubtotal > 50000000 ? 0 : storeSettings.shippingFee,
      discountAmount: cartDiscount,
      finalAmount: cartTotal,
      customer: {
        userId: currentUser?.id,
        firstName,
        lastName,
        phone: orderData.phone,
        province: 'تهران',
        city: 'تهران',
        address: orderData.address,
        postalCode: '۱۹۶۹۷۵۴۳۲۱'
      },
      shippingMethod: orderData.shippingMethod.includes('اکسپرس') ? 'express' : 'regular',
      paymentMethod: orderData.paymentMethod.includes('کارت') ? 'cash_on_delivery' : 'online',
      trackingCode: `PST-${randomNum + 4000}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    if (currentUser) {
      authService.addOrderToUser(currentUser.id, newOrder.id);
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, statusFa?: string) => {
    const STATUS_MAP: Record<OrderStatus, string> = {
      pending_payment: 'در انتظار پرداخت',
      paid: 'پرداخت شده',
      processing: 'در حال پردازش',
      ready_to_ship: 'آماده ارسال',
      shipped: 'ارسال شده',
      in_transit: 'در مسیر تحویل',
      delivered: 'تحویل داده شده',
      cancelled: 'لغو شده'
    };

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          return {
            ...ord,
            status,
            statusFa: statusFa || STATUS_MAP[status] || ord.statusFa
          };
        }
        return ord;
      })
    );
    showToast('به‌روزرسانی سفارش', `وضعیت سفارش به "${STATUS_MAP[status] || status}" تغییر یافت.`, 'success');
  };

  const findOrderByTracking = (orderNumber: string, phone: string): Order | null => {
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.trim();
    return orders.find(ord => 
      ord.orderNumber.toUpperCase() === cleanNum || 
      ord.customer.phone === cleanPhone ||
      ord.trackingCode?.toUpperCase() === cleanNum
    ) || null;
  };

  // Products Management
  const addProduct = (product: LaptopProduct) => {
    setProducts(prev => [product, ...prev]);
    showToast('افزودن محصول', `محصول ${product.name} با موفقیت افزوده شد.`, 'success');
  };

  const updateProduct = (id: string, partial: Partial<LaptopProduct>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...partial } : p))
    );
    showToast('ویرایش محصول', 'تغییرات محصول با موفقیت ذخیره شد.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('حذف محصول', 'محصول با موفقیت حذف گردید.', 'info');
  };

  // Categories Management
  const addCategory = (cat: CategoryItem) => {
    setCategories(prev => [...prev, cat]);
    showToast('دسته‌بندی جدید', `دسته‌بندی ${cat.nameFa} ایجاد شد.`, 'success');
  };

  const updateCategory = (id: string, partial: Partial<CategoryItem>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...partial } : c))
    );
    showToast('ویرایش دسته‌بندی', 'اطلاعات دسته‌بندی به‌روزرسانی شد.', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('حذف دسته‌بندی', 'دسته‌بندی با موفقیت حذف گردید.', 'info');
  };

  // Discounts Management
  const addDiscount = (discount: DiscountCode) => {
    setDiscounts(prev => [discount, ...prev]);
    showToast('کد تخفیف جدید', `کد ${discount.code} ایجاد شد.`, 'success');
  };

  const updateDiscount = (id: string, partial: Partial<DiscountCode>) => {
    setDiscounts(prev =>
      prev.map(d => (d.id === id ? { ...d, ...partial } : d))
    );
    showToast('ویرایش کد تخفیف', 'کد تخفیف به‌روزرسانی شد.', 'success');
  };

  const deleteDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    showToast('حذف کد تخفیف', 'کد تخفیف حذف گردید.', 'info');
  };

  // Blog Management
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    showToast('انتشار مقاله', `مقاله ${post.title} ذخیره شد.`, 'success');
  };

  const updateBlogPost = (id: string, partial: Partial<BlogPost>) => {
    setBlogPosts(prev =>
      prev.map(b => (b.id === id ? { ...b, ...partial } : b))
    );
    showToast('ویرایش مقاله', 'تغییرات مقاله ذخیره شد.', 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    showToast('حذف مقاله', 'مقاله حذف گردید.', 'info');
  };

  // Settings
  const updateStoreSettings = (partial: Partial<StoreSettings>) => {
    setStoreSettings(prev => ({ ...prev, ...partial }));
    showToast('تنظیمات فروشگاه', 'تنظیمات با موفقیت ذخیره گردید.', 'success');
  };

  const contextValue = useMemo(() => ({
    currentPage,
    currentSlug,
    currentRoute: currentPage,
    routeParam,
    subRouteParam,
    navigateTo,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    setCompareSlot,
    setCompareProducts,
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser,
    reloadUser,
    orders,
    createOrder,
    placeOrder,
    updateOrderStatus,
    lastCreatedOrder,
    findOrderByTracking,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    discounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    storeSettings,
    updateStoreSettings,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    setTheme,
    toasts,
    showToast,
    removeToast
  }), [
    currentPage,
    currentSlug,
    routeParam,
    subRouteParam,
    navigateTo,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    setCompareSlot,
    setCompareProducts,
    user,
    login,
    logout,
    updateUser,
    reloadUser,
    orders,
    createOrder,
    placeOrder,
    updateOrderStatus,
    lastCreatedOrder,
    findOrderByTracking,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    discounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    storeSettings,
    updateStoreSettings,
    searchQuery,
    theme,
    toggleTheme,
    setTheme,
    toasts,
    showToast,
    removeToast
  ]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
