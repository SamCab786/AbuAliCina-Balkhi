import { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, X, FileText } from 'lucide-react';
import { useTranslation } from '../store/languageStore';

export function Compliance() {
  const { t } = useTranslation();
  const [selectedCheck, setSelectedCheck] = useState<any>(null);

  const checks = [
    { id: 1, name: t('EU Cosmetics Regulation (EC 1223/2009)', 'مقررات آرایشی بهداشتی اتحادیه اروپا (EC 1223/2009)'), status: 'pass', message: t('All active formulas compliant', 'تمام فرمول‌های فعال منطبق هستند') },
    { id: 2, name: t('FDA MoCRA Facility Registration', 'ثبت تسهیلات FDA MoCRA'), status: 'warning', message: t('Registration renewal due in 30 days', 'تمدید ثبت در ۳۰ روز آینده') },
    { id: 3, name: t('California Proposition 65', 'پیشنهاد ۶۵ کالیفرنیا'), status: 'pass', message: t('No listed chemicals detected', 'هیچ ماده شیمیایی فهرست شده‌ای شناسایی نشد') },
    { id: 4, name: t('IFRA Standards (Fragrance)', 'استانداردهای IFRA (عطر)'), status: 'fail', message: t('Formula "Night Cream" exceeds limits', 'فرمول "کرم شب" از حد مجاز فراتر رفته است') },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Compliance', 'انطباق')}</h2>
          <p className="text-gray-500 mt-1">{t('Regulatory status and compliance checks.', 'وضعیت نظارتی و بررسی‌های انطباق.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 bg-emerald-50 border-emerald-100">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-emerald-900">{t('Passed', 'تأیید شده')}</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-700">2</p>
        </div>
        <div className="card p-6 bg-amber-50 border-amber-100">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg font-bold text-amber-900">{t('Warnings', 'هشدارها')}</h3>
          </div>
          <p className="text-3xl font-bold text-amber-700">1</p>
        </div>
        <div className="card p-6 bg-red-50 border-red-100">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">{t('Failed', 'رد شده')}</h3>
          </div>
          <p className="text-3xl font-bold text-red-700">1</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[var(--color-deep-slate)]">{t('Automated Checks', 'بررسی‌های خودکار')}</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {checks.map((check) => (
            <div key={check.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {check.status === 'pass' && <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1" />}
                {check.status === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />}
                {check.status === 'fail' && <XCircle className="w-6 h-6 text-red-500 mt-1" />}
                <div>
                  <h4 className="font-semibold text-[var(--color-deep-slate)] text-lg">{check.name}</h4>
                  <p className="text-gray-500 mt-1">{check.message}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCheck(check)}
                className="btn-secondary text-sm"
              >
                {t('View Details', 'مشاهده جزئیات')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Details Modal */}
      {selectedCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedCheck.status === 'pass' ? 'bg-emerald-100' :
                  selectedCheck.status === 'warning' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  {selectedCheck.status === 'pass' && <ShieldCheck className="w-6 h-6 text-emerald-600" />}
                  {selectedCheck.status === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {selectedCheck.status === 'fail' && <XCircle className="w-6 h-6 text-red-600" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-deep-slate)]">{selectedCheck.name}</h3>
                  <p className="text-gray-500">{t('Compliance Check Details', 'جزئیات بررسی انطباق')}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCheck(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className={`p-4 rounded-xl border ${
                selectedCheck.status === 'pass' ? 'bg-emerald-50 border-emerald-100' :
                selectedCheck.status === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'
              }`}>
                <h4 className={`text-sm font-bold mb-2 ${
                  selectedCheck.status === 'pass' ? 'text-emerald-900' :
                  selectedCheck.status === 'warning' ? 'text-amber-900' : 'text-red-900'
                }`}>{t('Status Message', 'پیام وضعیت')}</h4>
                <p className={`text-lg ${
                  selectedCheck.status === 'pass' ? 'text-emerald-800' :
                  selectedCheck.status === 'warning' ? 'text-amber-800' : 'text-red-800'
                }`}>{selectedCheck.message}</p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-4">{t('Detailed Analysis', 'تحلیل دقیق')}</h4>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
                  {selectedCheck.status === 'pass' && (
                    <p className="text-gray-700 leading-relaxed">
                      {t('All automated checks for this regulation have passed successfully. The current formulations and processes align with the required standards. No further action is required at this time. Continue to monitor for any regulatory updates.', 'تمام بررسی‌های خودکار برای این مقررات با موفقیت انجام شد. فرمولاسیون‌ها و فرآیندهای فعلی با استانداردهای مورد نیاز مطابقت دارند. در حال حاضر هیچ اقدام دیگری لازم نیست. به نظارت بر هرگونه به‌روزرسانی نظارتی ادامه دهید.')}
                    </p>
                  )}
                  {selectedCheck.status === 'warning' && (
                    <p className="text-gray-700 leading-relaxed">
                      {t('This item requires your attention soon. While not currently in violation, proactive measures should be taken to ensure continued compliance. Please review the specific requirements and schedule the necessary updates or renewals.', 'این مورد به زودی نیاز به توجه شما دارد. در حالی که در حال حاضر تخلفی صورت نگرفته است، باید اقدامات پیشگیرانه برای اطمینان از انطباق مستمر انجام شود. لطفاً الزامات خاص را بررسی کرده و به‌روزرسانی‌ها یا تمدیدهای لازم را برنامه‌ریزی کنید.')}
                    </p>
                  )}
                  {selectedCheck.status === 'fail' && (
                    <p className="text-gray-700 leading-relaxed">
                      {t('CRITICAL: This item is currently non-compliant. Immediate action is required to rectify the issue. Review the specific formula or process that triggered this failure and make the necessary adjustments to meet regulatory standards before proceeding with production.', 'بحرانی: این مورد در حال حاضر غیرمنطبق است. اقدام فوری برای رفع مشکل لازم است. فرمول یا فرآیند خاصی که باعث این خرابی شده است را بررسی کنید و تنظیمات لازم را برای رعایت استانداردهای نظارتی قبل از ادامه تولید انجام دهید.')}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedCheck(null)}
                className="btn-secondary"
              >
                {t('Close', 'بستن')}
              </button>
              <button className="btn-primary flex items-center gap-2">
                <FileText className="w-4 h-4" /> {t('Download Report', 'دانلود گزارش')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
