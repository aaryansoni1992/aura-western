import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Our Story & Philosophy</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight">
            About Aura Western
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Curated western fashion celebrating confidence, individuality, and effortless modern glamour across Rajasthan, India.
          </p>
        </div>

        {/* Brand Story Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-8">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Aura Western Fashion Editorial"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="font-display font-bold text-2xl text-slate-900">
            Redefining Contemporary Western Fashion in Rajasthan
          </h2>

          <p>
            Born out of a passion for vibrant, trendsetting silhouettes, <strong>Aura Western</strong> bridges the gap between global runway trends and the everyday style needs of modern Indian women. From chic satin slip dresses and coordinated resort wear to structured power blazers and tailored denim, every garment in our collection is handpicked for fit, feel, and flair.
          </p>

          <p>
            Operating across Rajasthan — from Jaipur and Jodhpur to Udaipur, Kota, and every district in between — we prioritize quality, honest pricing, and a smooth, personalized shopping experience.
          </p>

          <h3 className="font-display font-bold text-xl text-slate-900 pt-4">
            Why We Order via WhatsApp
          </h3>

          <p>
            Unlike impersonal e-commerce websites where automated bots handle your queries, Aura Western gives you direct access to the store owner and fashion stylists. When you place an order request on our website, you connect directly with our team on WhatsApp (<strong>{WHATSAPP_DISPLAY_PHONE}</strong>).
          </p>

          <p>
            We personally assist you with sizing advice, confirm real-time fabric feel and stock availability, and coordinate delivery directly to your doorstep.
          </p>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
              <Heart className="w-5 h-5 text-rose-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Trendsetting Silhouettes</h4>
              <p className="text-xs text-slate-600 mt-1">
                Bold colors, premium draping, and contemporary western cuts.
              </p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <Truck className="w-5 h-5 text-purple-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Rajasthan-Wide Delivery</h4>
              <p className="text-xs text-slate-600 mt-1">
                Reliable doorstep dispatch across all 33+ Rajasthan districts.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">Personal Stylist Care</h4>
              <p className="text-xs text-slate-600 mt-1">
                One-on-one size recommendations and order confirmation.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-900 text-sm">Have styling questions?</p>
              <p className="text-xs text-slate-500">Our team is available on WhatsApp daily.</p>
            </div>
            <a
              href={createSupportWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
