import { create } from 'zustand';

export type Language = 'en' | 'fa';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => {
    set({ language: lang });
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  },
}));

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  
  const t = (en: string, fa: string) => {
    if (language === 'en') return en;
    return fa;
  };

  return { t, language };
}
