import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { createSupportWhatsAppUrl } from '../../utils/whatsapp';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-white py-12 lg:py-20 border-b border-rose-100/40">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-2xs text-xs font-semibold text-rose-700">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>New Spring/Summer 2026 Collection</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-slate-600">Across Rajasthan</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.12]">
              Your Style.{' '}
              <span className="text-aura-gradient">
                Your Statement.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Step into trendsetting western fashion designed for modern women across Rajasthan. Discover sculpted blazers, chic co-ord sets, fluid dresses, and luxury everyday essentials.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-base shadow-fashion hover:shadow-fashion-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/category/dresses-co-ord-sets"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-2xs transition-all duration-200"
              >
                <span>Explore Co-ords & Dresses</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-bold text-xl sm:text-2xl text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Curated Fits</p>
              </div>
              <div>
                <p className="font-bold text-xl sm:text-2xl text-slate-900">33+</p>
                <p className="text-xs text-slate-500 font-medium">Rajasthan Districts</p>
              </div>
              <div>
                <p className="font-bold text-xl sm:text-2xl text-slate-900">WhatsApp</p>
                <p className="text-xs text-slate-500 font-medium">Personalized Care</p>
              </div>
            </div>
          </div>

          {/* Right Fashion Imagery Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
                  alt="Aura Western Fashion Model"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold tracking-wider uppercase text-rose-300">
                    Signature Edit
                  </span>
                  <h3 className="text-xl font-bold font-display">
                    Modern Silhouettes & Tailoring
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Direct WhatsApp order confirmation
                  </p>
                </div>
              </div>

              {/* Floating Mini Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-rose-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Direct WhatsApp Checkout</p>
                  <p className="text-[11px] text-slate-500">Fast customer assistance</p>
                </div>
              </div>

              {/* Floating Pill Top Right */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Festive Edit 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
