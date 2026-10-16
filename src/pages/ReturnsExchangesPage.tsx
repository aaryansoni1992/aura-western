import React from 'react';
import { RotateCcw, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../utils/whatsapp';

export const ReturnsExchangesPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Returns & Exchanges Policy
              </h1>
              <p className="text-xs text-slate-500">
                Transparent & hassle-free size replacement policy
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg text-slate-900">1. Size Exchange Guarantee</h2>
            <p>
              We want you to feel stunning and confident in every Aura Western outfit. If a garment doesn't fit the way you hoped, we gladly offer a <strong>7-Day Size Exchange</strong> from the date of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg text-slate-900">2. Eligibility Conditions</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Garment must be unworn, unwashed, unaltered, and without fragrance or stains.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Original Aura Western tags and labels must remain attached.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Exchange request must be initiated within 7 calendar days of receipt.</span>
              </div>
              <div className="flex items-start gap-2 text-amber-700">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Accessories (earrings, hair pieces) are final sale due to hygiene standards.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg text-slate-900">3. How to Initiate an Exchange</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Message our customer support on WhatsApp (<strong>{WHATSAPP_DISPLAY_PHONE}</strong>).</li>
              <li>Provide your order reference (e.g. <code>AW-XXXXXX</code>) and photos of the garment with tags attached.</li>
              <li>Specify your preferred replacement size.</li>
              <li>Our team will arrange the reverse pickup or guide you with shipping instructions.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg text-slate-900">4. Damaged or Incorrect Garment</h2>
            <p>
              In the rare event that you receive a defective outfit or incorrect item, notify us on WhatsApp within 48 hours with unboxing photos/video. We will dispatch an immediate replacement at zero additional charge.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to exchange a garment?</span>
            <a
              href={createSupportWhatsAppUrl('Hello Aura Western! I would like to request an exchange for my order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contact for Exchange</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
