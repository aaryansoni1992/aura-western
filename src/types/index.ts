export type CategorySlug =
  | 'womens-western-wear'
  | 't-shirts'
  | 'shirts-tops'
  | 'jeans-trousers'
  | 'dresses-co-ord-sets'
  | 'jackets-winter-wear'
  | 'accessories';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  inStock: boolean;
  description: string;
  details: string[];
  material: string;
  careInstructions: string;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${selectedSize}-${selectedColor}`
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Coupon {
  id?: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10% or 200 for ₹200
  minOrderValue: number;
  maxDiscount?: number;
  active: boolean;
  description: string;
  expiryDate?: string;
  usageCount?: number;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  houseFlat: string;
  streetLocality: string;
  landmark?: string;
  city: string;
  district: string;
  pinCode: string;
  notes?: string;
}

export type OrderStatus =
  | 'Awaiting WhatsApp confirmation'
  | 'Order confirmed'
  | 'Payment pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productName: string;
  slug?: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image?: string;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  reference: string;
  customer: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  couponCode?: string;
  discount: number;
  deliveryCharges: number;
  total: number;
  status: OrderStatus;
  paymentArrangement: string;
  whatsappUrl: string;
  whatsappOpened: boolean;
  createdAt: string;
  updatedAt: string;
  statusTimeline: OrderStatusHistory[];
}
