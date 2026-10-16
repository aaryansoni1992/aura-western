import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { formatCurrency } from '../utils/formatters';
import {
  ShoppingBag,
  Zap,
  Ruler,
  Check,
  AlertCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  ChevronRight,
  MessageCircle,
  Heart
} from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE, createSupportWhatsAppUrl } from '../utils/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useShop();
  const { addToCart, buyNow } = useCart();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Initialize variant defaults when product loads
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes.length === 1 ? product.sizes[0] : '');
      setSelectedColor(product.colors.length === 1 ? product.colors[0].name : '');
      setQuantity(1);
      setFeedbackMessage(null);
      window.scrollTo(0, 0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">
          Outfit Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested clothing item could not be found or may have been removed.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-fashion"
        >
          Explore All Styles
        </Link>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setFeedbackMessage({ text: 'Please select your size before adding to cart.', isError: true });
      return;
    }
    if (!selectedColor) {
      setFeedbackMessage({ text: 'Please select a colour before adding to cart.', isError: true });
      return;
    }
    if (quantity > product.stock) {
      setFeedbackMessage({
        text: `Cannot add more than available stock (${product.stock} available).`,
        isError: true
      });
      return;
    }

    const res = addToCart(product, selectedSize, selectedColor, quantity);
    if (res.success) {
      setFeedbackMessage({ text: `${product.name} added to cart!`, isError: false });
      setTimeout(() => setFeedbackMessage(null), 3500);
    } else {
      setFeedbackMessage({ text: res.message, isError: true });
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setFeedbackMessage({ text: 'Please select your size to proceed to checkout.', isError: true });
      return;
    }
    if (!selectedColor) {
      setFeedbackMessage({ text: 'Please select a colour to proceed to checkout.', isError: true });
      return;
    }
    if (quantity > product.stock) {
      setFeedbackMessage({
        text: `Cannot purchase more than available stock (${product.stock} available).`,
        isError: true
      });
      return;
    }

    const res = buyNow(product, selectedSize, selectedColor, quantity);
    if (res.success) {
      navigate('/checkout');
    } else {
      setFeedbackMessage({ text: res.message, isError: true });
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
          <Link to="/shop" className="hover:text-rose-600 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/category/${product.category}`} className="hover:text-rose-600 transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Feature Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-2xs border border-slate-200/60">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />

                {/* Discount Badge */}
                {product.discountPercent && product.discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.discountPercent}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-rose-600 ring-2 ring-rose-200 scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buy Info & Variant Selectors */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Category Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-rose-600">
                    Aura Western Exclusive
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Name */}
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-2 leading-tight">
                  {product.name}
                </h1>

                {/* Tagline */}
                {product.tagline && (
                  <p className="text-sm text-slate-500 mt-1">
                    {product.tagline}
                  </p>
                )}

                {/* Pricing Box */}
                <div className="mt-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-baseline gap-3">
                  <span className="text-3xl font-display font-bold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      Save {formatCurrency(product.originalPrice! - product.price)}
                    </span>
                  )}
                </div>

                {/* Stock Status Badge */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  {product.stock <= 0 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                      <AlertCircle className="w-4 h-4" />
                      Sold Out
                    </span>
                  ) : product.stock <= 5 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                      Hurry, only {product.stock} items left in stock!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      <Check className="w-4 h-4" />
                      In Stock & Ready to Dispatch across Rajasthan
                    </span>
                  )}
                </div>

                {/* Colour Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Colour: <span className="text-rose-600 normal-case">{selectedColor || 'Select a colour'}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'border-rose-600 ring-2 ring-rose-200 bg-rose-50/40 text-slate-900'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Size: <span className="text-rose-600 normal-case">{selectedSize || 'Select a size'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] h-11 px-3 rounded-xl border font-semibold text-xs sm:text-sm flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                              : 'border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-slate-900 min-w-[36px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        disabled={quantity >= product.stock}
                        onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-500">
                      Total: <strong>{formatCurrency(product.price * quantity)}</strong>
                    </span>
                  </div>
                </div>

                {/* Feedback Notification Alert */}
                {feedbackMessage && (
                  <div
                    className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      feedbackMessage.isError
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {feedbackMessage.isError ? (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    <span>{feedbackMessage.text}</span>
                  </div>
                )}

                {/* Action Buttons: Add to Cart & Buy Now */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 rounded-xl border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-fashion flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* WhatsApp Direct Inquire */}
                <div className="mt-3">
                  <a
                    href={createSupportWhatsAppUrl(
                      `Hello Aura Western! I am interested in "${product.name}" (Price: ${formatCurrency(product.price)}). Can you confirm availability and delivery to my Rajasthan address?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>Ask Stylist on WhatsApp (+91 76909 90903)</span>
                  </a>
                </div>
              </div>

              {/* Delivery & Assurance Guarantees */}
              <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Free delivery across Rajasthan on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Order review on WhatsApp with the store owner before payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Easy size exchange policy within 7 days across Rajasthan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description, Material and Care Tabs */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="font-display font-bold text-xl text-slate-900 mb-4">
              Product Overview & Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2">
                    Key Features & Fit
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 text-xs">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs text-slate-700">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                    Fabric & Composition
                  </span>
                  <p>{product.material}</p>
                </div>

                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                    Care Instructions
                  </span>
                  <p>{product.careInstructions}</p>
                </div>

                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                    Delivery Area
                  </span>
                  <p>All 33+ Districts of Rajasthan, India. Dispatched with tracking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Outfits Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
              Complete the Look — More in {product.category.replace(/-/g, ' ')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        categoryName={product.name}
      />
    </div>
  );
};
