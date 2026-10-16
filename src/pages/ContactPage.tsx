import React, { useState } from 'react';
import { MessageCircle, MapPin, Clock, Phone, Send, Check } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    // Build WhatsApp message from contact inquiry
    const text = `Hello Aura Western!
Name: ${form.name}
Phone: ${form.phone || 'Not provided'}
Message: ${form.message}`;

    window.open(createSupportWhatsAppUrl(text), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-1">
            We Are Here For You
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
            Contact Aura Western
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Have questions about clothing fit, wholesale orders, or Rajasthan delivery? Connect directly with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
                Official Contact
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                    <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      WhatsApp Orders & Support
                    </span>
                    <a
                      href={createSupportWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      {WHATSAPP_DISPLAY_PHONE}
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Fastest response for sizing & orders
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Operational Region
                    </span>
                    <p className="font-semibold text-slate-900">Rajasthan, India</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Serving Jaipur, Jodhpur, Udaipur, Kota, and all districts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Customer Care Hours
                    </span>
                    <p className="font-semibold text-slate-900">
                      Monday — Saturday
                    </p>
                    <p className="text-[11px] text-slate-500">
                      10:00 AM — 8:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={createSupportWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your message and click submit to open a pre-filled WhatsApp conversation with our team.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>WhatsApp conversation opened! Send the pre-filled text in your WhatsApp app.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Neha Jain"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Message / Question <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what outfit or sizing guidance you need..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-fashion transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
