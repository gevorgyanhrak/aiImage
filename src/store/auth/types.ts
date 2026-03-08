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

  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  useCredits: (amount: number) => boolean;
  addGeneration: (record: Omit<GenerationRecord, 'id' | 'createdAt'>) => void;
}
