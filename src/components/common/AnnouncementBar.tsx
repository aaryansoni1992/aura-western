import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, PhoneCall, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-amber-300" />,
      text: 'FREE Express Delivery Across Rajasthan on Orders Above ₹999',
      link: '/shop'
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-pink-300" />,
      text: 'Special Offer: Flat 10% OFF with Coupon Code "AURA10"',
      link: '/shop'
    },
    {
      icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />,
      text: `Order Seamlessly on WhatsApp: ${WHATSAPP_DISPLAY_PHONE}`,
      link: '/contact'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];

  return (
    <div className="bg-slate-900 text-white text-xs font-medium py-2 px-4 border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Rajasthan Badge */}
        <div className="hidden md:flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Serving All Rajasthan Districts</span>
        </div>

        {/* Dynamic Announcement Ticker */}
        <div className="flex-1 flex items-center justify-center text-center px-2">
          <Link
            to={current.link}
            className="inline-flex items-center gap-2 hover:text-rose-300 transition-colors duration-200 group"
          >
            {current.icon}
            <span className="tracking-wide">{current.text}</span>
            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Quick Help & Track */}
        <div className="hidden lg:flex items-center gap-4 text-slate-300">
          <Link to="/track-order" className="hover:text-white transition-colors">
            Track Order
          </Link>
          <span className="text-slate-600">|</span>
          <Link to="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};
