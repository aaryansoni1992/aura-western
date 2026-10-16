import React from 'react';
import { ShoppingBag, MessageCircle, MapPin, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';

export const BrandBenefits: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-1">
            The Aura Western Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Shopping Made Personal & Effortless
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Tailored fashion designed for Rajasthan, backed by direct personal service via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Easy Ordering */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-rose-200 hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mb-6 shadow-fashion">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              1. Easy Online Ordering
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore trendsetting collections, choose your perfect size & colour swatch, and enter your delivery address with zero complicated signups.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600">
              <CheckCircle className="w-4 h-4" />
              <span>Transparent Cart & Breakdown</span>
            </div>
          </div>

          {/* 2. WhatsApp Assistance */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-6 shadow-md">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              2. WhatsApp Order Confirmation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Submit your order request directly to our team on WhatsApp ({WHATSAPP_DISPLAY_PHONE}). Confirm real-time stock, payment method, and dispatch date personally.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600">
              <HeartHandshake className="w-4 h-4" />
              <span>Direct Human Support</span>
            </div>
          </div>

          {/* 3. Rajasthan Delivery */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center mb-6 shadow-md">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              3. Dedicated Rajasthan Delivery
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Serving customers across Jaipur, Jodhpur, Udaipur, Kota, Bikaner, and all Rajasthan districts with reliable courier tracking and doorstep delivery.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Free Delivery Above ₹999</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
