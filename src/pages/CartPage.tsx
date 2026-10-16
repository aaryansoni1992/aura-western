import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, FREE_DELIVERY_THRESHOLD } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  Tag,
  Check,
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    subtotal,
    appliedCoupon,
    discount,
    deliveryCharges,
    total,
    updateQuantity,
    removeFromCart,
    applyCouponCode,
    removeCoupon,
    revalidateCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [revalidationWarning, setRevalidationWarning] = useState<string[]>([]);

  // Calculate amount needed for free delivery
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput.trim());
    if (res.success) {
      setCouponFeedback({ text: res.message, isError: false });
      setCouponInput('');
    } else {
      setCouponFeedback({ text: res.message, isError: true });
    }
  };

  const handleProceedToCheckout = () => {
    // Revalidate cart before heading to checkout
    const result = revalidateCart();
    if (!result.valid) {
      setRevalidationWarning(result.changes);
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200/80 shadow-2xs">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Looks like you haven't added any trendy western outfits to your bag yet. Explore our latest arrivals!
          </p>
          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-sm shadow-fashion transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/shop" className="hover:text-rose-600 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Shopping Bag ({itemCount})</span>
        </nav>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-6">
          Shopping Bag
        </h1>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-rose-100 shadow-2xs">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            <div className="flex items-center gap-2 text-slate-800">
              <Truck className="w-4 h-4 text-rose-600" />
              {amountForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-rose-600">{formatCurrency(amountForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong> across Rajasthan!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Congratulations! You unlocked FREE Delivery across Rajasthan.
                </span>
              )}
            </div>
            <span className="text-slate-500 text-xs hidden sm:inline">
              Target: {formatCurrency(FREE_DELIVERY_THRESHOLD)}
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Revalidation Notice */}
        {revalidationWarning.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Items in your bag were updated to match current catalog stock and pricing:</span>
            </div>
            <ul className="list-disc list-inside pl-4 text-xs">
              {revalidationWarning.map((warning, idx) => (
                <li key={idx}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content: Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Thumbnail & Product Details */}
                  <div className="flex items-center gap-4 flex-1">
                    <Link to={`/product/${item.product.slug}`} className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-semibold text-slate-900 hover:text-rose-600 text-sm sm:text-base line-clamp-1 transition-colors"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                        <span>Size: <strong className="text-slate-800">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Colour: <strong className="text-slate-800">{item.selectedColor}</strong></span>
                      </div>

                      <div className="mt-2 text-xs font-semibold text-slate-900">
                        {formatCurrency(item.unitPrice)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Line Total */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[80px]">
                      <span className="font-bold text-slate-900 text-sm sm:text-base block">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>

                    {/* Remove Item */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove outfit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-rose-600 transition-colors"
              >
                &larr; <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              {/* Coupon Code Input */}
              <div>
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Discount Coupon
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. AURA10"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {/* Feedback Message */}
                {couponFeedback && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      couponFeedback.isError ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}

                {/* Applied Coupon Tag */}
                {appliedCoupon && (
                  <div className="mt-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon.code} Applied</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-rose-600 font-medium underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Calculation Line Items */}
              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Bag Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges (Rajasthan)</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryCharges === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                    ) : (
                      formatCurrency(deliveryCharges)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-slate-900 block">
                      Estimated Total
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Payment confirmed via WhatsApp
                    </span>
                  </div>
                  <span className="font-display font-bold text-2xl text-rose-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-fashion hover:shadow-fashion-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  No payment is processed now. Your order details will be validated before submitting to WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
