import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, FlaskConical, Factory, CheckCircle2, AlertTriangle, Activity, ArrowRight, X, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../store/languageStore';

export function Dashboard() {
  const { plants, formulas, batches } = useStore();
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedFormula, setSelectedFormula] = useState<any>(null);

  const stats = [
    { name: t('Plants Analyzed', 'گیاهان تحلیل شده'), value: plants.length, icon: Microscope, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: t('Formulas Created', 'فرمول‌های ایجاد شده'), value: formulas.length, icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: t('Batches Produced', 'دسته‌های تولید شده'), value: batches.length, icon: Factory, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: t('Success Rate', 'نرخ موفقیت'), value: '98%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Welcome back, Dr. Doe', 'خوش آمدید، دکتر دو')}</h2>
          <p className="text-gray-500 mt-1">{t("Here's what's happening in the lab today.", 'این چیزی است که امروز در آزمایشگاه اتفاق می‌افتد.')}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/research" className="btn-secondary flex items-center gap-2">
            <Microscope className="w-4 h-4" /> {t('Identify Plant', 'شناسایی گیاه')}
          </Link>
          <Link to="/formulation" className="btn-primary flex items-center gap-2">
            <FlaskConical className="w-4 h-4" /> {t('New Formula', 'فرمول جدید')}
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className={`p-4 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-3xl font-bold text-[var(--color-deep-slate)]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[var(--color-deep-slate)] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--color-sky-teal)]" /> {t('Recent Activity', 'فعالیت اخیر')}
              </h3>
              <button className="text-sm text-[var(--color-sky-teal)] font-medium hover:underline">{t('View All', 'مشاهده همه')}</button>
            </div>
            <div className="space-y-6">
              {[
                { title: t('Plant Identified', 'گیاه شناسایی شد'), desc: t('Centella asiatica analyzed with 98.5% confidence.', 'سنتلا آسیاتیکا با اطمینان ۹۸.۵٪ تحلیل شد.'), time: t('2 hours ago', '۲ ساعت پیش'), icon: Microscope, color: 'text-blue-500', bg: 'bg-blue-100', type: 'research' },
                { title: t('Formula Validated', 'فرمول تأیید شد'), desc: t('Soothing Cica Cream passed stability prediction.', 'کرم تسکین‌دهنده سیکا پیش‌بینی پایداری را گذراند.'), time: t('5 hours ago', '۵ ساعت پیش'), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100', type: 'formula' },
                { title: t('Batch Approved', 'دسته تأیید شد'), desc: t('Batch B-2023-001 released for production.', 'دسته B-2023-001 برای تولید منتشر شد.'), time: t('1 day ago', '۱ روز پیش'), icon: Factory, color: 'text-orange-500', bg: 'bg-orange-100', type: 'production' },
              ].map((activity, i) => (
                <div 
                  key={i} 
                  className="flex gap-4 relative cursor-pointer group"
                  onClick={() => setSelectedActivity(activity)}
                >
                  {i !== 2 && <div className="absolute start-5 top-10 bottom-[-24px] w-px bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>}
                  <div className={`w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-110 transition-transform`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-transparent group-hover:border-gray-100 group-hover:shadow-sm transition-all flex-1">
                    <h4 className="text-sm font-semibold text-[var(--color-deep-slate)]">{activity.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{activity.desc}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Formulas */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[var(--color-deep-slate)] flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[var(--color-forest-green)]" /> {t('Active Formulas', 'فرمول‌های فعال')}
              </h3>
              <Link to="/formulation" className="text-sm text-[var(--color-sky-teal)] font-medium hover:underline flex items-center gap-1">
                {t('Go to Lab', 'رفتن به آزمایشگاه')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {formulas.map((formula) => (
                <div 
                  key={formula.id} 
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedFormula(formula)}
                >
                  <div>
                    <h4 className="font-semibold text-[var(--color-deep-slate)]">{formula.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">
                      {t(formula.productType.charAt(0).toUpperCase() + formula.productType.slice(1), formula.productType === 'cream' ? 'کرم' : formula.productType === 'serum' ? 'سرم' : formula.productType === 'lotion' ? 'لوسیون' : formula.productType === 'gel' ? 'ژل' : formula.productType)} • {t(formula.targetSkinType, formula.targetSkinType === 'Sensitive' ? 'حساس' : formula.targetSkinType === 'Dry' ? 'خشک' : formula.targetSkinType === 'Oily' ? 'چرب' : formula.targetSkinType === 'Combination' ? 'مختلط' : formula.targetSkinType === 'Normal' ? 'معمولی' : formula.targetSkinType)} {t('Skin', 'پوست')}
                    </p>
                  </div>
                  <span className={`badge ${
                    formula.status === 'production' ? 'badge-success' :
                    formula.status === 'validated' ? 'badge-info' : 'badge-neutral'
                  }`}>
                    {t(formula.status.charAt(0).toUpperCase() + formula.status.slice(1), formula.status === 'production' ? 'تولید' : formula.status === 'validated' ? 'تأیید شده' : 'پیش‌نویس')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Updates */}
        <div className="space-y-6">
          <div className="card p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[var(--color-warm-amber)]" /> {t('Compliance Alerts', 'هشدارهای انطباق')}
            </h3>
            <div className="space-y-4">
              <div className="bg-white/60 p-4 rounded-xl border border-amber-200/50">
                <h4 className="text-sm font-semibold text-amber-900">{t('EU Regulation Update', 'به‌روزرسانی مقررات اتحادیه اروپا')}</h4>
                <p className="text-xs text-amber-800/80 mt-1">{t('New restrictions on specific preservatives effective next month. Review formulas.', 'محدودیت‌های جدید برای مواد نگهدارنده خاص از ماه آینده اجرایی می‌شود. فرمول‌ها را بررسی کنید.')}</p>
                <Link to="/compliance" className="text-xs font-semibold text-[var(--color-warm-amber)] mt-2 hover:underline inline-block">{t('Review Affected', 'بررسی موارد تحت تأثیر')}</Link>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-[var(--color-forest-green)] to-[var(--color-sky-teal)] text-white">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <Microscope className="w-5 h-5 text-white/80" /> {t('AI Model Update', 'به‌روزرسانی مدل هوش مصنوعی')}
            </h3>
            <p className="text-sm text-white/80 mb-4">
              {t('The formulation AI has been updated with 5,000 new peer-reviewed synergy interactions.', 'هوش مصنوعی فرمولاسیون با ۵۰۰۰ تعامل هم‌افزایی جدید بررسی شده توسط همتایان به‌روزرسانی شده است.')}
            </p>
            <button 
              onClick={() => alert(t('Release notes: Added 5000 new synergy interactions. Improved stability prediction accuracy by 12%.', 'یادداشت‌های انتشار: ۵۰۰۰ تعامل هم‌افزایی جدید اضافه شد. دقت پیش‌بینی پایداری ۱۲٪ بهبود یافت.'))}
              className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium w-full"
            >
              {t('View Release Notes', 'مشاهده یادداشت‌های انتشار')}
            </button>
          </div>
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
                  {selectedActivity.desc}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {selectedActivity.type === 'formula' && t('A formula was updated or created. Check the Formulation Lab for more details on ingredients and stability.', 'یک فرمول به‌روزرسانی یا ایجاد شد. برای جزئیات بیشتر در مورد ترکیبات و پایداری، آزمایشگاه فرمولاسیون را بررسی کنید.')}
                    {selectedActivity.type === 'research' && t('A new plant was analyzed using the AI identification tool. The phytochemical profile has been saved to the library.', 'یک گیاه جدید با استفاده از ابزار شناسایی هوش مصنوعی تحلیل شد. پروفایل فیتوشیمیایی در کتابخانه ذخیره شده است.')}
                    {selectedActivity.type === 'production' && t('A production batch has reached a new milestone. Check the Production Suite for QC status and release information.', 'یک دسته تولید به مرحله جدیدی رسیده است. برای وضعیت کنترل کیفیت و اطلاعات انتشار، مجموعه تولید را بررسی کنید.')}
                  </div>
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

      {/* Formula Details Modal */}
      {selectedFormula && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-deep-slate)]">{selectedFormula.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {t(selectedFormula.productType.charAt(0).toUpperCase() + selectedFormula.productType.slice(1), selectedFormula.productType === 'cream' ? 'کرم' : selectedFormula.productType === 'serum' ? 'سرم' : selectedFormula.productType === 'lotion' ? 'لوسیون' : selectedFormula.productType === 'gel' ? 'ژل' : selectedFormula.productType)} • {t(selectedFormula.targetSkinType, selectedFormula.targetSkinType === 'Sensitive' ? 'حساس' : selectedFormula.targetSkinType === 'Dry' ? 'خشک' : selectedFormula.targetSkinType === 'Oily' ? 'چرب' : selectedFormula.targetSkinType === 'Combination' ? 'مختلط' : selectedFormula.targetSkinType === 'Normal' ? 'معمولی' : selectedFormula.targetSkinType)} {t('Skin', 'پوست')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFormula(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Stability Prediction', 'پیش‌بینی پایداری')}</span>
                  <span className="text-sm font-medium text-[var(--color-deep-slate)]">{selectedFormula.stabilityPrediction}%</span>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Shelf Life Estimate', 'تخمین ماندگاری')}</span>
                  <span className="text-sm font-medium text-[var(--color-deep-slate)]">{selectedFormula.shelfLifeEstimate} {t('months', 'ماه')}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--color-deep-slate)] mb-3">{t('Ingredients Breakdown', 'تجزیه ترکیبات')}</h4>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Phase', 'فاز')}</th>
                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('INCI Name', 'نام INCI')}</th>
                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-end">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedFormula.ingredients.map((ing: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm text-[var(--color-deep-slate)] capitalize">{t(ing.phase === 'aqueous' ? 'Aqueous' : ing.phase === 'oil' ? 'Oil' : 'Cool-down', ing.phase === 'aqueous' ? 'آبی' : ing.phase === 'oil' ? 'روغنی' : 'سرد')}</td>
                          <td className="px-4 py-2 text-sm text-[var(--color-deep-slate)]">{ing.inciName}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 text-end">{ing.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedFormula(null)}
                className="btn-secondary"
              >
                {t('Close', 'بستن')}
              </button>
              <Link to="/formulation" className="btn-primary">
                {t('Go to Lab', 'رفتن به آزمایشگاه')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
