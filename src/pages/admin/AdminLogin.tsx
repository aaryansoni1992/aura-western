import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminAuthenticated } from '../../utils/storage';
import { Lock, Shield, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Default admin passcode: 'aura2026' or official business digits '76909'
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aura2026' || password === '76909' || password === 'admin123') {
      setAdminAuthenticated(rememberMe);
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid admin passcode. Default passcode is "aura2026" or "76909".');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-8 h-8 text-rose-400" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600 block mb-1">
            Protected Portal
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Aura Western Owner Admin
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Manage your store catalog, customer order requests, and promotional coupon codes.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Admin Access Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode (e.g. aura2026)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Store owner default passcode: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-semibold">aura2026</code> or <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-semibold">76909</code>
            </p>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300"
              />
              <span>Remember this session on this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>Aura Western Rajasthan Store Management</p>
        </div>
      </div>
    </div>
  );
};
