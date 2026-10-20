import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, Coupon, Order, OrderStatus, CategorySlug, ProductColor } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import {
  clearAdminAuthenticated,
  isAdminAuthenticated,
  getAdminCredentials,
  saveAdminCredentials,
  AdminCredentials
} from '../../utils/storage';
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
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Star,
  CheckCircle,
  Key,
  UserCheck,
  Eye,
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';

const COMMON_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', '26', '28', '30', '32', '34', '36'];

const PRESET_COLORS: ProductColor[] = [
  { name: 'Fuchsia Pink', hex: '#E11D48' },
  { name: 'Royal Purple', hex: '#8B5CF6' },
  { name: 'Vibrant Coral', hex: '#F97316' },
  { name: 'Pitch Black', hex: '#0F172A' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Emerald Green', hex: '#064E3B' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Burgundy Wine', hex: '#881337' },
  { name: 'Gold / Mustard', hex: '#EAB308' },
  { name: 'Beige / Cream', hex: '#F5F5F0' }
];

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

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'settings'>('products');

  // Search & Filters for Products Table
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<CategorySlug>('dresses-co-ord-sets');
  const [formPrice, setFormPrice] = useState<number>(1499);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(2299);
  const [formStock, setFormStock] = useState<number>(15);
  const [formDescription, setFormDescription] = useState('');
  const [formMaterial, setFormMaterial] = useState('');
  const [formCareInstructions, setFormCareInstructions] = useState('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [formSizes, setFormSizes] = useState<string[]>(['S', 'M', 'L']);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [formColors, setFormColors] = useState<ProductColor[]>([
    { name: 'Fuchsia Pink', hex: '#E11D48' }
  ]);
  const [colorNameInput, setColorNameInput] = useState('');
  const [colorHexInput, setColorHexInput] = useState('#E11D48');
  const [formIsNewArrival, setFormIsNewArrival] = useState(true);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);

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

  // Owner Credentials Settings State
  const [creds, setCreds] = useState<AdminCredentials>(() => getAdminCredentials());
  const [newUsername, setNewUsername] = useState(creds.username);
  const [newPassword, setNewPassword] = useState(creds.password);
  const [settingsFeedback, setSettingsFeedback] = useState<string | null>(null);

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
    setFormName('');
    setFormSlug('');
    setFormCategory('dresses-co-ord-sets');
    setFormPrice(1499);
    setFormOriginalPrice(2299);
    setFormStock(15);
    setFormDescription('Trendy modern silhouette tailored with premium fabric, ideal for daytime occasions and evening wear.');
    setFormMaterial('100% Poly-Blend Crepe with soft voile lining');
    setFormCareInstructions('Machine wash delicate or cold hand wash. Cool iron on reverse.');
    setFormImages([
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000'
    ]);
    setImageUrlInput('');
    setFormSizes(['S', 'M', 'L', 'XL']);
    setFormColors([
      { name: 'Fuchsia Pink', hex: '#E11D48' },
      { name: 'Midnight Black', hex: '#0F172A' }
    ]);
    setFormIsNewArrival(true);
    setFormIsTrending(false);
    setFormIsBestSeller(false);
    setProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormStock(p.stock);
    setFormDescription(p.description);
    setFormMaterial(p.material);
    setFormCareInstructions(p.careInstructions);
    setFormImages([...p.images]);
    setImageUrlInput('');
    setFormSizes([...p.sizes]);
    setFormColors([...p.colors]);
    setFormIsNewArrival(Boolean(p.isNewArrival));
    setFormIsTrending(Boolean(p.isTrending));
    setFormIsBestSeller(Boolean(p.isBestSeller));
    setProductModalOpen(true);
  };

  // Handle Photo File Upload (converts uploaded files directly to Base64 image data)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result as string;
        if (base64Url) {
          setFormImages((prev) => [...prev, base64Url]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input value
    e.target.value = '';
  };

  // Add Photo from URL
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  // Remove Photo
  const handleRemovePhoto = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Set Cover Photo (moves image to index 0)
  const handleSetCoverPhoto = (index: number) => {
    if (index === 0) return;
    setFormImages((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
  };

  // Toggle Size selection
  const handleToggleSize = (size: string) => {
    setFormSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Add Custom Size
  const handleAddCustomSize = () => {
    if (!customSizeInput.trim()) return;
    const clean = customSizeInput.trim().toUpperCase();
    if (!formSizes.includes(clean)) {
      setFormSizes((prev) => [...prev, clean]);
    }
    setCustomSizeInput('');
  };

  // Add Colour
  const handleAddColor = (name?: string, hex?: string) => {
    const finalName = name || colorNameInput.trim();
    const finalHex = hex || colorHexInput;
    if (!finalName) return;

    if (!formColors.some((c) => c.name.toLowerCase() === finalName.toLowerCase())) {
      setFormColors((prev) => [...prev, { name: finalName, hex: finalHex }]);
    }
    setColorNameInput('');
  };

  // Remove Colour
  const handleRemoveColor = (name: string) => {
    setFormColors((prev) => prev.filter((c) => c.name !== name));
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter a product name.');
      return;
    }
    if (formImages.length === 0) {
      alert('Please upload or add at least one product photo.');
      return;
    }
    if (formSizes.length === 0) {
      alert('Please select at least one available size.');
      return;
    }
    if (formColors.length === 0) {
      alert('Please add at least one color option.');
      return;
    }

    const cleanSlug = formSlug.trim()
      ? formSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : formName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const discountPercent =
      formOriginalPrice > formPrice
        ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
        : 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName.trim(),
        slug: cleanSlug,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent,
        stock: Number(formStock),
        inStock: Number(formStock) > 0,
        description: formDescription,
        material: formMaterial,
        careInstructions: formCareInstructions,
        images: formImages,
        sizes: formSizes,
        colors: formColors,
        isNewArrival: formIsNewArrival,
        isTrending: formIsTrending,
        isBestSeller: formIsBestSeller
      });
    } else {
      addProduct({
        name: formName.trim(),
        slug: cleanSlug,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent,
        stock: Number(formStock),
        inStock: Number(formStock) > 0,
        description: formDescription,
        details: [
          'Handcrafted contemporary western silhouette',
          'Breathable fabric tailored for comfort & all-day wear',
          'Fast dispatch and personal WhatsApp order support'
        ],
        material: formMaterial,
        careInstructions: formCareInstructions,
        images: formImages,
        sizes: formSizes,
        colors: formColors,
        isNewArrival: formIsNewArrival,
        isTrending: formIsTrending,
        isBestSeller: formIsBestSeller,
        rating: 5.0,
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

  // Save Owner Login Credentials
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      alert('Username and Password cannot be empty.');
      return;
    }

    const updated: AdminCredentials = {
      username: newUsername.trim(),
      password: newPassword.trim(),
      name: 'Aura Western Owner'
    };

    saveAdminCredentials(updated);
    setCreds(updated);
    setSettingsFeedback('Owner credentials updated successfully! Use these details on your next login.');
    setTimeout(() => setSettingsFeedback(null), 4000);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc) return false;
    }
    return true;
  });

  // Filtered Orders
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
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-4 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center font-bold text-base shadow-sm">
              AW
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight">
                Aura Western — Owner Admin Panel
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Storefront Connected • Rajasthan, India</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
              <span>View Live Storefront</span>
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-rose-600 text-white shadow-fashion'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Photos ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-rose-600 text-white shadow-fashion'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'coupons'
                ? 'bg-rose-600 text-white shadow-fashion'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Coupons ({coupons.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-rose-600 text-white shadow-fashion'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Owner Account & Security</span>
          </button>
        </div>

        {/* --- TAB 1: PRODUCTS & PHOTOS MANAGEMENT --- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Manage Outfits & Catalog
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apne haathon se new products add karein, photos upload karein, description, pricing & stock update karein.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-fashion hover:shadow-fashion-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Outfit / Product</span>
              </button>
            </div>

            {/* Search and Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name, description or category..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Category:</span>
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider text-[11px] border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-4">Outfit & Photos</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Selling Price</th>
                      <th className="py-4 px-4">Stock</th>
                      <th className="py-4 px-4">Sizes & Colours</th>
                      <th className="py-4 px-4">Promotional Badges</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-rose-50/20 transition-colors">
                        {/* Outfit & Photo */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-2xs">
                              <img
                                src={p.images[0] || 'https://via.placeholder.com/150'}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-[9px] font-bold px-1 rounded-tl">
                                {p.images.length} 📷
                              </span>
                            </div>
                            <div className="max-w-xs">
                              <span className="font-bold text-slate-900 block truncate text-sm">
                                {p.name}
                              </span>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {p.description || p.tagline}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs whitespace-nowrap">
                            {CATEGORIES.find((c) => c.slug === p.category)?.name || p.category}
                          </span>
                        </td>

                        {/* Price & Original Price */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-900 text-sm">
                            {formatCurrency(p.price)}
                          </div>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-[11px] text-slate-400 line-through block">
                              {formatCurrency(p.originalPrice)} ({p.discountPercent}% OFF)
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                                p.stock <= 0
                                  ? 'bg-rose-100 text-rose-800'
                                  : p.stock <= 5
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                            </span>
                          </div>
                        </td>

                        {/* Sizes & Colors */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-1 max-w-[140px]">
                              {p.sizes.slice(0, 4).map((s) => (
                                <span key={s} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-1 rounded">
                                  {s}
                                </span>
                              ))}
                              {p.sizes.length > 4 && (
                                <span className="text-[10px] text-slate-400">+{p.sizes.length - 4}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {p.colors.slice(0, 4).map((c) => (
                                <span
                                  key={c.name}
                                  className="w-3 h-3 rounded-full border border-slate-300"
                                  style={{ backgroundColor: c.hex }}
                                  title={c.name}
                                />
                              ))}
                            </div>
                          </div>
                        </td>

                        {/* Badges */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.isBestSeller && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Award className="w-2.5 h-2.5" /> Best
                              </span>
                            )}
                            {p.isNewArrival && (
                              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" /> New
                              </span>
                            )}
                            {p.isTrending && (
                              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> Trend
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <a
                              href={`/product/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Live storefront preview"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Edit outfit, photos & description"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete outfit"
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

              {filteredProducts.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  <p className="font-semibold">No products found matching your search</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: ORDER REQUESTS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                    className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl">
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
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
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
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
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
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
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

        {/* --- TAB 4: OWNER ACCOUNT & SECURITY SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Key className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Owner Login ID & Password Settings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Yahan se aap apna Admin Login ID aur Password update kar sakte hain. Pura control aapke paas rahega.
                </p>
              </div>

              {settingsFeedback && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{settingsFeedback}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Store Owner Login ID / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="e.g. admin or owner@aurawestern.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Yeh Login ID aapko login karte samay dalna hoga.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Store Owner Admin Password
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Surakshit password banayein jise sirf aap jante hon.
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save New Login Details</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* --- ADD / EDIT PRODUCT MODAL WITH DIRECT PHOTO UPLOAD & DESCRIPTION --- */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setProductModalOpen(false)}
          />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                  {editingProduct ? 'Edit Outfit Details & Photos' : 'Add New Outfit with Photos'}
                </h3>
                <p className="text-xs text-slate-500">
                  Apne phone ya laptop se photos upload karein aur pura description likhein.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs sm:text-sm">
              {/* 1. PHOTO MANAGEMENT SECTION */}
              <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-rose-600" />
                    <span>Product Photos ({formImages.length})</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    * Pahli photo Cover Image banegi
                  </span>
                </div>

                {/* Upload Buttons Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload from Device */}
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-rose-300 hover:border-rose-500 bg-white rounded-xl cursor-pointer transition-all hover:bg-rose-50/30 group">
                    <Upload className="w-6 h-6 text-rose-500 group-hover:scale-110 transition-transform mb-1" />
                    <span className="font-bold text-xs text-slate-900">
                      Upload from Device / Phone
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Select JPG, PNG, WEBP files
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Add from URL */}
                  <div className="flex flex-col justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-xs text-slate-700 block mb-1">
                      Or Add Photo by Web URL:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Paste image link https://..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Photo Previews Grid */}
                {formImages.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
                    {formImages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative group aspect-[3/4] rounded-xl overflow-hidden border-2 bg-slate-100 ${
                          idx === 0 ? 'border-rose-600 ring-2 ring-rose-200' : 'border-slate-200'
                        }`}
                      >
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />

                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                            <Star className="w-2.5 h-2.5 fill-white" /> Cover
                          </span>
                        )}

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverPhoto(idx)}
                              className="px-2 py-0.5 bg-white text-slate-900 text-[10px] font-bold rounded-md hover:bg-rose-50"
                            >
                              Make Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="p-1.5 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-rose-700 italic pt-1">
                    No photos added yet. Click upload above to add photos.
                  </p>
                )}
              </div>

              {/* 2. BASIC PRODUCT INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Product Title / Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Royal Pink Satin Maxi Dress"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Fashion Category <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategorySlug)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. PRICING & STOCK */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Selling Price (₹) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Original Price (₹) <span className="text-slate-400 font-normal">(MSRP)</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-600"
                  />
                  {formOriginalPrice > formPrice && (
                    <span className="text-[10px] text-rose-600 font-bold block mt-1">
                      {Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)}% Discount Shown
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Stock Quantity (Units) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* 4. DESCRIPTION & DETAILS */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Product Description <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the silhouette, fabric feel, occasion styling, fit, and highlights..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Fabric & Material
                  </label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="e.g. 100% Bio-Washed Cotton / Satin Crepe"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    value={formCareInstructions}
                    onChange={(e) => setFormCareInstructions(e.target.value)}
                    placeholder="e.g. Gentle hand wash cold. Dry in shade."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* 5. AVAILABLE SIZES SELECTION */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Available Sizes ({formSizes.length} selected)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COMMON_SIZES.map((size) => {
                    const isSelected = formSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Custom size input */}
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="text"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    placeholder="Add custom size (e.g. 38)"
                    className="px-3 py-1 rounded-lg border border-slate-200 text-xs flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                  >
                    + Add Size
                  </button>
                </div>
              </div>

              {/* 6. AVAILABLE COLOURS PALETTE */}
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Available Colours ({formColors.length} added)
                </label>

                {/* Preset color shortcuts */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] text-slate-400">Quick Presets:</span>
                  {PRESET_COLORS.map((pc) => (
                    <button
                      key={pc.name}
                      type="button"
                      onClick={() => handleAddColor(pc.name, pc.hex)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pc.hex }} />
                      <span>{pc.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active Colours list */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {formColors.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c.name)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="color"
                    value={colorHexInput}
                    onChange={(e) => setColorHexInput(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                  />
                  <input
                    type="text"
                    value={colorNameInput}
                    onChange={(e) => setColorNameInput(e.target.value)}
                    placeholder="Custom colour name (e.g. Lavender)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddColor()}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* 7. PROMOTIONAL BADGES */}
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Promotional Badges
                </span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formIsNewArrival}
                      onChange={(e) => setFormIsNewArrival(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <span>Mark as New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formIsTrending}
                      onChange={(e) => setFormIsTrending(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Mark as Trending</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formIsBestSeller}
                      onChange={(e) => setFormIsBestSeller(e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                    />
                    <span>Mark as Best Seller</span>
                  </label>
                </div>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-fashion"
                >
                  {editingProduct ? 'Save & Update Outfit' : 'Publish New Outfit'}
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
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
