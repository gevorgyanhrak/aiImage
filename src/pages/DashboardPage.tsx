import { Link, useNavigate } from 'react-router';
import { Sparkles, Coins, ImageIcon, Clock, LogOut, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { useAppStore } from '@/store/store';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const logout = useAppStore(s => s.logout);

  if (!user) {
    navigate('/login');
    return null;
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Profile header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F44097] to-[#FC67FA] text-lg font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <p className="text-sm text-white/35">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Credits */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F44097]/10">
                  <Coins className="h-4 w-4 text-[#F44097]" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35">Credits</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.credits}</p>
              <p className="text-[11px] text-white/25 mt-1">Available to use</p>
            </div>

            {/* Total generations */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9333ea]/10">
                  <ImageIcon className="h-4 w-4 text-[#9333ea]" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35">Generated</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.generations.length}</p>
              <p className="text-[11px] text-white/25 mt-1">Total creations</p>
            </div>

            {/* Quick action */}
            <Link
              to="/ai-filters"
              className="group rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#F44097]/5 to-transparent p-5 hover:from-[#F44097]/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F44097]/10">
                  <Sparkles className="h-4 w-4 text-[#F44097]" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/35">Create</span>
              </div>
              <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                Start generating
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[11px] text-[#F44097]/60">Try AI Filters</span>
                <ArrowRight className="h-3 w-3 text-[#F44097]/40 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Generation history */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Clock className="h-4 w-4 text-white/25" />
              <h2 className="text-sm font-semibold text-white/60">Generation History</h2>
            </div>

            {user.generations.length === 0 ? (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] py-16 flex flex-col items-center gap-3">
                <ImageIcon className="h-8 w-8 text-white/10" />
                <p className="text-sm text-white/25">No generations yet</p>
                <Link
                  to="/ai-filters"
                  className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F44097] to-[#FC67FA] px-4 py-2 text-xs font-semibold text-white"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Create your first
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {user.generations.map(gen => (
                  <div
                    key={gen.id}
                    className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex gap-4 hover:bg-white/[0.05] transition-colors"
                  >
                    {/* Source image */}
                    {gen.sourceUrl && (
                      <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/[0.06] bg-black/40">
                        <img src={gen.sourceUrl} alt="Source" className="h-full w-full object-cover" />
                      </div>
                    )}

                    {/* Prompt */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{gen.prompt}</p>
                      <p className="text-[10px] text-white/20 mt-1">{formatDate(gen.createdAt)}</p>
                    </div>

                    {/* Result */}
                    <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/[0.06] bg-black/40 relative">
                      <img src={gen.resultUrl} alt="Result" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
