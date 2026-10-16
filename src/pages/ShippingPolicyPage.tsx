import React from 'react';
import { Truck, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Shipping & Delivery Policy
              </h1>
              <p className="text-xs text-slate-500">
                Aura Western — Rajasthan Regional Delivery Guidelines
              </p>
            </div>
          </div>

          <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs text-rose-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Service Area: Entire State of Rajasthan</span>
            </p>
            <p>
              Aura Western proudly delivers to customers residing in all districts of Rajasthan, India.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">1. Delivery Charges</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>Orders Above ₹999:</strong> FREE Delivery across all Rajasthan PIN codes.</li>
              <li><strong>Orders Under ₹999:</strong> Flat delivery charge of <strong>₹79</strong>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">2. Processing & Dispatch Timeline</h2>
            <p>
              Once your order is confirmed with the owner on WhatsApp, items are carefully inspected, hand-packed, and dispatched from our Rajasthan hub within <strong>24 to 48 hours</strong> (excluding Sundays and national holidays).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">3. Estimated Delivery Times</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>Jaipur & Major Cities:</strong> 2 to 3 business days.</li>
              <li><strong>Other Rajasthan Districts & Tehsils:</strong> 3 to 5 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">4. Order Tracking</h2>
            <p>
              As soon as your package is dispatched, your courier details and tracking updates will be shared directly with you via WhatsApp ({WHATSAPP_DISPLAY_PHONE}). You can also enter your order reference on our <a href="/track-order" className="text-rose-600 underline font-semibold">Track Order</a> page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">5. Delivery Issues or Delays</h2>
            <p>
              If your parcel experiences unexpected transit delays due to weather or local conditions, message our WhatsApp support team with your order reference for immediate assistance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
