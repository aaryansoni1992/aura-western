import React, { useState } from 'react';
import {
  setAdminAuthenticated,
  verifyAdminLogin,
  getAdminCredentials,
  saveAdminCredentials,
  resetAdminCredentials
} from '../../utils/storage';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Key,
  CheckCircle2,
  X,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

export const AdminLogin: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const currentCreds = getAdminCredentials();

  const [username, setUsername] = useState(currentCreds.username || 'admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Change ID / Password Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [verifyKey, setVerifyKey] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState(currentCreds.username || 'admin');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

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
      setError('Invalid Login ID or Password. Check credentials or click "Change ID & Password" below.');
    }
  };

  const handleOpenChangeModal = () => {
    const creds = getAdminCredentials();
    setNewUsernameInput(creds.username || 'admin');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setVerifyKey('');
    setModalError('');
    setModalSuccess('');
    setModalOpen(true);
  };

  const handleSubmitChangeCreds = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');

    const creds = getAdminCredentials();
    const cleanVerify = verifyKey.trim();

    // Verification check: Current Password OR Owner Phone PIN (76909 / 7690990903) OR default Aura@2026
    const isVerified =
      cleanVerify === creds.password ||
      cleanVerify === '76909' ||
      cleanVerify === '7690990903' ||
      cleanVerify === '+917690990903' ||
      cleanVerify === 'Aura@2026' ||
      cleanVerify === 'aura2026';

    if (!isVerified) {
      setModalError('Verification failed! Enter your current password OR store security PIN (76909).');
      return;
    }

    if (!newUsernameInput.trim()) {
      setModalError('New Login ID cannot be empty.');
      return;
    }

    if (newPasswordInput.length < 4) {
      setModalError('New Password must be at least 4 characters long.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setModalError('Passwords do not match! Please check and retype.');
      return;
    }

    // Save updated credentials
    saveAdminCredentials({
      username: newUsernameInput.trim(),
      password: newPasswordInput.trim(),
      name: 'Aura Western Owner'
    });

    // Auto-fill login inputs
    setUsername(newUsernameInput.trim());
    setPassword(newPasswordInput.trim());
    setModalSuccess('Login ID and Password updated successfully! Click "Done & Sign In" to continue.');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset Admin Login credentials back to default (admin / Aura@2026)?')) {
      resetAdminCredentials();
      setUsername('admin');
      setPassword('Aura@2026');
      setModalSuccess('Reset to defaults: ID "admin" and Password "Aura@2026".');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card relative">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Password
              </label>
              <button
                type="button"
                onClick={handleOpenChangeModal}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                <span>Change ID / Password?</span>
              </button>
            </div>
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

        {/* Change ID & Password Quick Button */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-center">
          <button
            type="button"
            onClick={handleOpenChangeModal}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <Key className="w-4 h-4 text-amber-600" />
            <span>Owner: Change Login ID & Password Here</span>
          </button>
        </div>

        {/* Active Credentials Summary Card */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2 text-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Current Login Credentials:</span>
            </div>
            <button
              type="button"
              onClick={handleOpenChangeModal}
              className="text-[11px] text-rose-600 hover:underline font-bold"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px] font-sans font-semibold">LOGIN ID:</span>
              <code className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-800 font-bold block truncate">
                {currentCreds.username || 'admin'}
              </code>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-sans font-semibold">PASSWORD:</span>
              <code className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-800 font-bold block truncate">
                {currentCreds.password || 'Aura@2026'}
              </code>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 pt-0.5">
            💡 Emergency Recovery PIN: <strong className="text-slate-700">76909</strong> (Aura Western Store Phone PIN).
          </p>
        </div>
      </div>

      {/* --- CHANGE LOGIN ID & PASSWORD MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-scale-up border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">
                    Change ID & Password
                  </h3>
                  <p className="text-xs text-slate-500">
                    Set your custom Store Owner login credentials
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success message */}
            {modalSuccess && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex flex-col gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{modalSuccess}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    // trigger login directly with updated credentials
                    const creds = getAdminCredentials();
                    if (verifyAdminLogin(creds.username, creds.password)) {
                      setAdminAuthenticated(true);
                      onLoginSuccess();
                    }
                  }}
                  className="mt-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold text-center transition-colors"
                >
                  Done & Sign In Instantly →
                </button>
              </div>
            )}

            {/* Error message */}
            {modalError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Form */}
            {!modalSuccess && (
              <form onSubmit={handleSubmitChangeCreds} className="mt-5 space-y-4 text-xs sm:text-sm">
                {/* Security Verification */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Current Password or Store PIN
                  </label>
                  <input
                    type="password"
                    required
                    value={verifyKey}
                    onChange={(e) => setVerifyKey(e.target.value)}
                    placeholder="Enter current password or PIN (76909)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Security check: Apka current password ya phone PIN <strong className="text-slate-600">76909</strong> dalein.
                  </span>
                </div>

                {/* New Username / ID */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    New Login ID / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={newUsernameInput}
                    onChange={(e) => setNewUsernameInput(e.target.value)}
                    placeholder="e.g. admin or owner or mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Aap apna naam, mobile number ya email bhi Login ID rakh sakte hain.
                  </span>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Retype new password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium order-2 sm:order-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset to Defaults</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-xs shadow-md"
                    >
                      Save New Credentials
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
