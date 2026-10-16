import React, { createContext, useContext, useState, useEffect } from 'react';
import { Coupon, Order, OrderStatus, Product } from '../types';
import {
  getStoredCoupons,
  getStoredOrders,
  getStoredProducts,
  saveStoredCoupons,
  saveStoredOrder,
  saveStoredOrders,
  saveStoredProducts
} from '../utils/storage';

interface ShopContextType {
  products: Product[];
  coupons: Coupon[];
  orders: Order[];
  isLoading: boolean;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categorySlug: string) => Product[];
  validateCoupon: (code: string, subtotal: number) => { valid: boolean; message: string; coupon?: Coupon; discount: number };
  // Admin methods
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => Coupon;
  updateCoupon: (code: string, updates: Partial<Coupon>) => boolean;
  deleteCoupon: (code: string) => boolean;
  saveNewOrder: (order: Order) => void;
  updateOrderStatus: (reference: string, newStatus: OrderStatus, note?: string) => boolean;
  getOrder: (reference: string) => Order | undefined;
  refreshData: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = () => {
    setIsLoading(true);
    try {
      const storedProducts = getStoredProducts();
      const storedCoupons = getStoredCoupons();
      const storedOrders = getStoredOrders();

      setProducts(storedProducts);
      setCoupons(storedCoupons);
      setOrders(storedOrders);
    } catch (err) {
      console.error('Error loading shop data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (categorySlug: string): Product[] => {
    return products.filter(p => p.category === categorySlug);
  };

  const validateCoupon = (
    code: string,
    subtotal: number
  ): { valid: boolean; message: string; coupon?: Coupon; discount: number } => {
    if (!code || !code.trim()) {
      return { valid: false, message: 'Please enter a coupon code.', discount: 0 };
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return { valid: false, message: `Coupon "${cleanCode}" is not valid.`, discount: 0 };
    }

    if (!coupon.active) {
      return { valid: false, message: `Coupon "${coupon.code}" has expired or is inactive.`, discount: 0 };
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString('en-IN')}. Current subtotal is ₹${subtotal.toLocaleString('en-IN')}.`,
        discount: 0
      };
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    // Discount cannot exceed subtotal
    discount = Math.min(discount, subtotal);

    return {
      valid: true,
      message: `Coupon "${coupon.code}" applied successfully! You save ₹${discount.toLocaleString('en-IN')}.`,
      coupon,
      discount
    };
  };

  // --- Admin Mutations ---
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const id = `aw-prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      createdAt: new Date().toISOString()
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>): boolean => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;

    const updated = [...products];
    updated[idx] = { ...updated[idx], ...updates };
    setProducts(updated);
    saveStoredProducts(updated);
    return true;
  };

  const deleteProduct = (id: string): boolean => {
    const updated = products.filter(p => p.id !== id);
    if (updated.length === products.length) return false;
    setProducts(updated);
    saveStoredProducts(updated);
    return true;
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      code: couponData.code.trim().toUpperCase()
    };
    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    saveStoredCoupons(updated);
    return newCoupon;
  };

  const updateCoupon = (code: string, updates: Partial<Coupon>): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const idx = coupons.findIndex(c => c.code.toUpperCase() === cleanCode);
    if (idx === -1) return false;

    const updated = [...coupons];
    updated[idx] = { ...updated[idx], ...updates };
    setCoupons(updated);
    saveStoredCoupons(updated);
    return true;
  };

  const deleteCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const updated = coupons.filter(c => c.code.toUpperCase() !== cleanCode);
    if (updated.length === coupons.length) return false;
    setCoupons(updated);
    saveStoredCoupons(updated);
    return true;
  };

  const saveNewOrder = (order: Order) => {
    saveStoredOrder(order);
    setOrders(prev => {
      const idx = prev.findIndex(o => o.reference === order.reference);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = order;
        return copy;
      }
      return [order, ...prev];
    });
  };

  const updateOrderStatus = (reference: string, newStatus: OrderStatus, note?: string): boolean => {
    const cleanRef = reference.trim().toUpperCase();
    const existing = orders.find(o => o.reference.toUpperCase() === cleanRef);
    if (!existing) return false;

    const updatedOrder: Order = {
      ...existing,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusTimeline: [
        ...existing.statusTimeline,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note || `Status updated to ${newStatus}`
        }
      ]
    };

    saveNewOrder(updatedOrder);
    return true;
  };

  const getOrder = (reference: string): Order | undefined => {
    const cleanRef = reference.trim().toUpperCase();
    return orders.find(o => o.reference.toUpperCase() === cleanRef);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        coupons,
        orders,
        isLoading,
        getProductBySlug,
        getProductById,
        getProductsByCategory,
        validateCoupon,
        addProduct,
        updateProduct,
        deleteProduct,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        saveNewOrder,
        updateOrderStatus,
        getOrder,
        refreshData: loadData
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
