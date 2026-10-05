import React, { useState, useEffect, useRef } from 'react';
import { Laptop, ImageOff } from 'lucide-react';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatio?: string;
  showFallbackIcon?: boolean;
  fallbackIconType?: 'laptop' | 'image';
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackSrc,
  priority = false,
  aspectRatio,
  showFallbackIcon = true,
  fallbackIconType = 'laptop',
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Intersection observer for lazy loading trigger if not priority
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px', // Preload 250px before scrolling into view
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, src]);

  // Reset states if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && src !== fallbackSrc) {
      // Try fallback if available
      const target = e.currentTarget;
      target.src = fallbackSrc;
    } else {
      setHasError(true);
      setIsLoaded(true);
      if (onError) {
        onError(e);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${aspectRatio || ''} ${wrapperClassName}`}
    >
      {/* Skeleton Shimmer Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-100/90 animate-pulse flex items-center justify-center z-1">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Fallback Icon on Error */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100/80 text-slate-400 p-2 text-center select-none">
          {fallbackIconType === 'laptop' ? (
            <Laptop className="w-8 h-8 stroke-1 text-slate-400/80 mb-1" />
          ) : (
            <ImageOff className="w-7 h-7 stroke-1 text-slate-400/80 mb-1" />
          )}
          <span className="text-[10px] text-slate-400 font-medium truncate max-w-[90%]">
            {alt || 'تصویر در دسترس نیست'}
          </span>
        </div>
      ) : (
        isInView && (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`transition-opacity duration-300 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...rest}
          />
        )
      )}
    </div>
  );
};
