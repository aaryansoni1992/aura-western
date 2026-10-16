import React from 'react';
import { ShieldCheck, Lock, EyeOff, Check } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-500">
                Aura Western — Respecting Your Privacy & Personal Data
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Zero Sensitive Financial Data Stored</span>
            </div>
            <p>
              Aura Western <strong>never collects, requests, or stores</strong> credit card numbers, debit card details, netbanking passwords, UPI PINs, or OTPs. All orders and payments are coordinated directly via official WhatsApp.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">1. Information We Collect</h2>
            <p>When you place an order request on our website, we only collect:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              <li>Your Full Name</li>
              <li>WhatsApp Mobile Number</li>
              <li>Complete Delivery Address & Rajasthan PIN Code</li>
              <li>Order Items & Variant Selections (Size, Colour, Qty)</li>
              <li>Optional Customer Notes / Instructions</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">2. How Your Information is Used</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              <li>To prepare and format your pre-filled WhatsApp order request.</li>
              <li>To enable delivery courier partners to dispatch parcels to your Rajasthan address.</li>
              <li>To provide order tracking updates via WhatsApp.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">3. Information Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal contact details to any third-party marketing agencies. Your address and phone number are strictly shared with trusted logistics partners to complete physical delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">4. Contacting Our Data Privacy Team</h2>
            <p>
              If you wish to review, update, or delete your customer order record from our records, please contact us on WhatsApp at <strong>{WHATSAPP_DISPLAY_PHONE}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
