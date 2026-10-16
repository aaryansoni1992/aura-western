import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-1">
              Curated Wardrobe
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 mt-3 sm:mt-0 group"
          >
            <span>View All Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`group relative rounded-2xl overflow-hidden shadow-2xs hover:shadow-card transition-all duration-300 ${
                  isFeatured ? 'md:col-span-1 lg:col-span-2' : ''
                }`}
              >
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Gradient Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                  {cat.badge && (
                    <span className="inline-block self-start text-[10px] font-bold tracking-wider uppercase bg-rose-600 text-white px-2 py-0.5 rounded-full mb-2">
                      {cat.badge}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl leading-tight group-hover:text-rose-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-300 group-hover:text-white transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
