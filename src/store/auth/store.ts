import type { StateCreator } from 'zustand';
import type { IAuthState, User, GenerationRecord, Theme } from './types';

const THEME_KEY = 'hrakai-theme';

function loadTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {}
  return 'dark';
}

function applyTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
}

// Apply on load
applyTheme(loadTheme());

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'demo@hrakai.com': {
    password: 'demo123',
    user: {
      id: '1',
      name: 'Demo User',
      email: 'demo@hrakai.com',
      avatar: '',
      credits: 50,
      generations: [
        {
          id: 'gen-1',
          prompt: 'Make it look like a watercolor painting',
          resultUrl: 'https://picsum.photos/seed/gen1/400/500',
          sourceUrl: 'https://picsum.photos/seed/src1/400/500',
          createdAt: '2026-03-07T14:30:00Z',
        },
        {
          id: 'gen-2',
          prompt: 'Transform into anime style with vibrant colors',
          resultUrl: 'https://picsum.photos/seed/gen2/400/500',
          sourceUrl: 'https://picsum.photos/seed/src2/400/500',
          createdAt: '2026-03-07T10:15:00Z',
        },
        {
          id: 'gen-3',
          prompt: 'Add cinematic lighting and dramatic shadows',
          resultUrl: 'https://picsum.photos/seed/gen3/400/500',
          sourceUrl: null,
          createdAt: '2026-03-06T18:45:00Z',
        },
        {
          id: 'gen-4',
          prompt: 'Create a cyberpunk neon portrait',
          resultUrl: 'https://picsum.photos/seed/gen4/400/500',
          sourceUrl: 'https://picsum.photos/seed/src4/400/500',
          createdAt: '2026-03-06T09:20:00Z',
        },
        {
          id: 'gen-5',
          prompt: 'Oil painting style with impressionist brush strokes',
          resultUrl: 'https://picsum.photos/seed/gen5/400/500',
          sourceUrl: null,
          createdAt: '2026-03-05T16:00:00Z',
        },
      ],
    },
  },
};

const STORAGE_KEY = 'hrakai-auth';

function loadPersistedUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as User;
  } catch {}
  return null;
}

function persistUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

const persisted = loadPersistedUser();

const useAuthStore: StateCreator<IAuthState> = (set, get) => ({
  user: persisted,
  isAuthenticated: !!persisted,
  theme: loadTheme(),

  login: (email: string, password: string) => {
    const entry = DEMO_USERS[email];
    if (entry && entry.password === password) {
      const user = { ...entry.user };
      persistUser(user);
      set({ user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  register: (name: string, email: string, _password: string) => {
    if (DEMO_USERS[email]) {
      return { success: false, error: 'Email already registered' };
    }
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      avatar: '',
      credits: 100,
      generations: [],
    };
    DEMO_USERS[email] = { password: _password, user };
    persistUser(user);
    set({ user, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    persistUser(null);
    set({ user: null, isAuthenticated: false });
  },

  useCredits: (amount: number) => {
    const { user } = get();
    if (!user || user.credits < amount) return false;
    const updated = { ...user, credits: user.credits - amount };
    persistUser(updated);
    set({ user: updated });
    return true;
  },

  addGeneration: (record) => {
    const { user } = get();
    if (!user) return;
    const gen: GenerationRecord = {
      ...record,
      id: `gen-${crypto.randomUUID().slice(0, 8)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = {
      ...user,
      generations: [gen, ...user.generations],
    };
    persistUser(updated);
    set({ user: updated });
  },

  updateProfile: (updates) => {
    const { user } = get();
    if (!user) return;
    const updated = { ...user, ...updates };
    // Sync email key in DEMO_USERS if email changed
    if (updates.email && updates.email !== user.email && DEMO_USERS[user.email]) {
      const entry = DEMO_USERS[user.email];
      delete DEMO_USERS[user.email];
      DEMO_USERS[updates.email] = { ...entry, user: updated };
    } else if (DEMO_USERS[updated.email]) {
      DEMO_USERS[updated.email].user = updated;
    }
    persistUser(updated);
    set({ user: updated });
  },

  updatePassword: (oldPassword: string, newPassword: string) => {
    const { user } = get();
    if (!user) return { success: false, error: 'Not logged in' };
    const entry = DEMO_USERS[user.email];
    if (!entry || entry.password !== oldPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }
    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters' };
    }
    entry.password = newPassword;
    return { success: true };
  },

  setTheme: (theme: Theme) => {
    applyTheme(theme);
    set({ theme });
  },
});

export default useAuthStore;
