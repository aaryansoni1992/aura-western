import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop"
              alt="Aura Western Promotional Edit"
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 md:py-20 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Summer Edit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Elevate Your Everyday Western Aesthetic
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Curated co-ord sets, breathable linen separates, and bold party tops made for sunny days and glamorous Rajasthan evenings.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/category/dresses-co-ord-sets"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-sm shadow-fashion transition-all"
              >
                <span>Shop Co-ord Sets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all"
              >
                <span>View Full Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
