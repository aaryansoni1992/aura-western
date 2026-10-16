import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getCategoryBySlug } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  ChevronRight
} from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products } = useShop();

  const categoryInfo = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!categorySlug) return [];
    return products.filter((p) => p.category === categorySlug);
  }, [products, categorySlug]);

  // Extract sizes in this category
  const categorySizes = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [categoryProducts]);

  // Extract colours in this category
  const categoryColors = useMemo(() => {
    const map = new Map<string, string>();
    categoryProducts.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.hex);
        }
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [categoryProducts]);

  // Filter and sort
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        if (selectedPriceRange === 'under1000' && p.price >= 1000) return false;
        if (selectedPriceRange === '1000to2000' && (p.price < 1000 || p.price > 2000)) return false;
        if (selectedPriceRange === 'above2000' && p.price <= 2000) return false;
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;
        if (selectedColor !== 'all' && !p.colors.some((c) => c.name === selectedColor)) return false;
        if (inStockOnly && (p.stock <= 0 || !p.inStock)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 2 : b.isTrending ? 1 : 0) - (a.isBestSeller ? 2 : a.isTrending ? 1 : 0);
      });
  }, [categoryProducts, selectedPriceRange, selectedSize, selectedColor, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedPriceRange('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedPriceRange !== 'all' || selectedSize !== 'all' || selectedColor !== 'all' || inStockOnly;

  if (!categoryInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Category Not Found</h2>
        <p className="text-sm text-slate-500 mb-4">The category you requested does not exist.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm">
          Browse All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16">
      {/* Category Hero Banner */}
      <div className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={categoryInfo.imageUrl}
            alt={categoryInfo.name}
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-rose-300 font-semibold">{categoryInfo.name}</span>
          </nav>

          <div className="max-w-2xl">
            {categoryInfo.badge && (
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-rose-600 text-white px-3 py-1 rounded-full mb-3 shadow-xs">
                {categoryInfo.badge}
              </span>
            )}
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl">
              {categoryInfo.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-slate-600">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items in{' '}
            <span className="text-rose-600 font-semibold">{categoryInfo.name}</span>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-rose-600" />}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs sm:text-sm font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer text-xs sm:text-sm"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters and Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Filters
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Price</h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under ₹1,000', val: 'under1000' },
                    { label: '₹1,000 — ₹2,000', val: '1000to2000' },
                    { label: 'Above ₹2,000', val: 'above2000' },
                  ].map((p) => (
                    <label key={p.val} className="flex items-center gap-2 cursor-pointer text-slate-600">
                      <input
                        type="radio"
                        name="priceRangeCat"
                        checked={selectedPriceRange === p.val}
                        onChange={() => setSelectedPriceRange(p.val)}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {categorySizes.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Available Size</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedSize('all')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        selectedSize === 'all'
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      All
                    </button>
                    {categorySizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size === selectedSize ? 'all' : size)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                          selectedSize === size
                            ? 'bg-rose-600 border-rose-600 text-white'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* In Stock */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded border-slate-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-2xs">
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                  No Outfits Match Filters
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                  Try clearing your selected filters or check other categories.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-xs"
                >
                  Reset Category Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
