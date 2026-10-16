import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { WHATSAPP_DISPLAY_PHONE, createWhatsAppUrl } from '../utils/whatsapp';
import confetti from 'canvas-confetti';
import {
  MessageCircle,
  Copy,
  Check,
  Clock,
  ExternalLink,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  FileText
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const location = useLocation();
  const { getOrder } = useShop();

  const [order, setOrder] = useState<Order | undefined>(() => {
    // Check if passed via state
    if (location.state?.order) return location.state.order;
    if (reference) return getOrder(reference);
    return undefined;
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order && reference) {
      const found = getOrder(reference);
      if (found) setOrder(found);
    }
  }, [reference, getOrder, order]);

  // Launch celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti fails
    }
  }, []);

  const handleCopyMessage = () => {
    if (!order) return;
    // Extract text from order or reconstruct
    const text = decodeURIComponent(order.whatsappUrl.replace(/^https:\/\/wa\.me\/[0-9]+\?text=/, ''));
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!order) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-2xs">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Order Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't locate an order request with reference "{reference}".
          </p>
          <Link
            to="/track-order"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm inline-block"
          >
            Track An Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Order Request {order.reference}</span>
        </nav>

        {/* Primary Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card text-center mb-8 relative overflow-hidden">
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500" />

          {/* Icon Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <MessageCircle className="w-10 h-10 fill-emerald-600 text-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Step 2 of 2: Final WhatsApp Submission</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900">
            Order Request Generated!
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
            Your unique order reference is <strong className="text-slate-900 font-mono">{order.reference}</strong>.
            Please ensure you have pressed <strong>"Send"</strong> in WhatsApp to transmit your order details to Aura Western.
          </p>

          {/* WhatsApp Direct Action Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={order.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Open WhatsApp & Send Order</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className={`w-full sm:w-auto px-6 py-4 rounded-xl border-2 font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                copied
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Order Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Message Manually</span>
                </>
              )}
            </button>
          </div>

          {/* Crucial WhatsApp Clarification Notice */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-left max-w-xl mx-auto flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">Did WhatsApp not open automatically?</p>
              <p className="leading-relaxed">
                Click <strong>"Copy Message Manually"</strong>, open WhatsApp on your phone or computer, start a chat with <strong>{WHATSAPP_DISPLAY_PHONE}</strong>, and paste your order details.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900">
                Order Request Summary
              </h2>
              <p className="text-xs text-slate-500">
                Created on {formatDateTime(order.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Current Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Address Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-2">
                Customer Details
              </h3>
              <p className="font-semibold text-slate-900 text-sm">{order.customer.fullName}</p>
              <p className="mt-1">Phone: +91 {order.customer.phone}</p>
              {order.customer.notes && (
                <p className="mt-1 text-slate-500 italic">Notes: "{order.customer.notes}"</p>
              )}
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-2">
                Rajasthan Delivery Destination
              </h3>
              <p>
                {order.customer.houseFlat}, {order.customer.streetLocality}
              </p>
              {order.customer.landmark && <p>Landmark: {order.customer.landmark}</p>}
              <p className="font-semibold text-slate-900">
                {order.customer.city}, District: {order.customer.district}
              </p>
              <p>PIN Code: {order.customer.pinCode}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
              Order Items ({order.items.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-14 object-cover rounded-lg flex-shrink-0 border border-slate-200"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.productName}</h4>
                      <p className="text-xs text-slate-500">
                        Size: <strong>{item.size}</strong> • Colour: <strong>{item.color}</strong> • Qty: <strong>{item.quantity}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(item.lineTotal)}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {formatCurrency(item.unitPrice)} each
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">{formatCurrency(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Coupon Discount ({order.couponCode})</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges (Rajasthan)</span>
              <span className="font-semibold text-slate-900">
                {order.deliveryCharges === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                ) : (
                  formatCurrency(order.deliveryCharges)
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="font-display font-bold text-base sm:text-lg text-slate-900 block">
                  Estimated Total
                </span>
                <span className="text-[11px] text-slate-400">
                  Payment confirmed on WhatsApp
                </span>
              </div>
              <span className="font-display font-bold text-2xl text-rose-600">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to={`/track-order?ref=${order.reference}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
            >
              <FileText className="w-4 h-4" />
              <span>Track Live Status for #{order.reference} &rarr;</span>
            </Link>

            <Link
              to="/shop"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
