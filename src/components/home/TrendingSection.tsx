import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Sparkles, Flame, Award } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'bestsellers'>('trending');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    return true;
  }).slice(0, 8);

  // Fallback if filter returns less than 4
  const displayProducts = filteredProducts.length >= 4 ? filteredProducts : products.slice(0, 8);

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-1">
              Curated Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Trending Western Outfits
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('trending')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'trending'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'new'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Arrivals</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bestsellers')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Best Sellers</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-600 font-semibold text-sm border border-slate-200 shadow-2xs hover:shadow-card transition-all group"
          >
            <span>Explore All Outfits</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
