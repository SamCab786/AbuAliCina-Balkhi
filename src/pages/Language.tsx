import { Globe, Check } from 'lucide-react';
import { useLanguageStore, useTranslation } from '../store/languageStore';
import { cn } from '../lib/utils';

export function Language() {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Language', 'زبان')}</h2>
          <p className="text-gray-500 mt-1">{t('Select your preferred language.', 'زبان مورد نظر خود را انتخاب کنید.')}</p>
        </div>
      </div>

      <div className="card p-8 max-w-2xl mx-auto mt-12">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-center text-[var(--color-deep-slate)] mb-8">
          {t('Choose Language', 'انتخاب زبان')}
        </h3>

        <div className="space-y-4">
          <button 
            onClick={() => setLanguage('en')}
            className={cn(
              "w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all",
              language === 'en' ? "border-[var(--color-forest-green)] bg-emerald-50" : "border-gray-100 hover:border-gray-300 bg-white"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🇺🇸</span>
              <div className="text-start">
                <h4 className={cn("font-bold text-lg", language === 'en' ? "text-[var(--color-deep-slate)]" : "text-gray-600")}>{t('English', 'انگلیسی')}</h4>
                <p className={cn("text-sm", language === 'en' ? "text-gray-500" : "text-gray-400")}>{t('English', 'انگلیسی')}</p>
              </div>
            </div>
            {language === 'en' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-forest-green)] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </button>

          <button 
            onClick={() => setLanguage('fa')}
            className={cn(
              "w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all",
              language === 'fa' ? "border-[var(--color-forest-green)] bg-emerald-50" : "border-gray-100 hover:border-gray-300 bg-white"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🇮🇷</span>
              <div className="text-start">
                <h4 className={cn("font-bold text-lg", language === 'fa' ? "text-[var(--color-deep-slate)]" : "text-gray-600")}>{t('Persian', 'فارسی')}</h4>
                <p className={cn("text-sm", language === 'fa' ? "text-gray-500" : "text-gray-400")}>{t('Persian', 'فارسی')}</p>
              </div>
            </div>
            {language === 'fa' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-forest-green)] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
