export type LaptopCategory = 
  | 'gaming'
  | 'engineering'
  | 'programming'
  | 'student'
  | 'business'
  | 'budget';

export interface LaptopProduct {
  id: string;
  slug: string;
  brand: string;
  name: string;
  englishName: string;
  description: string;
  price: number; // in Tomans
  discountPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock?: boolean;
  shortDescription?: string;
  featured?: boolean;
  bestSeller?: boolean;
  specialOffer?: boolean;
  images: string[];
  category: LaptopCategory;
  categoryFa: string;
  features?: string[];
  tags?: string[];
  reviewsCount?: number;

  // Technical Specifications
  specs: {
    cpu: string;
    cpuGen?: string;
    cpuCores?: string;
    gpu: string;
    gpuVram?: string;
    ram: string;
    ramType?: string;
    storage: string;
    storageType?: string;
    display: string;
    screen?: string;
    resolution?: string;
    refreshRate?: string;
    panelType?: string;
    battery: string;
    weight: string;
    ports?: string[];
    wireless?: string;
    keyboard?: string;
    webcam?: string;
    dimensions?: string;
    os: string;
    warranty?: string;
    color: string;
  };

  highlights?: string[];
}

export interface CartItem {
  product: LaptopProduct;
  quantity: number;
  selectedColor?: string;
  warrantyType?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 
  | 'pending_payment' 
  | 'paid' 
  | 'processing' 
  | 'ready_to_ship' 
  | 'shipped' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  statusFa: string;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  discountAmount: number;
  finalAmount: number;
  customer: {
    userId?: string;
    firstName: string;
    lastName: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
  shippingMethod: 'regular' | 'express';
  paymentMethod: 'online' | 'cash_on_delivery';
  trackingCode?: string;
}

export type UserRole = 'user' | 'admin';

export interface UserAddress {
  id: string;
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  phone: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  province?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  addresses: UserAddress[];
  orders: string[]; // Order IDs
  wishlist: string[]; // Product IDs
  status?: 'active' | 'blocked';
}

export type UserProfile = User;

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  amount: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'expired' | 'disabled';
}

export interface CategoryItem {
  id: string;
  slug: LaptopCategory;
  name: string;
  nameFa: string;
  icon: string;
  description: string;
  productCount?: number;
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  email: string;
  address: string;
  shippingFee: number;
  freeShippingThreshold: number;
}

export interface UserReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  pros: string[];
  cons: string[];
  verifiedPurchase: boolean;
  productName?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readingTime: string;
  readTime?: string;
  coverImage: string;
  tags: string[];
  relatedProductSlugs?: string[];
}

export interface Brand {
  id: string;
  name: string;
  nameFa: string;
  logo: string;
  description: string;
  productCount: number;
  country: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface FilterState {
  search: string;
  brand: string[];
  category: LaptopCategory[];
  minPrice: number;
  maxPrice: number;
  ram: string[];
  cpu: string[];
  gpu: string[];
  displaySize: string[];
  os: string[];
  inStockOnly: boolean;
  hasDiscountOnly: boolean;
  sortBy: 'newest' | 'bestselling' | 'cheapest' | 'expensive' | 'discount' | 'popular';
}
