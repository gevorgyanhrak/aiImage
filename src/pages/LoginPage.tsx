import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Sparkles, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/store';

const LoginPage = () => {
  const navigate = useNavigate();
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
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg-deep)] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <Sparkles className="h-5 w-5 text-[#F44097]" />
          <span className="text-lg font-bold tracking-[0.15em] uppercase neon-text">hrakAi</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-8">
          <h1 className="text-2xl font-bold text-[var(--page-text)] mb-1">Welcome back</h1>
          <p className="text-sm text-[var(--page-text-secondary)] mb-8">Sign in to your account</p>

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
              <Link to="/register" className="text-[#F44097]/70 hover:text-[#F44097] transition-colors">
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
    </div>
  );
};

export default LoginPage;
