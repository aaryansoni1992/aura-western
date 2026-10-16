import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon, Product } from '../types';
import { getStoredCart, saveStoredCart, clearStoredCart } from '../utils/storage';
import { useShop } from './ShopContext';

export const FREE_DELIVERY_THRESHOLD = 999;
export const STANDARD_DELIVERY_FEE = 79;

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  discount: number;
  deliveryCharges: number;
  total: number;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => { success: boolean; message: string };
  buyNow: (product: Product, size: string, color: string, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (itemId: string, newQuantity: number) => { success: boolean; message: string };
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  revalidateCart: () => { valid: boolean; changes: string[] };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { products, coupons } = useShop();
  const [items, setItems] = useState<CartItem[]>(() => getStoredCart());
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync cart changes with localStorage
  useEffect(() => {
    saveStoredCart(items);
  }, [items]);

  // Total quantity of items in cart
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  // Re-calculate discount when subtotal or appliedCoupon changes
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (!appliedCoupon.minOrderValue || subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.type === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
        if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
          discount = appliedCoupon.maxDiscount;
        }
      } else {
        discount = appliedCoupon.value;
      }
      discount = Math.min(discount, subtotal);
    }
  }

  // Delivery charges: Free delivery for orders >= ₹999 in Rajasthan
  const deliveryCharges = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

  // Final estimated total
  const total = Math.max(0, subtotal - discount + deliveryCharges);

  const addToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ): { success: boolean; message: string } => {
    if (!size || !size.trim()) {
      return { success: false, message: 'Please select a size.' };
    }
    if (!color || !color.trim()) {
      return { success: false, message: 'Please select a colour.' };
    }
    if (product.stock <= 0) {
      return { success: false, message: 'Sorry, this item is out of stock.' };
    }

    const itemId = `${product.id}-${size}-${color}`;
    const existingIndex = items.findIndex(i => i.id === itemId);

    if (existingIndex > -1) {
      const currentQty = items[existingIndex].quantity;
      const nextQty = currentQty + quantity;

      if (nextQty > product.stock) {
        return {
          success: false,
          message: `Only ${product.stock} items available in stock. You already have ${currentQty} in your cart.`
        };
      }

      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: nextQty,
        totalPrice: nextQty * product.price
      };
      setItems(updated);
      return { success: true, message: `Updated ${product.name} quantity in cart.` };
    } else {
      if (quantity > product.stock) {
        return {
          success: false,
          message: `Only ${product.stock} items available in stock.`
        };
      }

      const newItem: CartItem = {
        id: itemId,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
        unitPrice: product.price,
        totalPrice: product.price * quantity
      };

      setItems(prev => [...prev, newItem]);
      return { success: true, message: `Added ${product.name} to cart!` };
    }
  };

  const buyNow = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ): { success: boolean; message: string } => {
    return addToCart(product, size, color, quantity);
  };

  const updateQuantity = (
    itemId: string,
    newQuantity: number
  ): { success: boolean; message: string } => {
    const item = items.find(i => i.id === itemId);
    if (!item) return { success: false, message: 'Item not found in cart.' };

    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return { success: true, message: 'Removed item from cart.' };
    }

    // Verify stock against current product catalog
    const currentProduct = products.find(p => p.id === item.product.id) || item.product;
    if (newQuantity > currentProduct.stock) {
      return {
        success: false,
        message: `Cannot add more. Only ${currentProduct.stock} items available in stock.`
      };
    }

    setItems(prev =>
      prev.map(i => {
        if (i.id === itemId) {
          return {
            ...i,
            quantity: newQuantity,
            unitPrice: currentProduct.price,
            totalPrice: newQuantity * currentProduct.price
          };
        }
        return i;
      })
    );

    return { success: true, message: 'Cart updated.' };
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    clearStoredCart();
  };

  const applyCouponCode = (code: string): { success: boolean; message: string } => {
    if (!code || !code.trim()) {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return { success: false, message: `Invalid coupon "${cleanCode}".` };
    }

    if (!coupon.active) {
      return { success: false, message: `Coupon "${coupon.code}" is inactive.` };
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString('en-IN')}. Your cart subtotal is ₹${subtotal.toLocaleString('en-IN')}.`
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message: `Coupon "${coupon.code}" applied! You get ${
        coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`
      }.`
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  /**
   * Revalidates prices, availability and coupon rules against latest store state
   */
  const revalidateCart = (): { valid: boolean; changes: string[] } => {
    const changes: string[] = [];
    let updatedItems = [...items];
    let cartModified = false;

    // Check each item
    updatedItems = updatedItems.filter(item => {
      const latestProd = products.find(p => p.id === item.product.id);
      if (!latestProd || !latestProd.inStock || latestProd.stock <= 0) {
        changes.push(`"${item.product.name}" is no longer in stock and was removed.`);
        cartModified = true;
        return false;
      }

      if (item.quantity > latestProd.stock) {
        changes.push(`"${item.product.name}" quantity adjusted from ${item.quantity} to ${latestProd.stock} (available stock).`);
        item.quantity = latestProd.stock;
        item.totalPrice = item.quantity * latestProd.price;
        cartModified = true;
      }

      if (item.unitPrice !== latestProd.price) {
        changes.push(`"${item.product.name}" price updated to ₹${latestProd.price.toLocaleString('en-IN')}.`);
        item.unitPrice = latestProd.price;
        item.totalPrice = item.quantity * latestProd.price;
        cartModified = true;
      }

      return true;
    });

    if (cartModified) {
      setItems(updatedItems);
    }

    // Check applied coupon
    if (appliedCoupon) {
      const latestCoupon = coupons.find(c => c.code.toUpperCase() === appliedCoupon.code.toUpperCase());
      const newSubtotal = updatedItems.reduce((acc, i) => acc + i.totalPrice, 0);

      if (!latestCoupon || !latestCoupon.active) {
        changes.push(`Coupon "${appliedCoupon.code}" is no longer active and was removed.`);
        setAppliedCoupon(null);
      } else if (latestCoupon.minOrderValue && newSubtotal < latestCoupon.minOrderValue) {
        changes.push(
          `Subtotal fell below ₹${latestCoupon.minOrderValue.toLocaleString('en-IN')}. Coupon "${latestCoupon.code}" was removed.`
        );
        setAppliedCoupon(null);
      }
    }

    return {
      valid: changes.length === 0,
      changes
    };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        appliedCoupon,
        discount,
        deliveryCharges,
        total,
        addToCart,
        buyNow,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCouponCode,
        removeCoupon,
        revalidateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
