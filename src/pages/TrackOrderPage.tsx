import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../utils/whatsapp';
import {
  Search,
  Clock,
  CheckCircle,
  Truck,
  Package,
  AlertCircle,
  MessageCircle,
  XCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const STATUS_STEPS: OrderStatus[] = [
  'Awaiting WhatsApp confirmation',
  'Order confirmed',
  'Payment pending',
  'Processing',
  'Shipped',
  'Delivered'
];

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder } = useShop();

  const refParam = searchParams.get('ref') || '';
  const [inputRef, setInputRef] = useState(refParam);
  const [searchedOrder, setSearchedOrder] = useState<Order | undefined>(() => {
    return refParam ? getOrder(refParam) : undefined;
  });
  const [hasSearched, setHasSearched] = useState(Boolean(refParam));

  useEffect(() => {
    if (refParam) {
      setInputRef(refParam);
      const found = getOrder(refParam);
      setSearchedOrder(found);
      setHasSearched(true);
    }
  }, [refParam, getOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputRef.trim();
    if (!clean) return;

    setSearchParams({ ref: clean });
    const found = getOrder(clean);
    setSearchedOrder(found);
    setHasSearched(true);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'text-emerald-700 bg-emerald-100 border-emerald-300';
      case 'Shipped':
      case 'Processing':
        return 'text-purple-700 bg-purple-100 border-purple-300';
      case 'Order confirmed':
        return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'Cancelled':
        return 'text-rose-700 bg-rose-100 border-rose-300';
      default:
        return 'text-amber-800 bg-amber-100 border-amber-300';
    }
  };

  const currentStepIndex = searchedOrder
    ? STATUS_STEPS.indexOf(searchedOrder.status)
    : -1;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Track Order</span>
        </nav>

        {/* Search Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xs mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8" />
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Track Your Order Request
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
            Enter your unique order reference (e.g. <strong>AW-849201</strong>) received upon completing the checkout form.
          </p>

          <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value.toUpperCase())}
                placeholder="Enter AW-XXXXXX"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-mono tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-sm shadow-fashion transition-all"
            >
              Track
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          searchedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-8 animate-fade-in">
              {/* Reference & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Order Reference
                  </span>
                  <h2 className="font-mono font-bold text-2xl text-slate-900">
                    {searchedOrder.reference}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Requested on {formatDateTime(searchedOrder.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(searchedOrder.status)}`}>
                    {searchedOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Visual Timeline */}
              {searchedOrder.status !== 'Cancelled' ? (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-6">
                    Fulfillment Progress
                  </h3>

                  <div className="relative">
                    <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-slate-100">
                      <div
                        style={{
                          width: `${Math.max(10, ((currentStepIndex + 1) / STATUS_STEPS.length) * 100)}%`
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 transition-all duration-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
                      {STATUS_STEPS.map((step, idx) => {
                        const isDone = currentStepIndex >= idx;
                        const isCurrent = currentStepIndex === idx;
                        return (
                          <div key={step} className="p-2 rounded-xl flex flex-col items-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                                isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-400'
                              } ${isCurrent ? 'ring-2 ring-rose-500 ring-offset-2' : ''}`}
                            >
                              {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[11px] leading-tight font-medium ${
                                isCurrent
                                  ? 'font-bold text-rose-600'
                                  : isDone
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-xs font-medium">This order request was cancelled. Contact us on WhatsApp if you need assistance.</span>
                </div>
              )}

              {/* Order Status History Log */}
              {searchedOrder.statusTimeline && searchedOrder.statusTimeline.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                    Status Updates History
                  </h3>
                  <div className="space-y-3">
                    {searchedOrder.statusTimeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-900">{item.status}</span>
                          {item.note && <p className="text-slate-600 mt-0.5">{item.note}</p>}
                        </div>
                        <span className="text-slate-400 font-medium">
                          {formatDateTime(item.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items & Delivery Area Details */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Delivery Address (Rajasthan)
                  </h4>
                  <p className="font-semibold text-slate-900">{searchedOrder.customer.fullName}</p>
                  <p>{searchedOrder.customer.houseFlat}, {searchedOrder.customer.streetLocality}</p>
                  <p>{searchedOrder.customer.city}, District: {searchedOrder.customer.district}</p>
                  <p>PIN Code: {searchedOrder.customer.pinCode}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Order Items ({searchedOrder.items.length})
                  </h4>
                  <ul className="space-y-1.5 divide-y divide-slate-200/50">
                    {searchedOrder.items.map((item, i) => (
                      <li key={i} className="pt-1.5 first:pt-0 flex justify-between">
                        <span>
                          {item.productName} ({item.size}, {item.color}) × {item.quantity}
                        </span>
                        <span className="font-bold">{formatCurrency(item.lineTotal)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Total Amount:</span>
                    <span className="text-rose-600">{formatCurrency(searchedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support Action */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Questions regarding delivery or sizing?
                </p>
                <a
                  href={createSupportWhatsAppUrl(
                    `Hello Aura Western! I am checking status on my order reference ${searchedOrder.reference}. Please provide the latest update.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire on WhatsApp (+91 76909 90903)</span>
                </a>
              </div>
            </div>
          ) : (
            /* Order Not Found */
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-2xs">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                No Record Found for "{inputRef}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                Please verify your order reference. If you recently sent your order on WhatsApp, kindly note that references begin with <strong>AW-</strong>.
              </p>
              <a
                href={createSupportWhatsAppUrl(
                  `Hello Aura Western! I placed an order with reference "${inputRef}" and would like to verify its status.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Owner on WhatsApp</span>
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};
