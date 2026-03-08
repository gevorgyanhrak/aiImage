import { useState } from 'react';
import { Link } from 'react-router';
import { LogIn, Eye, EyeOff, X } from 'lucide-react';
import { useAppStore } from '@/store/store';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const login = useAppStore(s => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setError(result.error || 'Login failed');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--page-text-muted)] hover:text-[var(--page-text)] hover:bg-[var(--surface-hover)] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-[var(--page-text)] mb-1">Sign in to continue</h2>
        <p className="text-sm text-[var(--page-text-secondary)] mb-8">Log in to generate with hrakAi</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="demo@hrakai.com"
              required
              className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="demo123"
                required
                className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 pr-10 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--page-text-muted)] hover:text-[var(--page-text-secondary)] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F44097] to-[#FC67FA] text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.2)] hover:shadow-[0_0_32px_rgba(244,64,151,0.35)] active:translate-y-px transition-all"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-xs text-[var(--page-text-muted)]">
            Don't have an account?{' '}
            <Link to="/register" onClick={onClose} className="text-[#F44097]/70 hover:text-[#F44097] transition-colors">
              Sign up
            </Link>
          </span>
        </div>

        {/* Demo hint */}
        <div className="mt-6 rounded-lg border border-[var(--surface-border)] bg-[var(--input-bg)] px-4 py-3">
          <p className="text-[10px] text-[var(--page-text-muted)] leading-relaxed">
            Demo credentials: <span className="text-[var(--page-text-secondary)]">demo@hrakai.com</span> / <span className="text-[var(--page-text-secondary)]">demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
