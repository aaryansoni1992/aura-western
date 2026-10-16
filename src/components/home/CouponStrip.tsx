import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CouponStrip: React.FC = () => {
  const { coupons } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeCoupons = coupons.filter((c) => c.active);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  if (activeCoupons.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-rose-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Savings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Apply Discount Coupons at Checkout
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Click any voucher to copy the code and save directly on your WhatsApp order request!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCoupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/15 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-lg tracking-wider text-rose-300 bg-black/40 px-3 py-1 rounded-lg border border-rose-400/30">
                      {coupon.code}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium line-clamp-2 mt-1">
                    {coupon.description}
                  </p>
                  {coupon.minOrderValue > 0 && (
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Min. Order: ₹{coupon.minOrderValue.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-900 hover:bg-rose-100 hover:text-rose-900'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
