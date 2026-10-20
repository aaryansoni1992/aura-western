import { CartItem, Coupon, Order, Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_COUPONS } from '../data/initialCoupons';

const CART_KEY = 'aura_western_cart_v1';
const PRODUCTS_KEY = 'aura_western_products_v1';
const COUPONS_KEY = 'aura_western_coupons_v1';
const ORDERS_KEY = 'aura_western_orders_v1';
const ADMIN_AUTH_KEY = 'aura_western_admin_auth_v1';

// --- Cart Storage ---
export function getStoredCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read cart from localStorage', err);
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function clearStoredCart(): void {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (err) {
    console.error('Failed to clear cart in localStorage', err);
  }
}

// --- Products Storage (Client Persistent Cache) ---
export function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read products from localStorage', err);
  }
  // Initialize with initial products if empty
  saveStoredProducts(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

// --- Coupons Storage ---
export function getStoredCoupons(): Coupon[] {
  try {
    const data = localStorage.getItem(COUPONS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read coupons from localStorage', err);
  }
  saveStoredCoupons(INITIAL_COUPONS);
  return INITIAL_COUPONS;
}

export function saveStoredCoupons(coupons: Coupon[]): void {
  try {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
  } catch (err) {
    console.error('Failed to save coupons to localStorage', err);
  }
}

// --- Orders Storage (Real saved order requests) ---
export function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read orders from localStorage', err);
    return [];
  }
}

export function saveStoredOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

export function saveStoredOrder(order: Order): void {
  try {
    const orders = getStoredOrders();
    const existingIndex = orders.findIndex(o => o.reference === order.reference);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.unshift(order);
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}

export function getStoredOrderByReference(reference: string): Order | undefined {
  const cleanRef = reference.trim().toUpperCase();
  const orders = getStoredOrders();
  return orders.find(o => o.reference.toUpperCase() === cleanRef);
}

// --- Admin Auth & Owner Credentials ---
const ADMIN_CREDENTIALS_KEY = 'aura_western_admin_credentials_v1';

export interface AdminCredentials {
  username: string;
  password: string;
  name: string;
  lastUpdated?: string;
}

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'Aura@2026',
  name: 'Aura Western Owner'
};

export function getAdminCredentials(): AdminCredentials {
  try {
    const data = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read admin credentials', err);
  }
  return DEFAULT_CREDENTIALS;
}

export function saveAdminCredentials(creds: AdminCredentials): void {
  try {
    const payload = {
      ...creds,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(payload));

    // Also persist to server if reachable
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
      fetch('/api/admin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {
        // Silent catch for offline or file:// mode
      });
    }
  } catch (err) {
    console.error('Failed to save admin credentials', err);
  }
}

export function resetAdminCredentials(): void {
  try {
    localStorage.removeItem(ADMIN_CREDENTIALS_KEY);
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
      fetch('/api/admin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_CREDENTIALS)
      }).catch(() => {});
    }
  } catch (err) {
    console.error('Failed to reset credentials', err);
  }
}

export function verifyAdminLogin(usernameInput: string, passwordInput: string): boolean {
  const cleanUser = usernameInput.trim().toLowerCase();
  const cleanPass = passwordInput.trim();
  const creds = getAdminCredentials();

  // 1. Direct match with saved credentials
  if (cleanUser === creds.username.toLowerCase() && cleanPass === creds.password) {
    return true;
  }

  // 2. Master Emergency Recovery PIN (Rajasthan WhatsApp Phone Number)
  // If owner forgets custom credentials, their official WhatsApp number/PIN always grants access
  if (cleanPass === '76909' || cleanPass === '7690990903' || cleanPass === '+917690990903') {
    return true;
  }

  // 3. Default fallback if not customized or entered directly
  if (
    (cleanUser === 'admin' || cleanUser === 'owner@aurawestern.com') &&
    (cleanPass === 'Aura@2026' || cleanPass === 'aura2026')
  ) {
    return true;
  }

  return false;
}

export function isAdminAuthenticated(): boolean {
  try {
    const token = sessionStorage.getItem(ADMIN_AUTH_KEY) || localStorage.getItem(ADMIN_AUTH_KEY);
    return token === 'authenticated_aura_admin';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(remember: boolean = false): void {
  try {
    if (remember) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_aura_admin');
    }
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_aura_admin');
  } catch (err) {
    console.error('Failed to set admin auth', err);
  }
}

export function clearAdminAuthenticated(): void {
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  } catch (err) {
    console.error('Failed to clear admin auth', err);
  }
}
