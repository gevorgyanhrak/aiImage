import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Sparkles, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/store';

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAppStore(s => s.register);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1113] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <Sparkles className="h-5 w-5 text-[#F44097]" />
          <span className="text-lg font-bold tracking-[0.15em] uppercase neon-text">hrakAi</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
          <p className="text-sm text-white/35 mb-8">Start creating with AI</p>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35 mb-1.5 block">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-[#F44097]/30 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-[#F44097]/30 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 pr-10 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-[#F44097]/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
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
              <UserPlus className="h-4 w-4" />
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-white/30">
              Already have an account?{' '}
              <Link to="/login" className="text-[#F44097]/70 hover:text-[#F44097] transition-colors">
                Sign in
              </Link>
            </span>
          </div>

          {/* Bonus hint */}
          <div className="mt-6 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] text-white/25 leading-relaxed">
              New accounts get <span className="text-[#F44097]/60 font-semibold">100 free credits</span> to start creating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
