import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createSupportWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';

export const WhatsAppFloatingBtn: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end group">
      {/* Friendly Tooltip Card */}
      {showTooltip && (
        <div className="mb-2 relative bg-white border border-slate-200/90 rounded-2xl p-3 shadow-lg max-w-xs text-xs animate-slide-up flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Need styling advice or have an inquiry?</p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Chat live with Aura Western on WhatsApp ({WHATSAPP_DISPLAY_PHONE}).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <a
        href={createSupportWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-sm group-hover:pr-5"
        aria-label="Chat with Aura Western on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline-block">Order on WhatsApp</span>
      </a>
    </div>
  );
};
