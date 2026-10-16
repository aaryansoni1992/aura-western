import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { CartProvider } from './context/CartContext';

// Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingBtn } from './components/common/WhatsAppFloatingBtn';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsExchangesPage } from './pages/ReturnsExchangesPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper for standard store pages
function StoreLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <AnnouncementBar />}
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloatingBtn />}
    </div>
  );
}

export function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <StoreLayout>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Shop & All Products */}
              <Route path="/shop" element={<ShopPage />} />

              {/* Category Pages */}
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/category/womens-western-wear" element={<CategoryPage />} />
              <Route path="/category/t-shirts" element={<CategoryPage />} />
              <Route path="/category/shirts-tops" element={<CategoryPage />} />
              <Route path="/category/jeans-trousers" element={<CategoryPage />} />
              <Route path="/category/dresses-co-ord-sets" element={<CategoryPage />} />
              <Route path="/category/jackets-winter-wear" element={<CategoryPage />} />
              <Route path="/category/accessories" element={<CategoryPage />} />

              {/* Product Details */}
              <Route path="/product/:slug" element={<ProductDetailPage />} />

              {/* Shopping Cart & Checkout */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:reference" element={<OrderConfirmationPage />} />

              {/* Order Tracking */}
              <Route path="/track-order" element={<TrackOrderPage />} />

              {/* Informational & Support */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Policies */}
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/returns-exchanges" element={<ReturnsExchangesPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Admin Panel */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </StoreLayout>
        </BrowserRouter>
      </CartProvider>
    </ShopProvider>
  );
}

export default App;
