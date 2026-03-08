import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Coins, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/store';
import { cn } from '@/lib/utils';

const UserPopup = () => {
  const user = useAppStore(s => s.user);
  const logout = useAppStore(s => s.logout);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen(p => !p), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (!user) return null;

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-colors',
          open
            ? 'border-[#F44097]/20 bg-[#F44097]/5'
            : 'border-[var(--surface-border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]',
        )}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#F44097] to-[#FC67FA] text-[10px] font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-xs font-medium text-[var(--page-text-secondary)] hidden sm:inline max-w-[80px] truncate">
          {user.name}
        </span>
        <ChevronDown className={cn('h-3 w-3 text-[var(--page-text-muted)] transition-transform', open && 'rotate-180')} />
      </button>

      {/* Popup */}
      <div
        className={cn(
          'absolute right-0 top-full mt-2 w-[260px] rounded-xl border border-[var(--surface-border-strong)] bg-[var(--popup-bg)] shadow-xl shadow-[var(--popup-shadow)] transition-all origin-top-right',
          open
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none',
        )}
      >
        {/* User info + credits */}
        <div className="p-4 border-b border-[var(--surface-border)]">
          <div className="flex items-center gap-3 mb-3">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F44097] to-[#FC67FA] text-sm font-bold text-white shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--page-text)] truncate">{user.name}</p>
              <p className="text-[11px] text-[var(--page-text-muted)] truncate">{user.email}</p>
            </div>
          </div>

          {/* Credits bar */}
          <div className="flex items-center gap-2 rounded-lg bg-[var(--surface)] border border-[var(--surface-border)] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F44097]/10">
              <Coins className="h-3.5 w-3.5 text-[#F44097]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[var(--page-text-muted)] leading-none mb-0.5">Credits</p>
              <p className="text-sm font-bold text-[var(--page-text)] leading-none">{user.credits}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-1.5">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--page-text-secondary)] hover:text-[var(--page-text)] hover:bg-[var(--surface)] transition-colors"
          >
            <User className="h-4 w-4" />
            Your Profile
          </Link>
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--page-text-secondary)] hover:text-[var(--page-text)] hover:bg-[var(--surface)] transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>

        {/* Logout */}
        <div className="p-1.5 border-t border-[var(--surface-border)]">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--page-text-muted)] hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
