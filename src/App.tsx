import React, { useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CompareFloatingBar } from './components/compare/CompareFloatingBar';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { pageTransitionVariants } from './utils/animations';

// Eager load HomePage for instantaneous Initial Page Load (LCP)
import { HomePage } from './pages/HomePage';

// Lazy load other pages for optimal bundle size and fast initial load
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage').then(m => ({ default: m.OrderSuccessPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then(m => ({ default: m.AccountPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then(m => ({ default: m.AuthPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then(m => ({ default: m.TrackOrderPage })));
const BrandsPage = lazy(() => import('./pages/BrandsPage').then(m => ({ default: m.BrandsPage })));
const DiscountsPage = lazy(() => import('./pages/DiscountsPage').then(m => ({ default: m.DiscountsPage })));
const BlogListPage = lazy(() => import('./pages/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));

const AboutPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.FAQPage })));
const WarrantyPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.WarrantyPage })));
const TermsPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.PrivacyPage })));
const ShippingPolicyPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.ShippingPolicyPage })));
const ReturnsPolicyPage = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.ReturnsPolicyPage })));

// Sleek lightweight loading fallback
const PageFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-slate-400">
    <div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-3" />
    <span className="text-xs font-medium text-slate-500 animate-pulse">در حال بارگذاری...</span>
  </div>
);

const AppContent: React.FC = () => {
  const { currentRoute, routeParam } = useStore();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParam]);

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage slug={routeParam} />;
      case 'compare':
        return <ComparePage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage orderId={routeParam} />;
      case 'account':
        return (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        );
      case 'auth':
      case 'login':
      case 'register':
      case 'forgot-password':
        return <AuthPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'tracking':
        return <TrackOrderPage />;
      case 'brands':
        return <BrandsPage />;
      case 'discounts':
        return <DiscountsPage />;
      case 'blog':
        return <BlogListPage />;
      case 'blog-post':
        return <BlogPostPage slug={routeParam} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'warranty':
        return <WarrantyPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'shipping':
        return <ShippingPolicyPage />;
      case 'returns':
        return <ReturnsPolicyPage />;
      case 'search':
        return <ShopPage />;
      default:
        return <HomePage />;
    }
  };

  // Dedicated Admin layout when on admin routes
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-purple-600 selection:text-white" dir="rtl">
        <AnimatePresence mode="wait">
          <motion.div
            key="admin-page"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Suspense fallback={<PageFallback />}>
              {renderRoute()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200" dir="rtl">
      <Navbar />
      <div className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.main
            key={`${currentRoute}-${routeParam || ''}`}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1"
          >
            <Suspense fallback={<PageFallback />}>
              {renderRoute()}
            </Suspense>
          </motion.main>
        </AnimatePresence>
      </div>
      <Footer />
      <CompareFloatingBar />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}
