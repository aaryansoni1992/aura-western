import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Clock,
  Lock
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 border border-rose-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Rajasthan Delivery</h4>
              <p className="text-sm text-slate-400 mt-1">
                Fast doorstep courier dispatch across Jaipur, Jodhpur, Udaipur, Kota and all districts.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 border border-purple-500/20">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">WhatsApp Ordering</h4>
              <p className="text-sm text-slate-400 mt-1">
                Review your selections on site and send your order directly to our team via WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Personalized Confirmation</h4>
              <p className="text-sm text-slate-400 mt-1">
                Stock, size recommendations and payment details confirmed individually before dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-purple-500 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-lg">
                AW
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                Aura Western
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curated contemporary western wear designed for bold, modern women. Combining premium craftsmanship, trendsetting silhouettes, and personalized WhatsApp customer care across Rajasthan.
            </p>

            <div className="space-y-2 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Rajasthan, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={createSupportWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {WHATSAPP_DISPLAY_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Support: Mon – Sat (10:00 AM – 8:00 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/category/jackets-winter-wear"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Jackets & Winter Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/track-order" className="text-slate-400 hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Aura Western
                </Link>
              </li>
              <li>
                <a
                  href={createSupportWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
                >
                  WhatsApp Concierge &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Store Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shipping-policy" className="text-slate-400 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns-exchanges" className="text-slate-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="pt-8 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Aura Western. All rights reserved. Serving Rajasthan, India.
          </p>

          <div className="flex items-center gap-6">
            <span>Payment arranged via WhatsApp</span>
            <span>•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
              title="Store Owner Admin Panel"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
