export type Theme = 'dark' | 'light';

export interface GenerationRecord {
  id: string;
  prompt: string;
  resultUrl: string;
  sourceUrl: string | null;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  credits: number;
  generations: GenerationRecord[];
}

export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: Theme;

  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  useCredits: (amount: number) => boolean;
  addGeneration: (record: Omit<GenerationRecord, 'id' | 'createdAt'>) => void;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'avatar'>>) => void;
  updatePassword: (oldPassword: string, newPassword: string) => { success: boolean; error?: string };
  setTheme: (theme: Theme) => void;
}
