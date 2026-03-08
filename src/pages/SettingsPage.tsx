import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Check, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import Header from '@/components/Header';
import { useAppStore } from '@/store/store';
import { cn } from '@/lib/utils';

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const updateProfile = useAppStore(s => s.updateProfile);
  const updatePassword = useAppStore(s => s.updatePassword);
  const theme = useAppStore(s => s.theme);
  const setTheme = useAppStore(s => s.setTheme);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const currentAvatar = avatarPreview ?? user.avatar;

  const onAvatarPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  const onSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Password change (optional — only if fields filled)
    if (oldPass || newPass) {
      if (!oldPass || !newPass) {
        setError('Fill both password fields to change password');
        return;
      }
      const result = updatePassword(oldPass, newPass);
      if (!result.success) {
        setError(result.error || 'Password update failed');
        return;
      }
    }

    // Profile + avatar
    const updates: { name?: string; email?: string; avatar?: string } = {};
    if (name.trim() !== user.name) updates.name = name.trim();
    if (email.trim() !== user.email) updates.email = email.trim();
    if (avatarPreview) updates.avatar = avatarPreview;

    if (Object.keys(updates).length > 0) {
      updateProfile(updates);
    }

    setOldPass('');
    setNewPass('');
    setAvatarPreview(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <h1 className="text-xl font-bold mb-8">Settings</h1>

          <form onSubmit={onSaveAll} className="flex flex-col gap-6">
            {/* ── Avatar ── */}
            <section className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6">
              <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-4">Avatar</h2>
              <div className="flex items-center gap-5">
                <div className="relative group">
                  {currentAvatar ? (
                    <img src={currentAvatar} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-[var(--surface-border)]" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F44097] to-[#FC67FA] text-xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-5 w-5 text-white/80" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="text-xs font-medium text-[#F44097]/70 hover:text-[#F44097] transition-colors"
                  >
                    Upload new photo
                  </button>
                  <p className="text-[10px] text-[var(--page-text-muted)] mt-0.5">JPG, PNG or WebP. Max 2MB.</p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={onAvatarPick}
                  className="hidden"
                />
              </div>
            </section>

            {/* ── Profile + Password ── */}
            <section className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 flex flex-col gap-5">
              <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)]">Profile</h2>

              <div>
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
                />
              </div>

              <div className="h-px bg-[var(--surface-border)]" />

              <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)]">Change Password <span className="normal-case tracking-normal font-normal">(optional)</span></h2>

              <div>
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">Current password</label>
                <div className="relative">
                  <input
                    type={showOld ? 'text' : 'password'}
                    value={oldPass}
                    onChange={e => setOldPass(e.target.value)}
                    className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 pr-10 text-sm text-[var(--input-text)] outline-none focus:border-[#F44097]/30 transition-colors"
                  />
                  <button type="button" onClick={() => setShowOld(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--page-text-muted)] hover:text-[var(--page-text-secondary)] transition-colors">
                    {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-1.5 block">New password</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full h-11 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 pr-10 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
                  />
                  <button type="button" onClick={() => setShowNew(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--page-text-muted)] hover:text-[var(--page-text-secondary)] transition-colors">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </section>

            {/* ── Appearance ── */}
            <section className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6">
              <h2 className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] mb-4">Appearance</h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex-1 flex items-center gap-3 rounded-xl border-2 p-4 transition-all',
                    theme === 'dark'
                      ? 'border-[#F44097]/40 bg-[#F44097]/5'
                      : 'border-[var(--surface-border)] bg-[var(--input-bg)] hover:border-[var(--surface-border-strong)]',
                  )}
                >
                  <div className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg',
                    theme === 'dark' ? 'bg-[#F44097]/10' : 'bg-[var(--surface)]',
                  )}>
                    <Moon className={cn('h-4 w-4', theme === 'dark' ? 'text-[#F44097]' : 'text-[var(--page-text-muted)]')} />
                  </div>
                  <div className="text-left">
                    <p className={cn('text-sm font-medium', theme === 'dark' ? 'text-[var(--page-text)]' : 'text-[var(--page-text-secondary)]')}>Dark</p>
                    <p className="text-[10px] text-[var(--page-text-muted)]">Dark background</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex-1 flex items-center gap-3 rounded-xl border-2 p-4 transition-all',
                    theme === 'light'
                      ? 'border-[#F44097]/40 bg-[#F44097]/5'
                      : 'border-[var(--surface-border)] bg-[var(--input-bg)] hover:border-[var(--surface-border-strong)]',
                  )}
                >
                  <div className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg',
                    theme === 'light' ? 'bg-[#F44097]/10' : 'bg-[var(--surface)]',
                  )}>
                    <Sun className={cn('h-4 w-4', theme === 'light' ? 'text-[#F44097]' : 'text-[var(--page-text-muted)]')} />
                  </div>
                  <div className="text-left">
                    <p className={cn('text-sm font-medium', theme === 'light' ? 'text-[var(--page-text)]' : 'text-[var(--page-text-secondary)]')}>Light</p>
                    <p className="text-[10px] text-[var(--page-text-muted)]">Light background</p>
                  </div>
                </button>
              </div>
            </section>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="self-start flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F44097] to-[#FC67FA] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(244,64,151,0.2)] hover:shadow-[0_0_24px_rgba(244,64,151,0.35)] active:translate-y-px transition-all"
            >
              {saved ? <><Check className="h-4 w-4" /> Saved</> : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
