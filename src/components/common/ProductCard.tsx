import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Sparkles, Star, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const primaryImage = product.images[0];
  const secondaryImage = product.images.length > 1 ? product.images[1] : product.images[0];
  const activeImage = isHovered ? secondaryImage : primaryImage;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-card transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image & Badges Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-slate-100"
      >
        <img
          src={activeImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white shadow-sm">
              <Star className="w-2.5 h-2.5 fill-white" />
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-600 text-white shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              New
            </span>
          )}
          {product.isTrending && !product.isBestSeller && !product.isNewArrival && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-600 text-white shadow-sm">
              <TrendingUp className="w-2.5 h-2.5" />
              Trending
            </span>
          )}
        </div>

        {/* Discount Tag */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-rose-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Quick Sizes Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex items-center justify-between text-white">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-200">
            Sizes:
          </span>
          <div className="flex gap-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="text-[10px] font-medium bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded text-white"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? 'ring-2 ring-rose-500 ring-offset-1 scale-110'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[11px] text-slate-400 ml-1">
                {product.colors.length} {product.colors.length === 1 ? 'colour' : 'colours'}
              </span>
            </div>
          )}

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-rose-600 transition-colors">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline or category */}
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            {product.tagline || product.material}
          </p>
        </div>

        {/* Pricing and Stock Status */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base sm:text-lg text-slate-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* In Stock / Low Stock status */}
          <div className="text-[11px]">
            {product.stock <= 0 ? (
              <span className="text-rose-500 font-semibold">Sold Out</span>
            ) : product.stock <= 5 ? (
              <span className="text-amber-600 font-medium">Only {product.stock} left</span>
            ) : (
              <span className="text-emerald-600 font-medium">In Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
