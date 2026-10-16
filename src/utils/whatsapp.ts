import { CartItem, CustomerAddress, OrderItem } from '../types';

export const WHATSAPP_PHONE_NUMBER = '917690990903';
export const WHATSAPP_DISPLAY_PHONE = '+91 76909 90903';

export interface OrderMessageParams {
  orderReference: string;
  customer: CustomerAddress;
  items: (CartItem | OrderItem)[];
  subtotal: number;
  couponCode?: string;
  discount: number;
  deliveryCharges: number;
  total: number;
  notes?: string;
}

/**
 * Builds the exact structured WhatsApp message as per Aura Western business requirements.
 */
export function buildOrderWhatsAppMessage(params: OrderMessageParams): string {
  const {
    orderReference,
    customer,
    items,
    subtotal,
    couponCode,
    discount,
    deliveryCharges,
    total,
    notes
  } = params;

  // Format delivery address cleanly
  const streetPart = customer.landmark
    ? `${customer.houseFlat}, ${customer.streetLocality} (Landmark: ${customer.landmark})`
    : `${customer.houseFlat}, ${customer.streetLocality}`;

  // Format order items
  const itemsText = items.map((item, index) => {
    const isCartItem = 'product' in item;
    const name = isCartItem ? (item as CartItem).product.name : (item as OrderItem).productName;
    const size = isCartItem ? (item as CartItem).selectedSize : (item as OrderItem).size;
    const color = isCartItem ? (item as CartItem).selectedColor : (item as OrderItem).color;
    const quantity = item.quantity;
    const unitPrice = item.unitPrice;
    const lineTotal = isCartItem ? (item as CartItem).totalPrice : (item as OrderItem).lineTotal;

    return `${index + 1}. ${name}
   Size: ${size}
   Colour: ${color}
   Quantity: ${quantity}
   Unit Price: ₹${unitPrice.toLocaleString('en-IN')}
   Line Total: ₹${lineTotal.toLocaleString('en-IN')}`;
  }).join('\n\n');

  const couponDisplay = couponCode ? couponCode.toUpperCase() : 'none';
  const deliveryDisplay = deliveryCharges > 0 ? `₹${deliveryCharges.toLocaleString('en-IN')}` : 'Free Delivery';
  const notesDisplay = notes && notes.trim() ? notes.trim() : 'None';

  const message = `AURA WESTERN — NEW ORDER REQUEST

Order Reference: ${orderReference}

CUSTOMER DETAILS
Name: ${customer.fullName}
Phone: ${customer.phone}
Delivery Address: ${streetPart}
City/District: ${customer.city}, ${customer.district}
PIN Code: ${customer.pinCode}

ORDER ITEMS
${itemsText}

Subtotal: ₹${subtotal.toLocaleString('en-IN')}
Coupon: ${couponDisplay}
Discount: ₹${discount.toLocaleString('en-IN')}
Delivery Charges: ${deliveryDisplay}
ESTIMATED TOTAL: ₹${total.toLocaleString('en-IN')}

Payment: To be arranged and confirmed on WhatsApp.
Delivery Area: Rajasthan
Customer Notes: ${notesDisplay}

Please confirm product availability, final payable amount, payment method and delivery timeline.`;

  return message;
}

/**
 * Creates the official click-to-chat URL using wa.me and safe URL encoding
 */
export function createWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}

/**
 * Creates a general support chat URL for Aura Western
 */
export function createSupportWhatsAppUrl(customText?: string): string {
  const text = customText || 'Hello Aura Western! I would like to inquire about your western fashion collection and delivery in Rajasthan.';
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates a unique, collision-resistant order reference
 * Format: AW-XXXXXX (e.g. AW-748291)
 */
export function generateOrderReference(): string {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `AW-${randomPart}`;
}
