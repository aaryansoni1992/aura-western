import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';
import { RAJASTHAN_DISTRICTS, isValidRajasthanPincode, isValidIndianPhone } from '../utils/rajasthan';
import {
  buildOrderWhatsAppMessage,
  createWhatsAppUrl,
  generateOrderReference,
  WHATSAPP_DISPLAY_PHONE
} from '../utils/whatsapp';
import { formatCurrency } from '../utils/formatters';
import { Order, CustomerAddress } from '../types';
import {
  ShieldCheck,
  MessageCircle,
  Truck,
  Check,
  AlertCircle,
  ChevronRight,
  Info,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, appliedCoupon, discount, deliveryCharges, total, clearCart, revalidateCart } = useCart();
  const { saveNewOrder } = useShop();

  // Form State
  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: '',
    phone: '',
    houseFlat: '',
    streetLocality: '',
    landmark: '',
    city: '',
    district: 'Jaipur',
    pinCode: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If bag is empty, guide back to shop
  if (items.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-2xs">
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">No Items to Checkout</h2>
          <p className="text-sm text-slate-500 mb-6">
            Your shopping bag is currently empty. Please add an outfit before checkout.
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-fashion inline-block"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your 10-digit mobile number';
    } else if (!isValidIndianPhone(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210)';
    }

    if (!formData.houseFlat.trim()) {
      errors.houseFlat = 'Please enter house/flat/building name or number';
    }

    if (!formData.streetLocality.trim()) {
      errors.streetLocality = 'Please enter street, area or colony';
    }

    if (!formData.city.trim()) {
      errors.city = 'Please enter your city/town';
    }

    if (!formData.district) {
      errors.district = 'Please select your Rajasthan district';
    }

    if (!formData.pinCode.trim()) {
      errors.pinCode = 'Please enter your 6-digit PIN code';
    } else if (!isValidRajasthanPincode(formData.pinCode)) {
      errors.pinCode =
        'Please enter a valid Rajasthan PIN code (6 digits starting with 30, 31, 32, 33, or 34)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. Validate Form
    if (!validateForm()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    // 2. Revalidate Cart (prices & stock)
    const cartCheck = revalidateCart();
    if (!cartCheck.valid) {
      alert('Some items in your cart had updates. Please review your order summary.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Generate unique order reference
      const orderRef = generateOrderReference();

      // 4. Construct formatted WhatsApp order message
      const whatsappMessage = buildOrderWhatsAppMessage({
        orderReference: orderRef,
        customer: formData,
        items,
        subtotal,
        couponCode: appliedCoupon?.code,
        discount,
        deliveryCharges,
        total,
        notes: formData.notes
      });

      // 5. Create official wa.me link
      const whatsappUrl = createWhatsAppUrl(whatsappMessage);

      // 6. Create persistent order record
      const newOrder: Order = {
        reference: orderRef,
        customer: formData,
        items: items.map((item) => ({
          productName: item.product.name,
          slug: item.product.slug,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.totalPrice,
          image: item.product.images[0]
        })),
        subtotal,
        couponCode: appliedCoupon?.code,
        discount,
        deliveryCharges,
        total,
        status: 'Awaiting WhatsApp confirmation',
        paymentArrangement: 'Payment will be confirmed with Aura Western on WhatsApp.',
        whatsappUrl,
        whatsappOpened: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        statusTimeline: [
          {
            status: 'Awaiting WhatsApp confirmation',
            timestamp: new Date().toISOString(),
            note: 'Order request generated on website. Customer redirected to WhatsApp.'
          }
        ]
      };

      // Save order record
      saveNewOrder(newOrder);

      // Clear cart
      clearCart();

      // Attempt to open WhatsApp in a new tab
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocked, customer will be given manual button on confirmation page', err);
      }

      // Navigate to order confirmation summary page
      navigate(`/order-confirmation/${orderRef}`, { state: { order: newOrder, rawMessage: whatsappMessage } });
    } catch (err) {
      console.error('Failed to create order', err);
      alert('An unexpected error occurred while creating your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-rose-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/cart" className="hover:text-rose-600 transition-colors">
            Shopping Bag
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Delivery & WhatsApp Checkout</span>
        </nav>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-2">
          Checkout
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Enter your Rajasthan delivery address. Your order will be sent to Aura Western via WhatsApp for personal confirmation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery Address Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900 mb-1">
                  1. Customer & Delivery Address
                </h2>
                <p className="text-xs text-slate-500">
                  We currently deliver exclusively to all districts across Rajasthan, India.
                </p>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      formErrors.fullName
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-rose-500'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Mobile Number (WhatsApp) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength={14}
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                        formErrors.phone
                          ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                          : 'border-slate-200 focus:ring-rose-500'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* House / Flat & Street */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    House / Flat / Building <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="houseFlat"
                    value={formData.houseFlat}
                    onChange={handleInputChange}
                    placeholder="e.g. Flat 402, Sunshine Apts"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      formErrors.houseFlat
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-rose-500'
                    }`}
                  />
                  {formErrors.houseFlat && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.houseFlat}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Street, Locality & Area <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetLocality"
                    value={formData.streetLocality}
                    onChange={handleInputChange}
                    placeholder="e.g. Malviya Nagar, Sector 3"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      formErrors.streetLocality
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-rose-500'
                    }`}
                  />
                  {formErrors.streetLocality && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.streetLocality}</p>
                  )}
                </div>
              </div>

              {/* Landmark & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Landmark <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="e.g. Near World Trade Park"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    City / Town <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Jaipur"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      formErrors.city
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-rose-500'
                    }`}
                  />
                  {formErrors.city && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.city}</p>
                  )}
                </div>
              </div>

              {/* District & Rajasthan PIN code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Rajasthan District <span className="text-rose-600">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    {RAJASTHAN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Rajasthan PIN Code <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    maxLength={6}
                    placeholder="e.g. 302017"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      formErrors.pinCode
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:ring-rose-500'
                    }`}
                  />
                  {formErrors.pinCode ? (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.pinCode}</p>
                  ) : (
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Must start with 30, 31, 32, 33, or 34
                    </span>
                  )}
                </div>
              </div>

              {/* Customer Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Order Notes / Fitting Requirements <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Please deliver before weekend, or size advice needed on WhatsApp"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Clear Security & Privacy Assurance */}
              <div className="pt-4 border-t border-slate-100 p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Safe & Direct WhatsApp Order Process</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We <strong>never ask</strong> for credit/debit card numbers, UPI PINs, netbanking passwords, or OTPs on this website. All payment arrangements (UPI, bank transfer, or cash on delivery) are confirmed directly with Aura Western on WhatsApp.
                </p>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Place Order on WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Review Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-6 sticky top-28">
              <h2 className="font-display font-bold text-xl text-slate-900 pb-3 border-b border-slate-100">
                2. Order Review
              </h2>

              {/* Items List Snapshot */}
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg flex-shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Size: {item.selectedSize} • Colour: {item.selectedColor}
                      </p>
                      <span className="text-[11px] text-slate-500">
                        Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({appliedCoupon?.code})</span>
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
                    <span className="font-display font-bold text-base text-slate-900 block">
                      Estimated Payable Amount
                    </span>
                    <span className="text-[11px] text-slate-400">
                      To be confirmed on WhatsApp
                    </span>
                  </div>
                  <span className="font-display font-bold text-2xl text-rose-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Payment Terms Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Important Notice</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Opening WhatsApp will populate your order details. <strong>You must press "Send" in WhatsApp</strong> for the store owner to receive your order request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
