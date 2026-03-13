import React, { useState } from 'react';
import { Factory, Calculator, CheckCircle2, AlertCircle, Clock, FileText, ArrowRight, X } from 'lucide-react';
import { useStore, Batch } from '../store/useStore';
import { cn } from '../lib/utils';
import { useTranslation } from '../store/languageStore';

export function ProductionSuite() {
  const { batches, formulas, addBatch, updateBatchStatus } = useStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'calculator'>('list');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const [newBatch, setNewBatch] = useState({
    formulaId: formulas[0]?.id || '',
    sizeKg: 50,
    overage: 2,
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.formulaId) return;

    const batch: Batch = {
      id: `b${Date.now()}`,
      formulaId: newBatch.formulaId,
      batchCode: `B-${new Date().getFullYear()}-${String(batches.length + 1).padStart(3, '0')}`,
      sizeKg: newBatch.sizeKg,
      manufacturingDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2).toISOString().split('T')[0], // 2 years
      qcStatus: 'pending',
      releaseStatus: 'pending',
    };

    addBatch(batch);
    setActiveTab('list');
  };

  const selectedFormula = formulas.find(f => f.id === newBatch.formulaId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Production Suite', 'مجموعه تولید')}</h2>
          <p className="text-gray-500 mt-1">{t('Batch management, QC tracking, and material calculation.', 'مدیریت دسته، پیگیری کنترل کیفیت و محاسبه مواد.')}</p>
        </div>
        <button onClick={() => setActiveTab('create')} className="btn-primary flex items-center gap-2">
          <Factory className="w-4 h-4" /> {t('New Batch', 'دسته جدید')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'list' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('list')}
        >
          {t('Batch List', 'لیست دسته‌ها')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'create' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('create')}
        >
          {t('Create Batch', 'ایجاد دسته')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'calculator' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('calculator')}
        >
          {t('Batch Calculator', 'ماشین حساب دسته')}
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Batch Code', 'کد دسته')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Formula', 'فرمول')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Description', 'توضیحات')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Size (kg)', 'اندازه')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Mfg Date', 'تاریخ تولید')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('QC Status', 'وضعیت کنترل کیفیت')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Release', 'انتشار')}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-end">{t('Actions', 'عملیات')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {batches.map((batch) => {
                  const formula = formulas.find(f => f.id === batch.formulaId);
                  return (
                    <tr 
                      key={batch.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedBatchId(batch.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                            <Factory className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="font-semibold text-[var(--color-deep-slate)]">{batch.batchCode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[var(--color-deep-slate)]">{formula?.name || 'Unknown'}</span>
                          <span className="text-xs text-gray-500 capitalize">{formula ? t(formula.productType.charAt(0).toUpperCase() + formula.productType.slice(1), formula.productType === 'cream' ? 'کرم' : formula.productType === 'serum' ? 'سرم' : formula.productType === 'lotion' ? 'لوسیون' : formula.productType === 'gel' ? 'ژل' : formula.productType) : ''}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formula ? `${formula.name} - ${t(formula.productType.charAt(0).toUpperCase() + formula.productType.slice(1), formula.productType === 'cream' ? 'کرم' : formula.productType === 'serum' ? 'سرم' : formula.productType === 'lotion' ? 'لوسیون' : formula.productType === 'gel' ? 'ژل' : formula.productType)}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{batch.sizeKg} kg</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{batch.manufacturingDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${
                          batch.qcStatus === 'passed' ? 'badge-success' :
                          batch.qcStatus === 'failed' ? 'badge-warning' : 'badge-neutral'
                        }`}>
                          {batch.qcStatus === 'passed' && <CheckCircle2 className="w-3 h-3 inline me-1" />}
                          {batch.qcStatus === 'failed' && <AlertCircle className="w-3 h-3 inline me-1" />}
                          {batch.qcStatus === 'pending' && <Clock className="w-3 h-3 inline me-1" />}
                          {t(batch.qcStatus.charAt(0).toUpperCase() + batch.qcStatus.slice(1), batch.qcStatus === 'passed' ? 'تأیید شده' : batch.qcStatus === 'failed' ? 'رد شده' : 'در انتظار')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${
                          batch.releaseStatus === 'approved' ? 'badge-success' :
                          batch.releaseStatus === 'rejected' ? 'badge-warning' :
                          batch.releaseStatus === 'production' ? 'badge-info' : 'badge-neutral'
                        }`}>
                          {t(batch.releaseStatus.charAt(0).toUpperCase() + batch.releaseStatus.slice(1), batch.releaseStatus === 'approved' ? 'تأیید شده' : batch.releaseStatus === 'rejected' ? 'رد شده' : batch.releaseStatus === 'production' ? 'در حال تولید' : 'در انتظار')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedBatchId(batch.id); }}
                          className="text-[var(--color-sky-teal)] hover:text-[var(--color-forest-green)] hover:underline me-4"
                        >
                          {t('View Details', 'مشاهده جزئیات')}
                        </button>
                        {batch.qcStatus === 'pending' && (
                          <>
                            <button 
                              onClick={(e) => { e.stopPropagation(); updateBatchStatus(batch.id, 'passed', 'approved'); }}
                              className="text-emerald-600 hover:text-emerald-800 hover:underline me-4"
                            >
                              {t('Approve QC', 'تأیید کنترل کیفیت')}
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); updateBatchStatus(batch.id, 'failed', 'rejected'); }}
                              className="text-red-600 hover:text-red-800 hover:underline"
                            >
                              {t('Reject QC', 'رد کنترل کیفیت')}
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
              <Factory className="w-5 h-5 text-orange-500" /> {t('Start Production Batch', 'شروع دسته تولید')}
            </h3>
            <form onSubmit={handleCreateBatch} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Select Formula', 'انتخاب فرمول')}</label>
                <select
                  required
                  value={newBatch.formulaId}
                  onChange={(e) => setNewBatch({ ...newBatch, formulaId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="" disabled>{t('Select a validated formula', 'یک فرمول معتبر انتخاب کنید')}</option>
                  {formulas.filter(f => f.status !== 'draft').map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({t(f.productType.charAt(0).toUpperCase() + f.productType.slice(1), f.productType === 'cream' ? 'کرم' : f.productType === 'serum' ? 'سرم' : f.productType === 'lotion' ? 'لوسیون' : f.productType === 'gel' ? 'ژل' : f.productType)})</option>
                  ))}
                </select>
                {formulas.filter(f => f.status !== 'draft').length === 0 && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {t('No validated formulas available.', 'هیچ فرمول معتبری در دسترس نیست.')}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Batch Size (kg)', 'اندازه دسته (کیلوگرم)')}</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newBatch.sizeKg}
                    onChange={(e) => setNewBatch({ ...newBatch, sizeKg: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Overage (%)', 'اضافه بار (%)')}</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newBatch.overage}
                    onChange={(e) => setNewBatch({ ...newBatch, overage: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!newBatch.formulaId}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Factory className="w-5 h-5" /> {t('Generate Batch Record', 'تولید سابقه دسته')}
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="card p-6 bg-gray-50 border-dashed border-2 border-gray-200">
            <h3 className="text-lg font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" /> {t('Batch Preview', 'پیش‌نمایش دسته')}
            </h3>
            {selectedFormula ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-semibold text-[var(--color-deep-slate)]">{selectedFormula.name}</h4>
                    <p className="text-sm text-gray-500">{t('Target Size:', 'اندازه هدف:')} {newBatch.sizeKg} kg</p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-medium text-[var(--color-deep-slate)]">{t('Est. Yield', 'بازده تخمینی')}</p>
                    <p className="text-2xl font-bold text-[var(--color-forest-green)]">{newBatch.sizeKg * (1 - newBatch.overage / 100)} kg</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('Manufacturing Process', 'فرآیند تولید')}</h5>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ms-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {[
                      { step: 1, title: t('Phase A Preparation', 'آماده‌سازی فاز A'), desc: t('Heat aqueous phase to 75°C', 'فاز آبی را تا ۷۵ درجه سانتی‌گراد گرم کنید') },
                      { step: 2, title: t('Phase B Preparation', 'آماده‌سازی فاز B'), desc: t('Heat oil phase to 75°C until uniform', 'فاز روغنی را تا ۷۵ درجه سانتی‌گراد گرم کنید تا یکنواخت شود') },
                      { step: 3, title: t('Emulsification', 'امولسیون‌سازی'), desc: t('Add Phase B to Phase A under high shear (3000 rpm) for 10 mins', 'فاز B را به فاز A تحت برش بالا (۳۰۰۰ دور در دقیقه) به مدت ۱۰ دقیقه اضافه کنید') },
                      { step: 4, title: t('Cool Down', 'خنک‌سازی'), desc: t('Cool to 40°C. Add Phase C. Mix until uniform.', 'تا ۴۰ درجه سانتی‌گراد خنک کنید. فاز C را اضافه کنید. تا یکنواخت شدن مخلوط کنید.') },
                    ].map((step) => (
                      <div key={step.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <span className="text-sm font-bold text-[var(--color-sky-teal)]">{step.step}</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-[var(--color-deep-slate)] text-sm">{step.title}</h4>
                          </div>
                          <p className="text-sm text-gray-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 space-y-4">
                <AlertCircle className="w-12 h-12 opacity-20" />
                <p>{t('Select a formula to preview the batch record.', 'یک فرمول را برای پیش‌نمایش سابقه دسته انتخاب کنید.')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[var(--color-deep-slate)] flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[var(--color-sky-teal)]" /> {t('Material Requirements Calculator', 'ماشین حساب نیازمندی‌های مواد')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Select Formula', 'انتخاب فرمول')}</label>
                <select
                  value={newBatch.formulaId}
                  onChange={(e) => setNewBatch({ ...newBatch, formulaId: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all bg-white"
                >
                  {formulas.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Target Batch Size (kg)', 'اندازه دسته هدف (کیلوگرم)')}</label>
                <input
                  type="number"
                  min="1"
                  value={newBatch.sizeKg}
                  onChange={(e) => setNewBatch({ ...newBatch, sizeKg: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none transition-all text-2xl font-bold text-[var(--color-deep-slate)]"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">{t('Cost Estimation', 'تخمین هزینه')}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-900">{t('Est. Material Cost', 'هزینه تخمینی مواد')}</span>
                  <span className="text-lg font-bold text-blue-900">${(newBatch.sizeKg * 12.5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-blue-900">{t('Cost per kg', 'هزینه هر کیلوگرم')}</span>
                  <span className="text-sm font-medium text-blue-900">$12.50/kg</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedFormula && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Phase', 'فاز')}</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('Ingredient (INCI)', 'ترکیب')}</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-end">%</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-end">{t('Required (kg)', 'مورد نیاز (کیلوگرم)')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedFormula.ingredients.map((ing, idx) => {
                        const requiredKg = (newBatch.sizeKg * (ing.percentage / 100)).toFixed(3);
                        return (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3 whitespace-nowrap">
                              <span className={`badge ${
                                ing.phase === 'aqueous' ? 'bg-blue-100 text-blue-800' :
                                ing.phase === 'oil' ? 'bg-orange-100 text-orange-800' : 'bg-cyan-100 text-cyan-800'
                              } capitalize`}>
                                {t(ing.phase === 'aqueous' ? 'Aqueous' : ing.phase === 'oil' ? 'Oil' : 'Cool-down', ing.phase === 'aqueous' ? 'آبی' : ing.phase === 'oil' ? 'روغنی' : 'سرد')}
                              </span>
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap font-medium text-[var(--color-deep-slate)]">{ing.inciName}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-end text-sm text-gray-500">{ing.percentage}%</td>
                            <td className="px-6 py-3 whitespace-nowrap text-end font-mono font-bold text-[var(--color-forest-green)]">{requiredKg}</td>
                          </tr>
                        );
                      })}
                      <tr className="bg-gray-50 font-bold">
                        <td colSpan={2} className="px-6 py-4 text-end text-[var(--color-deep-slate)]">{t('Total', 'مجموع')}:</td>
                        <td className="px-6 py-4 text-end text-[var(--color-deep-slate)]">100%</td>
                        <td className="px-6 py-4 text-end text-[var(--color-forest-green)]">{newBatch.sizeKg.toFixed(3)} kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Batch Details Modal */}
      {selectedBatchId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {(() => {
              const batch = batches.find(b => b.id === selectedBatchId);
              const formula = formulas.find(f => f.id === batch?.formulaId);
              if (!batch) return null;

              return (
                <>
                  <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Factory className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[var(--color-deep-slate)]">{batch.batchCode}</h3>
                        <p className="text-sm text-gray-500">{t('Batch Details', 'جزئیات دسته')}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedBatchId(null)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 col-span-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Description', 'توضیحات')}</span>
                        <span className="text-sm font-medium text-[var(--color-deep-slate)]">
                          {formula ? `${formula.name} - ${t(formula.productType.charAt(0).toUpperCase() + formula.productType.slice(1), formula.productType === 'cream' ? 'کرم' : formula.productType === 'serum' ? 'سرم' : formula.productType === 'lotion' ? 'لوسیون' : formula.productType === 'gel' ? 'ژل' : formula.productType)}` : 'N/A'}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Formula', 'فرمول')}</span>
                        <span className="text-sm font-medium text-[var(--color-deep-slate)]">{formula?.name || 'Unknown'}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Batch Size', 'اندازه دسته')}</span>
                        <span className="text-sm font-medium text-[var(--color-deep-slate)]">{batch.sizeKg} kg</span>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Manufacturing Date', 'تاریخ تولید')}</span>
                        <span className="text-sm font-medium text-[var(--color-deep-slate)]">{batch.manufacturingDate}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{t('Expiry Date', 'تاریخ انقضا')}</span>
                        <span className="text-sm font-medium text-[var(--color-deep-slate)]">{batch.expiryDate}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-deep-slate)] mb-3">{t('Status Information', 'اطلاعات وضعیت')}</h4>
                      <div className="flex gap-4">
                        <div className="flex-1 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">{t('QC Status', 'وضعیت کنترل کیفیت')}</span>
                          <span className={`badge ${
                            batch.qcStatus === 'passed' ? 'badge-success' :
                            batch.qcStatus === 'failed' ? 'badge-warning' : 'badge-neutral'
                          }`}>
                            {batch.qcStatus === 'passed' && <CheckCircle2 className="w-3 h-3 inline me-1" />}
                            {batch.qcStatus === 'failed' && <AlertCircle className="w-3 h-3 inline me-1" />}
                            {batch.qcStatus === 'pending' && <Clock className="w-3 h-3 inline me-1" />}
                            {t(batch.qcStatus.charAt(0).toUpperCase() + batch.qcStatus.slice(1), batch.qcStatus === 'passed' ? 'تأیید شده' : batch.qcStatus === 'failed' ? 'رد شده' : 'در انتظار')}
                          </span>
                        </div>
                        <div className="flex-1 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">{t('Release Status', 'وضعیت انتشار')}</span>
                          <span className={`badge ${
                            batch.releaseStatus === 'approved' ? 'badge-success' :
                            batch.releaseStatus === 'rejected' ? 'badge-warning' :
                            batch.releaseStatus === 'production' ? 'badge-info' : 'badge-neutral'
                          }`}>
                            {t(batch.releaseStatus.charAt(0).toUpperCase() + batch.releaseStatus.slice(1), batch.releaseStatus === 'approved' ? 'تأیید شده' : batch.releaseStatus === 'rejected' ? 'رد شده' : batch.releaseStatus === 'production' ? 'در حال تولید' : 'در انتظار')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {formula && (
                      <div>
                        <h4 className="text-sm font-bold text-[var(--color-deep-slate)] mb-3">{t('Formula Ingredients', 'ترکیبات فرمول')}</h4>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <table className="w-full text-start border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('INCI Name', 'نام INCI')}</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-end">%</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-end">{t('Qty (kg)', 'مقدار (کیلوگرم)')}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {formula.ingredients.map((ing, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-2 text-sm text-[var(--color-deep-slate)]">{ing.inciName}</td>
                                  <td className="px-4 py-2 text-sm text-gray-500 text-end">{ing.percentage}%</td>
                                  <td className="px-4 py-2 text-sm font-mono text-[var(--color-forest-green)] text-end">
                                    {(batch.sizeKg * (ing.percentage / 100)).toFixed(3)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button 
                      onClick={() => setSelectedBatchId(null)}
                      className="btn-secondary"
                    >
                      {t('Close', 'بستن')}
                    </button>
                    {batch.qcStatus === 'pending' && (
                      <>
                        <button 
                          onClick={() => {
                            updateBatchStatus(batch.id, 'failed', 'rejected');
                            setSelectedBatchId(null);
                          }}
                          className="bg-white text-red-600 border border-red-200 font-medium py-2 px-4 rounded-xl shadow-sm hover:bg-red-50 transition-all duration-200"
                        >
                          {t('Reject QC', 'رد کنترل کیفیت')}
                        </button>
                        <button 
                          onClick={() => {
                            updateBatchStatus(batch.id, 'passed', 'approved');
                            setSelectedBatchId(null);
                          }}
                          className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm hover:bg-emerald-700 transition-all duration-200"
                        >
                          {t('Approve QC', 'تأیید کنترل کیفیت')}
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
