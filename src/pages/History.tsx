import { useState } from 'react';
import { Activity, Clock, FlaskConical, Microscope, Factory, X } from 'lucide-react';
import { useTranslation } from '../store/languageStore';

export function History() {
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const activities = [
    { id: 1, type: 'formula', title: t('Hydrating Aloe Serum Updated', 'سرم آلوئه ورا آبرسان به‌روز شد'), time: t('2 hours ago', '۲ ساعت پیش'), icon: FlaskConical, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 2, type: 'research', title: t('Centella Asiatica Analyzed', 'سنتلا آسیاتیکا تحلیل شد'), time: t('5 hours ago', '۵ ساعت پیش'), icon: Microscope, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 3, type: 'production', title: t('Batch B-2023-001 Completed', 'دسته B-2023-001 تکمیل شد'), time: t('1 day ago', '۱ روز پیش'), icon: Factory, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 4, type: 'formula', title: t('New Formula Created: Night Cream', 'فرمول جدید ایجاد شد: کرم شب'), time: t('2 days ago', '۲ روز پیش'), icon: FlaskConical, color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 5, type: 'system', title: t('System Update Completed', 'به‌روزرسانی سیستم تکمیل شد'), time: t('3 days ago', '۳ روز پیش'), icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('History', 'تاریخچه')}</h2>
          <p className="text-gray-500 mt-1">{t('Recent activities and system logs.', 'فعالیت‌های اخیر و گزارش‌های سیستم.')}</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ms-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer"
              onClick={() => setSelectedActivity(activity)}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${activity.bg} ${activity.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-transform group-hover:scale-110`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card p-4 hover:shadow-md transition-shadow border border-transparent hover:border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-[var(--color-deep-slate)] text-sm">{activity.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedActivity.bg} flex items-center justify-center`}>
                  <selectedActivity.icon className={`w-5 h-5 ${selectedActivity.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-deep-slate)]">{t('Activity Details', 'جزئیات فعالیت')}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedActivity(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-2">{selectedActivity.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{selectedActivity.time}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700">
                  {selectedActivity.type === 'formula' && t('A formula was updated or created. Check the Formulation Lab for more details on ingredients and stability.', 'یک فرمول به‌روزرسانی یا ایجاد شد. برای جزئیات بیشتر در مورد ترکیبات و پایداری، آزمایشگاه فرمولاسیون را بررسی کنید.')}
                  {selectedActivity.type === 'research' && t('A new plant was analyzed using the AI identification tool. The phytochemical profile has been saved to the library.', 'یک گیاه جدید با استفاده از ابزار شناسایی هوش مصنوعی تحلیل شد. پروفایل فیتوشیمیایی در کتابخانه ذخیره شده است.')}
                  {selectedActivity.type === 'production' && t('A production batch has reached a new milestone. Check the Production Suite for QC status and release information.', 'یک دسته تولید به مرحله جدیدی رسیده است. برای وضعیت کنترل کیفیت و اطلاعات انتشار، مجموعه تولید را بررسی کنید.')}
                  {selectedActivity.type === 'system' && t('System maintenance and updates were successfully applied. All services are running normally.', 'تعمیر و نگهداری و به‌روزرسانی‌های سیستم با موفقیت اعمال شدند. همه خدمات به طور عادی در حال اجرا هستند.')}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedActivity(null)}
                className="btn-primary"
              >
                {t('Close', 'بستن')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
