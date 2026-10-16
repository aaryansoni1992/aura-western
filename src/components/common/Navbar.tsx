import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  MessageCircle,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { createSupportWhatsAppUrl } from '../../utils/whatsapp';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { products } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products for live search preview
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100/60'
            : 'bg-white border-b border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Trigger & Quick Links */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-slate-700 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-700 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                aria-label="Search clothing"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Aura Western Brand Logo Treatment */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link to="/" className="inline-flex flex-col items-center lg:items-start group">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                    AW
                  </div>
                  <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                    Aura Western
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-rose-600 -mt-0.5 ml-10">
                  Rajasthan, India
                </span>
              </Link>
            </div>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/category/womens-western-wear"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Women
              </NavLink>

              <NavLink
                to="/category/t-shirts"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                T-shirts
              </NavLink>

              <NavLink
                to="/category/shirts-tops"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Shirts & Tops
              </NavLink>

              <NavLink
                to="/category/jeans-trousers"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Jeans & Trousers
              </NavLink>

              <NavLink
                to="/category/dresses-co-ord-sets"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Dresses & Co-ords
              </NavLink>

              <NavLink
                to="/category/jackets-winter-wear"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Jackets
              </NavLink>

              <NavLink
                to="/category/accessories"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`
                }
              >
                Accessories
              </NavLink>
            </nav>

            {/* Right Action Icons: Search, WhatsApp Chat, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full border border-slate-200/80 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search outfits...</span>
                <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-slate-200">
                  /
                </kbd>
              </button>

              {/* WhatsApp Support Pill */}
              <a
                href={createSupportWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors"
                title="Chat with Aura Western on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Order</span>
              </a>

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors group"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-fade-in">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Slide-out Menu Drawer --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-sm">
                  AW
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-none">
                    Aura Western
                  </h3>
                  <span className="text-[10px] text-rose-600 font-semibold tracking-wider">
                    RAJASTHAN
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>All Products</span>
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                  Shop
                </span>
              </Link>

              <div className="pt-2 pb-1 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Fashion Categories
              </div>

              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-sm"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[10px] bg-rose-100 text-rose-700 font-medium px-1.5 py-0.5 rounded">
                      {cat.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-4 pb-1 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Support & Info
              </div>

              <Link
                to="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Track Your Order</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>About Aura Western</span>
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span>Contact & Help</span>
              </Link>
            </div>

            {/* Drawer Footer with Direct WhatsApp Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <a
                href={createSupportWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp (+91 76909 90903)</span>
              </a>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Fast WhatsApp order assistance across Rajasthan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Search Modal Overlay --- */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />

          {/* Search Box Card */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up border border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center px-4 py-4 border-b border-slate-100">
                <Search className="w-6 h-6 text-rose-500 mr-3" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, co-ords, tops, denims, jackets..."
                  className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-3 px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md"
                >
                  ESC
                </button>
              </div>
            </form>

            {/* Quick Live Results */}
            {searchQuery.trim() ? (
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Matching Products ({searchResults.length})
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 py-3 hover:bg-rose-50/60 px-2 rounded-lg transition-colors group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-14 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {product.tagline || product.category}
                          </p>
                          <span className="text-xs font-bold text-slate-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <p className="text-sm">No outfits found matching "{searchQuery}"</p>
                    <Link
                      to="/shop"
                      onClick={() => setSearchOpen(false)}
                      className="inline-block mt-3 text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Browse full collection &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-slate-50/60">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Satin Midi Dress', 'Tailored Blazer', 'Drop Shoulder Tee', 'Wide Leg Jeans', 'Co-ord Sets', 'Croissant Hoops'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:border-rose-400 hover:text-rose-600 transition-colors shadow-2xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
