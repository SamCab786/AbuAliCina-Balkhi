import { useState } from 'react';
import { FileText, Download, Eye, X } from 'lucide-react';
import { useTranslation } from '../store/languageStore';

export function SampleFormulas() {
  const { t } = useTranslation();
  const [selectedSample, setSelectedSample] = useState<any>(null);

  const samples = [
    { id: 1, name: t('Basic Hydrating Lotion', 'لوسیون آبرسان پایه'), type: t('Lotion', 'لوسیون'), ingredients: 12, status: t('Validated', 'معتبر') },
    { id: 2, name: t('Anti-Aging Night Cream', 'کرم شب ضد پیری'), type: t('Cream', 'کرم'), ingredients: 18, status: t('Validated', 'معتبر') },
    { id: 3, name: t('Vitamin C Brightening Serum', 'سرم روشن‌کننده ویتامین سی'), type: t('Serum', 'سرم'), ingredients: 8, status: t('Validated', 'معتبر') },
    { id: 4, name: t('Soothing Aloe Gel', 'ژل تسکین‌دهنده آلوئه‌ورا'), type: t('Gel', 'ژل'), ingredients: 6, status: t('Validated', 'معتبر') },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Sample Formulas', 'فرمول‌های نمونه')}</h2>
          <p className="text-gray-500 mt-1">{t('Pre-validated templates to start your formulation.', 'قالب‌های از پیش تأیید شده برای شروع فرمولاسیون.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {samples.map((sample) => (
          <div key={sample.id} className="card p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="badge badge-success">{sample.status}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-2">{sample.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('Type:', 'نوع:')} {sample.type} • {t('Ingredients:', 'ترکیبات:')} {sample.ingredients}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button 
                onClick={() => setSelectedSample(sample)}
                className="flex-1 btn-secondary text-sm py-1.5 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> {t('View', 'مشاهده')}
              </button>
              <button className="flex-1 btn-primary text-sm py-1.5 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> {t('Clone', 'کپی')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sample Details Modal */}
      {selectedSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-deep-slate)]">{selectedSample.name}</h3>
                  <p className="text-gray-500">{selectedSample.type}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSample(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">{t('Total Ingredients', 'کل ترکیبات')}</span>
                  <span className="font-medium text-[var(--color-deep-slate)]">{selectedSample.ingredients}</span>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block mb-1">{t('Status', 'وضعیت')}</span>
                  <span className="font-medium text-emerald-900">{selectedSample.status}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-4">{t('Description', 'توضیحات')}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('This is a pre-validated template designed to provide a stable baseline for your formulations. You can clone this formula into your Formulation Lab to customize the active ingredients and adjust percentages according to your specific requirements.', 'این یک قالب از پیش تأیید شده است که برای ارائه یک پایه پایدار برای فرمولاسیون‌های شما طراحی شده است. می‌توانید این فرمول را در آزمایشگاه فرمولاسیون خود کپی کنید تا ترکیبات فعال را سفارشی کنید و درصدها را مطابق با نیازهای خاص خود تنظیم کنید.')}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedSample(null)}
                className="btn-secondary"
              >
                {t('Close', 'بستن')}
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" /> {t('Clone to Lab', 'کپی در آزمایشگاه')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
