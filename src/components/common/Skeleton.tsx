import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  rounded?: string;
  animateShimmer?: boolean;
}

/**
 * Base animated Skeleton component with shimmer effect using Framer Motion & Tailwind
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  rounded = 'rounded-xl',
  animateShimmer = true,
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200/80 ${rounded} ${className}`}
      aria-hidden="true"
    >
      {/* Gentle breathing background pulse */}
      <motion.div
        className="absolute inset-0 bg-slate-300/40"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Elegant directional shimmer wave */}
      {animateShimmer && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: [0.4, 0, 0.2, 1],
            repeatDelay: 0.2,
          }}
        />
      )}
    </div>
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
  lineHeight?: string;
}> = ({
  lines = 2,
  className = '',
  lastLineWidth = 'w-3/5',
  lineHeight = 'h-3.5',
}) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1;
        const widthClass = isLast && lines > 1 ? lastLineWidth : idx === 1 ? 'w-4/5' : 'w-full';
        return (
          <Skeleton
            key={idx}
            className={`${lineHeight} ${widthClass}`}
            rounded="rounded-md"
          />
        );
      })}
    </div>
  );
};

export const SkeletonCircle: React.FC<{ size?: string; className?: string }> = ({
  size = 'w-9 h-9',
  className = '',
}) => {
  return <Skeleton className={`${size} ${className}`} rounded="rounded-full" />;
};

export const SkeletonButton: React.FC<{ className?: string; height?: string }> = ({
  className = 'w-full',
  height = 'h-10',
}) => {
  return <Skeleton className={`${height} ${className}`} rounded="rounded-xl" />;
};

/**
 * Product Card Skeleton that matches the exact layout of Laptop ProductCard
 */
export const ProductCardSkeleton: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between select-none shadow-2xs"
    >
      <div>
        {/* Top bar: Badge & Wishlist/Compare buttons */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Skeleton className="h-5 w-18" rounded="rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-7 h-7" rounded="rounded-lg" />
            <Skeleton className="w-7 h-7" rounded="rounded-lg" />
          </div>
        </div>

        {/* Laptop Image Placeholder */}
        <div className="relative w-full h-44 sm:h-48 bg-slate-100/70 rounded-xl overflow-hidden mb-3 p-4 flex items-center justify-center">
          <Skeleton className="w-4/5 h-3/4" rounded="rounded-lg" />
        </div>

        {/* Brand */}
        <Skeleton className="h-3 w-16 mb-2" rounded="rounded-md" />

        {/* Laptop Name (2 lines) */}
        <div className="space-y-1.5 mb-2.5">
          <Skeleton className="h-4 w-full" rounded="rounded-md" />
          <Skeleton className="h-4 w-3/4" rounded="rounded-md" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Skeleton className="w-4 h-4" rounded="rounded-sm" />
          <Skeleton className="h-3 w-8" rounded="rounded-md" />
          <Skeleton className="h-3 w-12" rounded="rounded-md" />
        </div>

        {/* Specs Pill */}
        <Skeleton className="h-6 w-full mb-3" rounded="rounded-md" />
      </div>

      {/* Pricing & Button */}
      <div className="pt-2 border-t border-slate-100 mt-1">
        <div className="flex flex-col mb-3">
          <Skeleton className="h-3 w-20 mb-1.5" rounded="rounded-md" />
          <Skeleton className="h-5 w-28" rounded="rounded-md" />
        </div>
        <Skeleton className="h-10 w-full" rounded="rounded-xl" />
      </div>
    </motion.div>
  );
};

/**
 * Grid of product card skeletons for listing view
 */
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} delay={idx * 0.04} />
      ))}
    </div>
  );
};

/**
 * Comprehensive Product Detail Page Skeleton
 */
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="py-8 bg-slate-50 text-right min-h-screen"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-3.5 w-12" rounded="rounded-md" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-3.5 w-24" rounded="rounded-md" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-3.5 w-16" rounded="rounded-md" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-3.5 w-36" rounded="rounded-md" />
        </div>

        {/* Main Product Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 mb-8 shadow-2xs">
          {/* Gallery Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="relative aspect-4/3 w-full bg-slate-100/70 rounded-xl overflow-hidden p-6 mb-4 flex items-center justify-center">
                <Skeleton className="w-5/6 h-5/6" rounded="rounded-xl" />
              </div>
              {/* Thumbnails row */}
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Skeleton className="w-20 h-16 shrink-0" rounded="rounded-lg" />
                <Skeleton className="w-20 h-16 shrink-0" rounded="rounded-lg" />
                <Skeleton className="w-20 h-16 shrink-0" rounded="rounded-lg" />
                <Skeleton className="w-20 h-16 shrink-0" rounded="rounded-lg" />
              </div>
            </div>

            {/* Guarantee badges row */}
            <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100">
              <Skeleton className="h-10 w-full" rounded="rounded-xl" />
              <Skeleton className="h-10 w-full" rounded="rounded-xl" />
            </div>
          </div>

          {/* Details & Info Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Brand & Rating Header */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <Skeleton className="h-6 w-20" rounded="rounded-md" />
                <Skeleton className="h-5 w-28" rounded="rounded-md" />
              </div>

              {/* Title & Subtitle */}
              <Skeleton className="h-7 w-5/6 mb-2" rounded="rounded-lg" />
              <Skeleton className="h-4 w-1/2 mb-5" rounded="rounded-md" />

              {/* Short Description */}
              <SkeletonText lines={3} className="mb-6" />

              {/* 4 Core Specs Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                  >
                    <Skeleton className="h-4 w-16" rounded="rounded-md" />
                    <Skeleton className="h-3.5 w-20" rounded="rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Box & CTA Skeleton */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Skeleton className="h-3 w-20 mb-1.5" rounded="rounded-md" />
                  <Skeleton className="h-7 w-36" rounded="rounded-lg" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-28" rounded="rounded-xl" />
                  <Skeleton className="h-10 w-36" rounded="rounded-xl" />
                </div>
              </div>

              {/* Action buttons (Wishlist & Compare) */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                <Skeleton className="h-8 w-28" rounded="rounded-lg" />
                <Skeleton className="h-8 w-28" rounded="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Tab Skeleton */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          {/* Tabs bar */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-6">
            <Skeleton className="h-9 w-32" rounded="rounded-xl" />
            <Skeleton className="h-9 w-28" rounded="rounded-xl" />
            <Skeleton className="h-9 w-28" rounded="rounded-xl" />
          </div>

          {/* Table rows skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50/70"
              >
                <Skeleton className="h-4 w-28" rounded="rounded-md" />
                <Skeleton className="h-4 w-48" rounded="rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Filter Sidebar Skeleton
 */
export const FilterSidebarSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <Skeleton className="h-4 w-24" rounded="rounded-md" />
        <Skeleton className="h-4 w-12" rounded="rounded-md" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3.5 w-20 mb-2" rounded="rounded-md" />
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-7 w-full" rounded="rounded-lg" />
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <Skeleton className="h-3.5 w-24 mb-2" rounded="rounded-md" />
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-7 w-full" rounded="rounded-lg" />
        ))}
      </div>
    </div>
  );
};
