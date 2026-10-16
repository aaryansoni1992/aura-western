import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, Coupon, Order, OrderStatus, CategorySlug } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { clearAdminAuthenticated, isAdminAuthenticated } from '../../utils/storage';
import { AdminLogin } from './AdminLogin';
import {
  Package,
  ShoppingBag,
  Tag,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  LogOut,
  ExternalLink,
  ChevronDown,
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const {
    products,
    coupons,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    updateOrderStatus
  } = useShop();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons'>('products');

  // Products state & modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    category: 'dresses-co-ord-sets' as CategorySlug,
    price: 1499,
    originalPrice: 2299,
    stock: 15,
    description: '',
    material: '',
    careInstructions: '',
    imagesText: '',
    sizesText: 'XS, S, M, L, XL',
    colorsText: 'Ruby Red: #E11D48, Midnight Black: #0F172A',
    isNewArrival: true,
    isTrending: false,
    isBestSeller: false
  });

  // Coupon form modal
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 10,
    minOrderValue: 999,
    description: '',
    active: true
  });

  // Filter state for orders
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleLogout = () => {
    clearAdminAuthenticated();
    setIsAuthenticated(false);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      category: 'dresses-co-ord-sets',
      price: 1499,
      originalPrice: 2299,
      stock: 15,
      description: 'Sophisticated modern western silhouette crafted with precision tailoring.',
      material: '100% Premium Poly-Blend Crepe',
      careInstructions: 'Machine wash delicate or hand wash cold. Cool iron on reverse.',
      imagesText: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000',
      sizesText: 'XS, S, M, L, XL',
      colorsText: 'Vibrant Rose: #E11D48, Cream Ivory: #FAF5EE',
      isNewArrival: true,
      isTrending: false,
      isBestSeller: false
    });
    setProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      stock: p.stock,
      description: p.description,
      material: p.material,
      careInstructions: p.careInstructions,
      imagesText: p.images.join('\n'),
      sizesText: p.sizes.join(', '),
      colorsText: p.colors.map((c) => `${c.name}: ${c.hex}`).join(', '),
      isNewArrival: Boolean(p.isNewArrival),
      isTrending: Boolean(p.isTrending),
      isBestSeller: Boolean(p.isBestSeller)
    });
    setProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    // Parse images
    const images = productForm.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000');
    }

    // Parse sizes
    const sizes = productForm.sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Parse colors: "Name: #HEX"
    const colors = productForm.colorsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const parts = pair.split(':');
        const name = parts[0]?.trim() || 'Classic';
        const hex = parts[1]?.trim() || '#0F172A';
        return { name, hex };
      });

    const slug = productForm.slug.trim()
      ? productForm.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : productForm.name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const discountPercent =
      productForm.originalPrice > productForm.price
        ? Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100)
        : 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        slug,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent,
        stock: Number(productForm.stock),
        inStock: Number(productForm.stock) > 0,
        description: productForm.description,
        material: productForm.material,
        careInstructions: productForm.careInstructions,
        images,
        sizes,
        colors,
        isNewArrival: productForm.isNewArrival,
        isTrending: productForm.isTrending,
        isBestSeller: productForm.isBestSeller
      });
    } else {
      addProduct({
        name: productForm.name,
        slug,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent,
        stock: Number(productForm.stock),
        inStock: Number(productForm.stock) > 0,
        description: productForm.description,
        details: [
          'Handpicked contemporary western design',
          'Premium durable stitching and lining',
          'Comfort wear tailored for Indian silhouettes'
        ],
        material: productForm.material,
        careInstructions: productForm.careInstructions,
        images,
        sizes,
        colors,
        isNewArrival: productForm.isNewArrival,
        isTrending: productForm.isTrending,
        isBestSeller: productForm.isBestSeller,
        rating: 4.9,
        reviewCount: 1
      });
    }

    setProductModalOpen(false);
  };

  // Save Coupon
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;

    addCoupon({
      code: couponForm.code.trim().toUpperCase(),
      type: couponForm.type,
      value: Number(couponForm.value),
      minOrderValue: Number(couponForm.minOrderValue),
      description: couponForm.description,
      active: couponForm.active
    });

    setCouponModalOpen(false);
    setCouponForm({
      code: '',
      type: 'percentage',
      value: 10,
      minOrderValue: 999,
      description: '',
      active: true
    });
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilterStatus !== 'all' && o.status !== orderFilterStatus) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase().trim();
      const matchRef = o.reference.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      const matchCity = o.customer.city.toLowerCase().includes(q);
      if (!matchRef && !matchName && !matchPhone && !matchCity) return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
      {/* Top Admin Navbar */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center font-bold text-sm">
              AW
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight">
                Aura Western — Store Owner Admin
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                Live Store Management • Rajasthan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Requests ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'coupons'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Discount Coupons ({coupons.length})</span>
          </button>
        </div>

        {/* --- TAB 1: PRODUCTS MANAGEMENT --- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Manage Clothing & Products
                </h2>
                <p className="text-xs text-slate-500">
                  Update prices, upload images, alter stock levels, and toggle promotional badges.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-xs shadow-fashion"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Outfit</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider text-[11px] border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Outfit</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Badges</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg flex-shrink-0 border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{p.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              /{p.slug}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">
                            {CATEGORIES.find((c) => c.slug === p.category)?.name || p.category}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">
                            {formatCurrency(p.price)}
                          </div>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatCurrency(p.originalPrice)}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              p.stock <= 0
                                ? 'text-rose-600'
                                : p.stock <= 5
                                ? 'text-amber-600'
                                : 'text-emerald-700'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.isBestSeller && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                                Best
                              </span>
                            )}
                            {p.isNewArrival && (
                              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                                New
                              </span>
                            )}
                            {p.isTrending && (
                              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                                Trend
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Edit Outfit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Outfit"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: REAL ORDERS REQUESTS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Customer Order Requests
                </h2>
                <p className="text-xs text-slate-500">
                  Orders submitted via website and routed to WhatsApp. Update fulfillment statuses here.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search ref or customer..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <select
                  value={orderFilterStatus}
                  onChange={(e) => setOrderFilterStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Awaiting WhatsApp confirmation">Awaiting WhatsApp confirmation</option>
                  <option value="Order confirmed">Order confirmed</option>
                  <option value="Payment pending">Payment pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.reference}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {order.reference}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDateTime(order.createdAt)}
                        </span>
                      </div>

                      {/* Status Dropdown Controller */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Update Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as OrderStatus;
                            updateOrderStatus(order.reference, newStatus, `Owner changed status to ${newStatus}`);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                        >
                          <option value="Awaiting WhatsApp confirmation">Awaiting WhatsApp confirmation</option>
                          <option value="Order confirmed">Order confirmed</option>
                          <option value="Payment pending">Payment pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                          Customer
                        </span>
                        <p className="font-semibold text-slate-900 text-sm">{order.customer.fullName}</p>
                        <p className="text-slate-600">WhatsApp: +91 {order.customer.phone}</p>
                        {order.customer.notes && (
                          <p className="mt-1 italic text-slate-500">Notes: "{order.customer.notes}"</p>
                        )}
                      </div>

                      <div>
                        <span className="font-bold uppercase tracking-wider text-slate-900 block mb-1">
                          Rajasthan Destination
                        </span>
                        <p>{order.customer.houseFlat}, {order.customer.streetLocality}</p>
                        <p>{order.customer.city}, District: {order.customer.district} — PIN {order.customer.pinCode}</p>
                      </div>
                    </div>

                    {/* Items & Totals */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3 pt-2">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800">
                          Items ({order.items.length}):
                        </span>
                        <ul className="text-slate-600 space-y-0.5">
                          {order.items.map((it, idx) => (
                            <li key={idx}>
                              • {it.productName} ({it.size}, {it.color}) × {it.quantity} — {formatCurrency(it.lineTotal)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6">
                        <span className="text-xs text-slate-500 block">Total Payable:</span>
                        <span className="text-lg font-bold text-rose-600 font-display">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No order requests found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Orders submitted through the checkout flow will automatically appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: COUPONS MANAGEMENT --- */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Promotional Discount Coupons
                </h2>
                <p className="text-xs text-slate-500">
                  Manage active coupons, percentage discounts, flat reductions, and minimum order values.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCouponModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-lg text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {coupon.code}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          coupon.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {coupon.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {coupon.description}
                    </p>

                    <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3">
                      <p>
                        Type:{' '}
                        <strong>
                          {coupon.type === 'percentage'
                            ? `${coupon.value}% OFF`
                            : `₹${coupon.value} Flat OFF`}
                        </strong>
                      </p>
                      <p>
                        Min Order: <strong>{formatCurrency(coupon.minOrderValue)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => updateCoupon(coupon.code, { active: !coupon.active })}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                    >
                      {coupon.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete coupon ${coupon.code}?`)) {
                          deleteCoupon(coupon.code);
                        }
                      }}
                      className="text-rose-600 hover:text-rose-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setProductModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-display font-bold text-xl text-slate-900">
                {editingProduct ? 'Edit Outfit' : 'Add New Outfit'}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Fuchsia Cutout Satin Midi Dress"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value as CategorySlug })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Product Image URLs (One URL per line)
                </label>
                <textarea
                  rows={2}
                  value={productForm.imagesText}
                  onChange={(e) => setProductForm({ ...productForm, imagesText: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={productForm.sizesText}
                    onChange={(e) => setProductForm({ ...productForm, sizesText: e.target.value })}
                    placeholder="XS, S, M, L, XL"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Colours (Name: #Hex, separated by comma)
                  </label>
                  <input
                    type="text"
                    value={productForm.colorsText}
                    onChange={(e) => setProductForm({ ...productForm, colorsText: e.target.value })}
                    placeholder="Rose: #E11D48, Black: #0F172A"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              {/* Promotional Badges Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isNewArrival: e.target.checked })
                    }
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={productForm.isTrending}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isTrending: e.target.checked })
                    }
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>Mark as Trending</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isBestSeller: e.target.checked })
                    }
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>Mark as Best Seller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700"
                >
                  Save Outfit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD COUPON MODAL --- */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCouponModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10">
            <h3 className="font-display font-bold text-xl text-slate-900 mb-4 pb-3 border-b border-slate-100">
              Create Promotional Coupon
            </h3>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. JAIPUR20"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={couponForm.type}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        type: e.target.value as 'percentage' | 'fixed'
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Value {couponForm.type === 'percentage' ? '(%)' : '(₹)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={couponForm.value}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, value: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Minimum Order Value (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={couponForm.minOrderValue}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, minOrderValue: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={couponForm.description}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, description: e.target.value })
                  }
                  placeholder="e.g. Flat 20% off on festive wear"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
