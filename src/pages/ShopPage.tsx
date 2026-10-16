import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/categories';
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search param sync
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Available sizes extracted from products
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  // Available unique colours extracted from products
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.hex);
        }
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedPriceRange('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedPriceRange !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    inStockOnly;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search text filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTagline = p.tagline?.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchDesc && !matchCat) {
            return false;
          }
        }

        // Price range filter
        if (selectedPriceRange === 'under1000' && p.price >= 1000) return false;
        if (selectedPriceRange === '1000to2000' && (p.price < 1000 || p.price > 2000)) return false;
        if (selectedPriceRange === 'above2000' && p.price <= 2000) return false;

        // Size filter
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;

        // Colour filter
        if (selectedColor !== 'all' && !p.colors.some((c) => c.name === selectedColor)) return false;

        // Availability filter
        if (inStockOnly && (p.stock <= 0 || !p.inStock)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default 'featured'
        return (b.isBestSeller ? 2 : b.isTrending ? 1 : 0) - (a.isBestSeller ? 2 : a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, selectedPriceRange, selectedSize, selectedColor, inStockOnly, sortBy]);

  const visibleProducts = filteredProducts.slice(0, itemsPerPage);
  const canLoadMore = itemsPerPage < filteredProducts.length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">All Outfits</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
                Aura Western Collection
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Showing {filteredProducts.length} styles crafted for Rajasthan's modern fashion lovers
              </p>
            </div>

            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 shadow-2xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-rose-600" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                )}
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs sm:text-sm font-medium">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dresses, co-ords, tops, jeans, jackets, accessories..."
            className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border border-slate-200 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs">
            <span className="font-semibold text-rose-800">Active Filters:</span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                Search: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                Price: {selectedPriceRange}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPriceRange('all')} />
              </span>
            )}

            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                Size: {selectedSize}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSize('all')} />
              </span>
            )}

            {selectedColor !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                Colour: {selectedColor}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedColor('all')} />
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-rose-200 text-rose-700 font-medium">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-rose-600" />
                  <span>Refine Catalog</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Category
                </h4>
                <div className="space-y-1 text-sm">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-rose-50 text-rose-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {CATEGORIES.map((cat) => {
                    const count = products.filter((p) => p.category === cat.slug).length;
                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedCategory === cat.slug
                            ? 'bg-rose-50 text-rose-600 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] text-slate-400">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Price Range
                </h4>
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
                        name="priceRange"
                        checked={selectedPriceRange === p.val}
                        onChange={() => setSelectedPriceRange(p.val)}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Size
                </h4>
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
                  {allSizes.map((size) => (
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

              {/* Colours */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Colours
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedColor('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                      selectedColor === 'all'
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    All
                  </button>
                  {allColors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor === c.name
                          ? 'ring-2 ring-rose-500 ring-offset-2 scale-110'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                  />
                  <span>In Stock Outfits Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {canLoadMore && (
                  <div className="mt-12 text-center">
                    <button
                      type="button"
                      onClick={() => setItemsPerPage((prev) => prev + 12)}
                      className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 shadow-2xs hover:shadow-card transition-all"
                    >
                      Load More Styles ({filteredProducts.length - visibleProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-2xs">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                  No Matching Outfits Found
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  We couldn't find any clothing matching your current filters or search query. Try clearing filters to see the full collection.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-fashion"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- Mobile Filters Drawer --- */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Filters & Sorting
              </h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-medium"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Price Range</h4>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-medium"
                >
                  <option value="all">All Prices</option>
                  <option value="under1000">Under ₹1,000</option>
                  <option value="1000to2000">₹1,000 — ₹2,000</option>
                  <option value="above2000">Above ₹2,000</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Size</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['all', ...allSizes].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        selectedSize === s
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {s === 'all' ? 'All' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-xs"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
