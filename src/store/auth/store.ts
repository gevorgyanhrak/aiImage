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
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.style.colorScheme = theme;
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
          prompt: 'A serene watercolor painting of a mountain lake at sunrise',
          resultUrl: 'https://image.pollinations.ai/prompt/A%20serene%20watercolor%20painting%20of%20a%20mountain%20lake%20at%20sunrise?width=400&height=500&seed=101&nologo=true',
          sourceUrl: 'https://image.pollinations.ai/prompt/mountain%20lake%20photograph?width=400&height=500&seed=201&nologo=true',
          createdAt: '2026-03-07T14:30:00Z',
        },
        {
          id: 'gen-2',
          prompt: 'Anime style portrait with vibrant neon colors and cherry blossoms',
          resultUrl: 'https://image.pollinations.ai/prompt/Anime%20style%20portrait%20with%20vibrant%20neon%20colors%20and%20cherry%20blossoms?width=400&height=500&seed=102&nologo=true',
          sourceUrl: 'https://image.pollinations.ai/prompt/portrait%20photograph%20of%20a%20person?width=400&height=500&seed=202&nologo=true',
          createdAt: '2026-03-07T10:15:00Z',
        },
        {
          id: 'gen-3',
          prompt: 'Cinematic dramatic lighting on a dark city street at night',
          resultUrl: 'https://image.pollinations.ai/prompt/Cinematic%20dramatic%20lighting%20on%20a%20dark%20city%20street%20at%20night?width=400&height=500&seed=103&nologo=true',
          sourceUrl: null,
          createdAt: '2026-03-06T18:45:00Z',
        },
        {
          id: 'gen-4',
          prompt: 'Cyberpunk neon portrait with glowing purple and blue lights',
          resultUrl: 'https://image.pollinations.ai/prompt/Cyberpunk%20neon%20portrait%20with%20glowing%20purple%20and%20blue%20lights?width=400&height=500&seed=104&nologo=true',
          sourceUrl: 'https://image.pollinations.ai/prompt/close%20up%20face%20photograph?width=400&height=500&seed=204&nologo=true',
          createdAt: '2026-03-06T09:20:00Z',
        },
        {
          id: 'gen-5',
          prompt: 'Oil painting of a sunflower field with impressionist brush strokes',
          resultUrl: 'https://image.pollinations.ai/prompt/Oil%20painting%20of%20a%20sunflower%20field%20with%20impressionist%20brush%20strokes?width=400&height=500&seed=105&nologo=true',
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
