import { Construction } from 'lucide-react';
import { useTranslation } from '../store/languageStore';

export function ComingSoon() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] mb-4">{t('Coming Soon', 'به زودی')}</h2>
      <p className="text-gray-500 max-w-md">
        {t('This feature is currently under development. Please check back later.', 'این ویژگی در حال حاضر در دست توسعه است. لطفاً بعداً دوباره بررسی کنید.')}
      </p>
    </div>
  );
}
