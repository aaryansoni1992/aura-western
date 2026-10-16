import React from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Terms and Conditions
              </h1>
              <p className="text-xs text-slate-500">
                Aura Western — General E-Commerce Store Terms
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. Aura Western reserves the right to modify these terms as needed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">2. Business Model & Order Flow</h2>
            <p>
              Aura Western operates an online catalog with direct WhatsApp order submission. Generating an order reference on the website creates an <em>order request</em>. The customer must manually send the generated WhatsApp message to <strong>{WHATSAPP_DISPLAY_PHONE}</strong>.
            </p>
            <p className="text-xs text-slate-500 italic">
              Opening WhatsApp alone does not constitute a confirmed contract of sale until the store owner verifies stock availability, payable total, and delivery dispatch details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">3. Pricing & Discounts</h2>
            <p>
              All prices are listed in Indian Rupees (₹). While we strive for absolute accuracy, in the event of an inadvertent typographical error or system discrepancy, Aura Western reserves the right to inform the customer and adjust or cancel the order request.
            </p>
            <p>
              Coupons are subject to minimum order thresholds and individual validity periods. Aura Western reserves the right to withdraw promotional codes at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">4. Payment Terms</h2>
            <p>
              Payments are arranged directly between the customer and Aura Western via WhatsApp (using official UPI IDs, direct bank transfer, or agreed Cash on Delivery). Customers must never share confidential PINs or OTPs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-lg text-slate-900">5. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of Rajasthan, India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Rajasthan.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
