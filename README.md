# Aura Western — Fashion E-commerce Platform

A colorful, modern fashion e-commerce platform for **Aura Western**, serving customers across Rajasthan, India.

![Aura Western](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop)

---

## 🌟 Brand Highlights

* **Brand Positioning:** Trendy western wear, fluid dresses, tailored co-ord sets, graphic/minimal tees, trousers, blazers, and statement accessories.
* **Service Area:** Dedicated fast courier delivery across all 33+ districts of Rajasthan, India.
* **Business & Payment Model:** Curated online catalog with one-click direct WhatsApp order submission to the owner at `+91 76909 90903`. Payment arranged personally on WhatsApp (UPI, Bank Transfer, or COD).
* **Delivery Benefit:** Free doorstep delivery across Rajasthan on orders above ₹999 (flat ₹79 delivery fee on orders below ₹999).

---

## 🛍️ Key Features & Pages

1. **Homepage (`/`):**
   * Rotating announcement bar with Rajasthan delivery highlight.
   * Large fashion hero banner: *"Your Style. Your Statement."*
   * Interactive Category cards with badges and taglines.
   * Curated Trending / New Arrivals / Best Sellers tabs.
   * One-click copyable promotional coupon vouchers (`AURA10`, `FIRSTORDER`, `RAJASTHAN50`).
   * Brand pillars: Easy ordering, WhatsApp assistance, and Rajasthan delivery.

2. **All Products Catalog (`/shop`):**
   * Multi-attribute filtering (Category, Price Range, Size, Colour swatch, In Stock only).
   * 5 sorting options (Featured/Best Sellers, Price Low-High, Price High-Low, Newest, Highest Rated).
   * Live search overlay modal with keyboard shortcut (`/`).
   * Responsive product grid with hover image switch and stock warnings.

3. **Category Pages (`/category/:slug`):**
   * Dedicated pages for all 7 official categories:
     1. Women's Western Wear (`/category/womens-western-wear`)
     2. T-shirts (`/category/t-shirts`)
     3. Shirts & Tops (`/category/shirts-tops`)
     4. Jeans & Trousers (`/category/jeans-trousers`)
     5. Dresses & Co-ord Sets (`/category/dresses-co-ord-sets`)
     6. Jackets & Winter Wear (`/category/jackets-winter-wear`)
     7. Accessories (`/category/accessories`)

4. **Product Details Page (`/product/:slug`):**
   * Multi-image thumbnail gallery.
   * Color selector with visual swatches.
   * Size selector with standard Indian & International Size Guide modal (Inches & CM toggle).
   * Quantity controls with real stock ceiling enforcement.
   * Add to Cart & Buy Now workflows.
   * Related products from same category.

5. **Shopping Bag (`/cart`):**
   * Free delivery progress bar toward ₹999 threshold.
   * Coupon code applicator with instant discount computation.
   * Quantity modifiers & removal.
   * Persistent browser storage across page navigation and refresh.
   * Pre-checkout catalog revalidation check.

6. **Rajasthan Checkout (`/checkout`):**
   * Required field validations (Full Name, 10-digit Indian mobile number).
   * Address fields: Flat/House, Street/Locality, Landmark, City/Town.
   * Rajasthan District selector & 6-digit PIN code validation (30–34 prefix series).
   * WhatsApp Order Request generator with URL-safe `encodeURIComponent()`.

7. **Order Confirmation (`/order-confirmation/:reference`):**
   * Unique order reference (e.g. `AW-XXXXXX`).
   * Direct WhatsApp chat launch button.
   * "Copy Message Manually" fallback with instructions if popups are blocked.
   * Confetti celebration animation.

8. **Real Order Tracking (`/track-order`):**
   * Search by order reference.
   * Visual progress timeline from "Awaiting WhatsApp confirmation" to "Delivered".
   * Complete timeline update history log.

9. **Owner Admin Panel (`/admin`):**
   * Protected with owner passcode (`aura2026` or `76909`).
   * Add, edit, and delete products (images, prices, stock, sizes, colors, badges).
   * Manage active coupons & discount values.
   * Review saved order requests and update order statuses.

10. **Store Policies & Support:**
    * `/shipping-policy` (Rajasthan regional delivery details).
    * `/returns-exchanges` (7-day size exchange guarantee).
    * `/privacy-policy` & `/terms`.
    * `/about` & `/contact` (with WhatsApp direct concierge).

---

## 💻 Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router DOM v6, Lucide Icons, Canvas Confetti.
* **Backend:** Node.js, Express, CORS, JSON persistence (`server/data/`).
* **Design:** Mobile-first, vibrant fashion accents (Rose `#E11D48`, Purple `#8B5CF6`, Coral `#F97316`), elegant typography (Playfair Display, Plus Jakarta Sans).

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+ (tested with v22.14.0)
* npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/aaryansoni1992/aura-western.git
cd aura-western

# Install dependencies
npm install
```

### Running Locally

```bash
# Run both Express API (Port 5000) and Vite Frontend (Port 5173) concurrently:
npm run dev

# Open storefront:
http://localhost:5173

# Open owner admin panel:
http://localhost:5173/admin
# (Default passcode: aura2026 or 76909)
```

### Building for Production

```bash
npm run build
```

---

## 📱 WhatsApp Order Submission Specifications

* **Business WhatsApp Number:** `+91 76909 90903`
* **Destination Link Pattern:** `https://wa.me/917690990903?text=ENCODED_MESSAGE`
* **Message Structure:** Cleanly formatted text block detailing order reference, customer name, phone, Rajasthan delivery address, itemized garments (size, colour, unit price, quantity), applied coupons, delivery fees, and payable total.

---

## 📄 License

Proprietary © Aura Western. All rights reserved.
