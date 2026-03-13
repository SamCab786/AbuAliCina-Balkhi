import { useState } from 'react';
import { BookOpen, Search, Filter, FileText, ExternalLink, ShieldCheck, Beaker, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../store/languageStore';

const ingredients = [
  { inci: 'Glycerin (گلیسیرین)', cas: '56-81-5', function: 'Humectant (مرطوب‌کننده)', maxUsage: '10%', safety: 'Safe as used (ایمن در استفاده)' },
  { inci: 'Cetearyl Alcohol (ستئاریل الکل)', cas: '67762-27-0', function: 'Emulsifier/Thickener (امولسیفایر/غلیظ‌کننده)', maxUsage: '5%', safety: 'Safe as used (ایمن در استفاده)' },
  { inci: 'Phenoxyethanol (فنوکسی‌اتانول)', cas: '122-99-6', function: 'Preservative (نگهدارنده)', maxUsage: '1.0% (EU)', safety: 'Restricted (محدود شده)' },
  { inci: 'Tocopherol (توکوفرول)', cas: '59-02-9', function: 'Antioxidant (آنتی‌اکسیدان)', maxUsage: '2%', safety: 'Safe as used (ایمن در استفاده)' },
  { inci: 'Centella Asiatica Extract (عصاره سنتلا آسیاتیکا)', cas: '84696-21-9', function: 'Skin Conditioning (حالت‌دهنده پوست)', maxUsage: '10%', safety: 'Safe as used (ایمن در استفاده)' },
];

const regulations = [
  { title: 'EU Cosmetics Regulation (مقررات آرایشی اتحادیه اروپا)', desc: 'Main regulatory framework for finished cosmetic products in the EU. (چارچوب اصلی نظارتی برای محصولات آرایشی نهایی در اتحادیه اروپا.)', status: 'Active (فعال)', color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'FDA MoCRA (قانون نوسازی مقررات آرایشی FDA)', desc: 'New US FDA regulations for cosmetic facility registration and product listing. (مقررات جدید FDA ایالات متحده برای ثبت تأسیسات آرایشی و لیست محصولات.)', status: 'Active (فعال)', color: 'text-red-600', bg: 'bg-red-100' },
  { title: 'Japanese Cosmetic Standards (استانداردهای آرایشی ژاپن)', desc: 'Standards for cosmetics under the PMD Act. (استانداردها برای محصولات آرایشی تحت قانون PMD.)', status: 'Active (فعال)', color: 'text-red-600', bg: 'bg-red-100' },
];

export function KnowledgeBase() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'regulations' | 'references'>('ingredients');
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = ingredients.filter(ing => 
    ing.inci.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ing.cas.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ing.function.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Knowledge Base', 'پایگاه دانش')}</h2>
          <p className="text-gray-500 mt-1">{t('Ingredients database, regulatory guides, and scientific references.', 'پایگاه داده ترکیبات، راهنماهای نظارتی و مراجع علمی.')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'ingredients' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('ingredients')}
        >
          {t('Ingredients (142+)', 'ترکیبات (۱۴۲+)')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'regulations' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('regulations')}
        >
          {t('Regulations', 'مقررات')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'references' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('references')}
        >
          {t('References', 'مراجع')}
        </button>
      </div>

      {activeTab === 'ingredients' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Search INCI or CAS...', 'جستجوی INCI یا CAS...')}
                className="w-full ps-10 pe-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none text-sm bg-white"
              />
              <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="btn-secondary flex items-center gap-2 text-sm py-1.5">
              <Filter className="w-4 h-4" /> {t('Filter', 'فیلتر')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('INCI Name', 'نام INCI')}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('CAS Number', 'شماره CAS')}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Function', 'عملکرد')}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Max Usage', 'حداکثر استفاده')}</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Safety Data', 'داده‌های ایمنی')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredIngredients.map((ing, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedIngredient(ing)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-[var(--color-deep-slate)] flex items-center gap-2">
                      <Beaker className="w-4 h-4 text-gray-400" /> {ing.inci}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{ing.cas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ing.function}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{ing.maxUsage}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${ing.safety.includes('Safe') ? 'badge-success' : 'badge-warning'}`}>
                        {ing.safety}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'regulations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regulations.map((reg, idx) => (
            <div key={idx} className="card p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${reg.bg}`}>
                  <ShieldCheck className={`w-6 h-6 ${reg.color}`} />
                </div>
                <span className="badge badge-success">{reg.status}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-deep-slate)] mb-2">{reg.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">{reg.desc}</p>
              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 btn-secondary text-sm py-1.5 flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> {t('View Guide', 'مشاهده راهنما')}
                </button>
                <button className="flex-1 btn-secondary text-sm py-1.5 flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> {t('Official Site', 'سایت رسمی')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'references' && (
        <div className="card p-8 flex flex-col items-center justify-center min-h-[400px] text-gray-400 bg-gray-50/50">
          <BookOpen className="w-16 h-16 opacity-20 mb-4" />
          <p className="text-lg font-medium text-gray-500">{t('Scientific Literature Database', 'پایگاه داده ادبیات علمی')}</p>
          <p className="text-sm text-center max-w-md mt-2">{t('Search through thousands of peer-reviewed papers, clinical trials, and botanical monographs.', 'جستجو در میان هزاران مقاله بررسی شده توسط همتایان، کارآزمایی‌های بالینی و مونوگراف‌های گیاه‌شناسی.')}</p>
          <div className="mt-6 relative w-full max-w-md">
            <input
              type="text"
              placeholder={t('Search journals, authors, or topics...', 'جستجوی مجلات، نویسندگان یا موضوعات...')}
              className="w-full ps-10 pe-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none bg-white shadow-sm"
            />
            <Search className="w-5 h-5 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}

      {/* Ingredient Details Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-deep-slate)]">{selectedIngredient.inci}</h3>
                  <p className="text-sm text-gray-500">{selectedIngredient.function}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedIngredient(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('CAS Number', 'شماره CAS')}</h4>
                <p className="font-mono text-lg text-[var(--color-deep-slate)] bg-gray-50 p-3 rounded-xl border border-gray-100">{selectedIngredient.cas}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('Max Usage Percentage', 'حداکثر درصد استفاده')}</h4>
                <p className="font-mono text-lg text-[var(--color-forest-green)] bg-emerald-50 p-3 rounded-xl border border-emerald-100">{selectedIngredient.maxUsage}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('Safety Data', 'داده‌های ایمنی')}</h4>
                <div className={cn(
                  "p-4 rounded-xl border",
                  selectedIngredient.safety.includes('Safe') ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-amber-50 border-amber-100 text-amber-800"
                )}>
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <ShieldCheck className="w-5 h-5" />
                    {selectedIngredient.safety}
                  </div>
                  <p className="text-sm opacity-80">
                    {selectedIngredient.safety === 'Safe as used' 
                      ? t('This ingredient is generally recognized as safe for use in cosmetics at the recommended concentrations.', 'این ترکیب به طور کلی برای استفاده در لوازم آرایشی در غلظت‌های توصیه‌شده ایمن شناخته می‌شود.')
                      : t('This ingredient has specific restrictions or requires additional safety assessments depending on the formulation.', 'این ترکیب دارای محدودیت‌های خاصی است یا بسته به فرمولاسیون نیاز به ارزیابی‌های ایمنی اضافی دارد.')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedIngredient(null)}
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
