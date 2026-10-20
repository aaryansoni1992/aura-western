import React, { useState } from 'react';
import { setAdminAuthenticated, verifyAdminLogin, getAdminCredentials } from '../../utils/storage';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const currentCreds = getAdminCredentials();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your Login ID / Username.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your Admin Password.');
      return;
    }

    const isValid = verifyAdminLogin(username, password);

    if (isValid) {
      setAdminAuthenticated(rememberMe);
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid Login ID or Password. Check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md font-serif text-2xl font-bold">
            AW
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600 block mb-1">
            Store Owner Access
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Aura Western Admin
          </h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Manage your fashion catalog, upload photos, edit descriptions, adjust prices & manage orders.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Login ID / Username */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Login ID / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter login ID (e.g. admin)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <span>Remember login on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-fashion hover:shadow-fashion-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Owner Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials Info Box */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Default Owner Credentials:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px] font-sans">LOGIN ID:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold block truncate">
                {currentCreds.username || 'admin'}
              </code>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-sans">PASSWORD:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold block truncate">
                {currentCreds.password || 'Aura@2026'}
              </code>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 pt-1">
            * Aap admin panel me login karne ke baad apna ID aur Password kabhi bhi change kar sakte hain.
          </p>
        </div>
      </div>
    </div>
  );
};
