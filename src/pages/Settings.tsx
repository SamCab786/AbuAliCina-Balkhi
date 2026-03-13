import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';
import { useTranslation } from '../store/languageStore';

export function Settings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'data'>('profile');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Settings', 'تنظیمات')}</h2>
          <p className="text-gray-500 mt-1">{t('Manage your account and lab preferences.', 'مدیریت حساب کاربری و ترجیحات آزمایشگاه.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm border border-[var(--color-forest-green)] text-[var(--color-forest-green)] font-medium' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <User className="w-5 h-5" /> {t('Profile', 'پروفایل')}
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start transition-all ${activeTab === 'notifications' ? 'bg-white shadow-sm border border-[var(--color-forest-green)] text-[var(--color-forest-green)] font-medium' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <Bell className="w-5 h-5" /> {t('Notifications', 'اعلان‌ها')}
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start transition-all ${activeTab === 'security' ? 'bg-white shadow-sm border border-[var(--color-forest-green)] text-[var(--color-forest-green)] font-medium' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <Shield className="w-5 h-5" /> {t('Security', 'امنیت')}
          </button>
          <button 
            onClick={() => setActiveTab('data')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start transition-all ${activeTab === 'data' ? 'bg-white shadow-sm border border-[var(--color-forest-green)] text-[var(--color-forest-green)] font-medium' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <Database className="w-5 h-5" /> {t('Data Management', 'مدیریت داده‌ها')}
          </button>
        </div>

        <div className="col-span-2 card p-8">
          {activeTab === 'profile' && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-[var(--color-sky-teal)]" /> {t('Profile Information', 'اطلاعات پروفایل')}
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('First Name', 'نام')}</label>
                    <input type="text" defaultValue="Jane" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Last Name', 'نام خانوادگی')}</label>
                    <input type="text" defaultValue="Doe" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Email Address', 'آدرس ایمیل')}</label>
                  <input type="email" defaultValue="jane.doe@phytoforge.com" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Role', 'نقش')}</label>
                  <input type="text" defaultValue={t('Lead Formulator', 'فرمولاتور ارشد')} disabled className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button type="button" className="btn-primary">{t('Save Changes', 'ذخیره تغییرات')}</button>
                </div>
              </form>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-[var(--color-sky-teal)]" /> {t('Notification Preferences', 'ترجیحات اعلان')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <h4 className="font-medium text-[var(--color-deep-slate)]">{t('Email Notifications', 'اعلان‌های ایمیل')}</h4>
                    <p className="text-sm text-gray-500">{t('Receive daily summaries and critical alerts.', 'دریافت خلاصه‌های روزانه و هشدارهای مهم.')}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-forest-green)]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <h4 className="font-medium text-[var(--color-deep-slate)]">{t('Push Notifications', 'اعلان‌های پوش')}</h4>
                    <p className="text-sm text-gray-500">{t('Real-time alerts for batch status changes.', 'هشدارهای در لحظه برای تغییرات وضعیت دسته.')}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-forest-green)]"></div>
                  </label>
                </div>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[var(--color-sky-teal)]" /> {t('Security Settings', 'تنظیمات امنیتی')}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-[var(--color-deep-slate)] mb-2">{t('Change Password', 'تغییر رمز عبور')}</h4>
                  <div className="space-y-4">
                    <input type="password" placeholder={t('Current Password', 'رمز عبور فعلی')} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all" />
                    <input type="password" placeholder={t('New Password', 'رمز عبور جدید')} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all" />
                    <button className="btn-secondary">{t('Update Password', 'به‌روزرسانی رمز عبور')}</button>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-[var(--color-deep-slate)] mb-2">{t('Two-Factor Authentication', 'احراز هویت دو مرحله‌ای')}</h4>
                  <p className="text-sm text-gray-500 mb-4">{t('Add an extra layer of security to your account.', 'یک لایه امنیتی اضافی به حساب خود اضافه کنید.')}</p>
                  <button className="btn-primary">{t('Enable 2FA', 'فعال‌سازی 2FA')}</button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'data' && (
            <>
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-[var(--color-sky-teal)]" /> {t('Data Management', 'مدیریت داده‌ها')}
              </h3>
              <div className="space-y-6">
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-900 mb-1">{t('Export Data', 'صادرات داده‌ها')}</h4>
                  <p className="text-sm text-blue-800 mb-4">{t('Download all your formulas, research data, and batch history as a CSV file.', 'تمام فرمول‌ها، داده‌های تحقیق و تاریخچه دسته خود را به عنوان یک فایل CSV دانلود کنید.')}</p>
                  <button className="bg-white text-blue-600 border border-blue-200 font-medium py-2 px-4 rounded-xl shadow-sm hover:bg-blue-50 transition-all duration-200">{t('Export CSV', 'صادرات CSV')}</button>
                </div>
                <div className="p-4 border border-red-100 bg-red-50 rounded-xl">
                  <h4 className="font-medium text-red-900 mb-1">{t('Delete Account', 'حذف حساب کاربری')}</h4>
                  <p className="text-sm text-red-800 mb-4">{t('Permanently delete your account and all associated data. This action cannot be undone.', 'حساب کاربری و تمام داده‌های مرتبط با آن را برای همیشه حذف کنید. این عمل قابل بازگشت نیست.')}</p>
                  <button className="bg-white text-red-600 border border-red-200 font-medium py-2 px-4 rounded-xl shadow-sm hover:bg-red-50 transition-all duration-200">{t('Delete Account', 'حذف حساب کاربری')}</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
