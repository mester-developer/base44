import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryBento } from '../components/home/CategoryBento';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ProductStorySection } from '../components/home/ProductStorySection';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { BrandLogosSection } from '../components/home/BrandLogosSection';
import { PromoBannerSection } from '../components/home/PromoBannerSection';
import { WhyNexoraSection } from '../components/home/WhyNexoraSection';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { BlogPreviewSection } from '../components/home/BlogPreviewSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 3. Hero */}
      <HeroSection />

      {/* 4. Product categories */}
      <CategoryBento />

      {/* 5. Featured products */}
      <FeaturedProductsSection />

      {/* 6. Hardware Architecture & Story */}
      <ProductStorySection />

      {/* 7. Best sellers */}
      <BestSellersSection />

      {/* 8. Brands */}
      <BrandLogosSection />

      {/* 9. Promotional banner */}
      <PromoBannerSection />

      {/* 10. Why buy from NEXORA */}
      <WhyNexoraSection />

      {/* 11. Customer reviews */}
      <CustomerReviewsSection />

      {/* 12. Blog preview */}
      <BlogPreviewSection />
    </main>
  );
};
