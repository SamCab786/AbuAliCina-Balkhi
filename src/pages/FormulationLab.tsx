import React, { useState } from 'react';
import { FlaskConical, Plus, Sparkles, Droplets, ThermometerSnowflake, Flame, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useStore, Formula } from '../store/useStore';
import { cn } from '../lib/utils';
import { useTranslation } from '../store/languageStore';

export function FormulationLab() {
  const { formulas, addFormula, updateFormulaStatus } = useStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'create' | 'library'>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newFormula, setNewFormula] = useState<Formula | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    productType: 'cream',
    targetSkinType: 'Sensitive',
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generated: Formula = {
        id: `f${Date.now()}`,
        name: formData.name || t('AI Generated Formula', 'فرمول تولید شده توسط هوش مصنوعی'),
        productType: formData.productType as any,
        targetSkinType: formData.targetSkinType,
        status: 'draft',
        ingredients: [
          { phase: 'aqueous', inciName: 'آب (Aqua)', percentage: 70, function: t('Solvent', 'حلال') },
          { phase: 'aqueous', inciName: 'گلیسیرین (Glycerin)', percentage: 4, function: t('Humectant', 'مرطوب‌کننده') },
          { phase: 'oil', inciName: 'روغن دانه جوجوبا (Simmondsia Chinensis Seed Oil)', percentage: 10, function: t('Emollient', 'نرم‌کننده') },
          { phase: 'oil', inciName: 'ستئاریل الیوات (Cetearyl Olivate)', percentage: 4, function: t('Emulsifier', 'امولسیفایر') },
          { phase: 'cool-down', inciName: 'آب برگ آلوئه‌ورا (Aloe Barbadensis Leaf Juice)', percentage: 10, function: t('Active', 'ماده فعال') },
          { phase: 'cool-down', inciName: 'توکوفرول (Tocopherol)', percentage: 1, function: t('Antioxidant', 'آنتی‌اکسیدان') },
          { phase: 'cool-down', inciName: 'بنزیل الکل (Benzyl Alcohol)', percentage: 1, function: t('Preservative', 'نگهدارنده') },
        ],
        stabilityPrediction: t('High (Stable at 45°C for 3 months)', 'بالا (پایدار در دمای ۴۵ درجه سانتی‌گراد به مدت ۳ ماه)'),
        shelfLifeEstimate: t('18 months', '۱۸ ماه'),
      };
      setNewFormula(generated);
      setIsGenerating(false);
    }, 2500);
  };

  const handleSave = () => {
    if (newFormula) {
      addFormula(newFormula);
      setNewFormula(null);
      setActiveTab('library');
      setFormData({ name: '', productType: 'cream', targetSkinType: 'Sensitive' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Formulation Lab', 'آزمایشگاه فرمولاسیون')}</h2>
          <p className="text-gray-500 mt-1">{t('AI-powered cosmetic formulation design and stability prediction.', 'طراحی فرمولاسیون آرایشی و پیش‌بینی پایداری با هوش مصنوعی.')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'create' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('create')}
        >
          {t('Create Formula', 'ایجاد فرمول')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'library' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('library')}
        >
          {t('Formula Library', 'کتابخانه فرمول')}
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requirements Form */}
          <div className="card p-6 lg:col-span-1 border-t-4 border-t-[var(--color-sky-teal)]">
            <h3 className="text-lg font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-sky-teal)]" /> {t('Define Requirements', 'تعریف نیازمندی‌ها')}
            </h3>
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Formula Name', 'نام فرمول')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all"
                  placeholder={t('e.g. Hydrating Aloe Serum', 'مثلاً سرم آبرسان آلوئه‌ورا')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Product Type', 'نوع محصول')}</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="cream">{t('Cream', 'کرم')}</option>
                  <option value="lotion">{t('Lotion', 'لوسیون')}</option>
                  <option value="serum">{t('Serum', 'سرم')}</option>
                  <option value="gel">{t('Gel', 'ژل')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Target Skin Type', 'نوع پوست هدف')}</label>
                <select
                  value={formData.targetSkinType}
                  onChange={(e) => setFormData({ ...formData, targetSkinType: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Normal">{t('Normal', 'معمولی')}</option>
                  <option value="Dry">{t('Dry', 'خشک')}</option>
                  <option value="Oily">{t('Oily', 'چرب')}</option>
                  <option value="Combination">{t('Combination', 'مختلط')}</option>
                  <option value="Sensitive">{t('Sensitive', 'حساس')}</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t('Generating...', 'در حال تولید...')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> {t('Generate Formula', 'تولید فرمول')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* AI Output */}
          <div className="lg:col-span-2">
            {newFormula ? (
              <div className="card p-8 bg-gradient-to-br from-white to-gray-50 border border-emerald-100 shadow-lg animate-in slide-in-from-end-8 duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-[var(--color-deep-slate)]">{newFormula.name}</h3>
                      <span className="badge badge-neutral capitalize">{t(newFormula.productType.charAt(0).toUpperCase() + newFormula.productType.slice(1), newFormula.productType === 'cream' ? 'کرم' : newFormula.productType === 'serum' ? 'سرم' : newFormula.productType === 'lotion' ? 'لوسیون' : newFormula.productType === 'gel' ? 'ژل' : newFormula.productType)}</span>
                      <span className="badge badge-info">{t(newFormula.targetSkinType, newFormula.targetSkinType === 'Sensitive' ? 'حساس' : newFormula.targetSkinType === 'Dry' ? 'خشک' : newFormula.targetSkinType === 'Oily' ? 'چرب' : newFormula.targetSkinType === 'Combination' ? 'مختلط' : newFormula.targetSkinType === 'Normal' ? 'معمولی' : newFormula.targetSkinType)} {t('Skin', 'پوست')}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('AI Synergy Analysis Complete', 'تحلیل هم‌افزایی هوش مصنوعی کامل شد')}
                    </p>
                  </div>
                  <button onClick={handleSave} className="btn-primary">{t('Save Draft', 'ذخیره پیش‌نویس')}</button>
                </div>

                <div className="space-y-8">
                  {/* Phases */}
                  {['aqueous', 'oil', 'cool-down'].map((phase) => {
                    const phaseIngredients = newFormula.ingredients.filter(i => i.phase === phase);
                    if (phaseIngredients.length === 0) return null;
                    
                    const totalPhase = phaseIngredients.reduce((sum, i) => sum + i.percentage, 0);
                    
                    return (
                      <div key={phase} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <h4 className="font-semibold text-[var(--color-deep-slate)] capitalize flex items-center gap-2">
                            {phase === 'aqueous' && <Droplets className="w-4 h-4 text-blue-500" />}
                            {phase === 'oil' && <Flame className="w-4 h-4 text-orange-500" />}
                            {phase === 'cool-down' && <ThermometerSnowflake className="w-4 h-4 text-cyan-500" />}
                            {t(`Phase ${phase === 'aqueous' ? 'A (Aqueous)' : phase === 'oil' ? 'B (Oil)' : 'C (Cool-down)'}`, `فاز ${phase === 'aqueous' ? 'آبی' : phase === 'oil' ? 'روغنی' : 'سرد'}`)}
                          </h4>
                          <span className="text-sm font-medium text-gray-500">{totalPhase}%</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {phaseIngredients.map((ing, idx) => (
                            <div key={idx} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                              <div className="flex flex-col">
                                <span className="font-medium text-[var(--color-deep-slate)]">{ing.inciName}</span>
                                <span className="text-xs text-gray-500">{ing.function}</span>
                              </div>
                              <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{ing.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Predictions */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <h5 className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">{t('Stability Prediction', 'پیش‌بینی پایداری')}</h5>
                    <p className="text-sm text-emerald-900 font-medium">{newFormula.stabilityPrediction}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h5 className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">{t('Shelf Life Estimate', 'تخمین ماندگاری')}</h5>
                    <p className="text-sm text-blue-900 font-medium">{newFormula.shelfLifeEstimate}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 border-dashed border-2 bg-gray-50/50">
                <FlaskConical className="w-16 h-16 opacity-20 mb-4" />
                <p className="text-lg font-medium text-gray-500">{t('Awaiting Requirements', 'در انتظار نیازمندی‌ها')}</p>
                <p className="text-sm text-center max-w-sm mt-2">{t('Define your product requirements on the left to let the AI generate a complete, stable formulation.', 'نیازمندی‌های محصول خود را در سمت چپ تعریف کنید تا هوش مصنوعی یک فرمولاسیون کامل و پایدار تولید کند.')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formulas.map((formula) => (
            <div key={formula.id} className="card p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-purple-600" />
                </div>
                <span className={`badge ${
                  formula.status === 'production' ? 'badge-success' :
                  formula.status === 'validated' ? 'badge-info' : 'badge-neutral'
                }`}>
                  {t(formula.status.charAt(0).toUpperCase() + formula.status.slice(1), formula.status === 'production' ? 'تولید' : formula.status === 'validated' ? 'تأیید شده' : 'پیش‌نویس')}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-1">{formula.name}</h3>
              <p className="text-sm text-gray-500 capitalize mb-4">
                {t(formula.productType.charAt(0).toUpperCase() + formula.productType.slice(1), formula.productType === 'cream' ? 'کرم' : formula.productType === 'serum' ? 'سرم' : formula.productType === 'lotion' ? 'لوسیون' : formula.productType === 'gel' ? 'ژل' : formula.productType)} • {t(formula.targetSkinType, formula.targetSkinType === 'Sensitive' ? 'حساس' : formula.targetSkinType === 'Dry' ? 'خشک' : formula.targetSkinType === 'Oily' ? 'چرب' : formula.targetSkinType === 'Combination' ? 'مختلط' : formula.targetSkinType === 'Normal' ? 'معمولی' : formula.targetSkinType)} {t('Skin', 'پوست')}
              </p>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('Total Ingredients', 'کل ترکیبات')}</span>
                  <span className="font-medium text-[var(--color-deep-slate)]">{formula.ingredients.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('Shelf Life', 'ماندگاری')}</span>
                  <span className="font-medium text-[var(--color-deep-slate)]">{formula.shelfLifeEstimate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('Key Active', 'ماده فعال کلیدی')}</span>
                  <span className="font-medium text-[var(--color-deep-slate)] truncate max-w-[120px] text-end">
                    {formula.ingredients.find(i => i.function === 'Active')?.inciName || 'None'}
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button 
                  onClick={() => setSelectedFormula(formula)}
                  className="flex-1 btn-secondary text-sm py-1.5"
                >
                  {t('View Details', 'مشاهده جزئیات')}
                </button>
                {formula.status === 'draft' && (
                  <button 
                    onClick={() => updateFormulaStatus(formula.id, 'validated')}
                    className="flex-1 btn-primary text-sm py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                  >
                    {t('Validate', 'اعتبارسنجی')}
                  </button>
                )}
                {formula.status === 'validated' && (
                  <button 
                    onClick={() => updateFormulaStatus(formula.id, 'production')}
                    className="flex-1 btn-primary text-sm py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    {t('To Production', 'به تولید')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formula Details Modal */}
      {selectedFormula && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-[var(--color-deep-slate)]">{selectedFormula.name}</h3>
                    <span className={`badge ${
                      selectedFormula.status === 'production' ? 'badge-success' :
                      selectedFormula.status === 'validated' ? 'badge-info' : 'badge-neutral'
                    }`}>
                      {t(selectedFormula.status.charAt(0).toUpperCase() + selectedFormula.status.slice(1), selectedFormula.status === 'production' ? 'تولید' : selectedFormula.status === 'validated' ? 'تأیید شده' : 'پیش‌نویس')}
                    </span>
                  </div>
                  <p className="text-gray-500 capitalize">
                    {t(selectedFormula.productType.charAt(0).toUpperCase() + selectedFormula.productType.slice(1), selectedFormula.productType === 'cream' ? 'کرم' : selectedFormula.productType === 'serum' ? 'سرم' : selectedFormula.productType === 'lotion' ? 'لوسیون' : selectedFormula.productType === 'gel' ? 'ژل' : selectedFormula.productType)} • {t(selectedFormula.targetSkinType, selectedFormula.targetSkinType === 'Sensitive' ? 'حساس' : selectedFormula.targetSkinType === 'Dry' ? 'خشک' : selectedFormula.targetSkinType === 'Oily' ? 'چرب' : selectedFormula.targetSkinType === 'Combination' ? 'مختلط' : selectedFormula.targetSkinType === 'Normal' ? 'معمولی' : selectedFormula.targetSkinType)} {t('Skin', 'پوست')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFormula(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block mb-1">{t('Stability Prediction', 'پیش‌بینی پایداری')}</span>
                  <span className="font-medium text-emerald-900">{selectedFormula.stabilityPrediction}</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <span className="text-xs text-blue-800 font-semibold uppercase tracking-wider block mb-1">{t('Shelf Life Estimate', 'تخمین ماندگاری')}</span>
                  <span className="font-medium text-blue-900">{selectedFormula.shelfLifeEstimate}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-4">{t('Ingredients Breakdown', 'تجزیه ترکیبات')}</h4>
                <div className="space-y-6">
                  {['aqueous', 'oil', 'cool-down'].map((phase) => {
                    const phaseIngredients = selectedFormula.ingredients.filter(i => i.phase === phase);
                    if (phaseIngredients.length === 0) return null;
                    
                    const totalPhase = phaseIngredients.reduce((sum, i) => sum + i.percentage, 0);
                    
                    return (
                      <div key={phase} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <h4 className="font-semibold text-[var(--color-deep-slate)] capitalize flex items-center gap-2">
                            {phase === 'aqueous' && <Droplets className="w-4 h-4 text-blue-500" />}
                            {phase === 'oil' && <Flame className="w-4 h-4 text-orange-500" />}
                            {phase === 'cool-down' && <ThermometerSnowflake className="w-4 h-4 text-cyan-500" />}
                            {t(`Phase ${phase === 'aqueous' ? 'A (Aqueous)' : phase === 'oil' ? 'B (Oil)' : 'C (Cool-down)'}`, `فاز ${phase === 'aqueous' ? 'آبی' : phase === 'oil' ? 'روغنی' : 'سرد'}`)}
                          </h4>
                          <span className="text-sm font-medium text-gray-500">{totalPhase}%</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {phaseIngredients.map((ing, idx) => (
                            <div key={idx} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                              <div className="flex flex-col">
                                <span className="font-medium text-[var(--color-deep-slate)]">{ing.inciName}</span>
                                <span className="text-xs text-gray-500">{ing.function}</span>
                              </div>
                              <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{ing.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
              {selectedFormula.status === 'draft' && (
                <button 
                  onClick={() => {
                    updateFormulaStatus(selectedFormula.id, 'validated');
                    setSelectedFormula({...selectedFormula, status: 'validated'});
                  }}
                  className="btn-primary bg-gradient-to-r from-blue-500 to-indigo-500"
                >
                  {t('Validate Formula', 'اعتبارسنجی فرمول')}
                </button>
              )}
              {selectedFormula.status === 'validated' && (
                <button 
                  onClick={() => {
                    updateFormulaStatus(selectedFormula.id, 'production');
                    setSelectedFormula({...selectedFormula, status: 'production'});
                  }}
                  className="btn-primary bg-gradient-to-r from-emerald-500 to-teal-500"
                >
                  {t('Send to Production', 'ارسال به تولید')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
