import { useState } from 'react';
import { Upload, Search, Leaf, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useStore, Plant } from '../store/useStore';
import { cn } from '../lib/utils';
import { useTranslation } from '../store/languageStore';

export function ResearchLab() {
  const { plants, addPlant } = useStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'identify' | 'library'>('identify');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<Plant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const filteredPlants = plants.filter(plant => 
    plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.commonNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    plant.activeCompounds.some(compound => compound.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleUpload = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const newPlant: Plant = {
        id: `p${Date.now()}`,
        scientificName: 'Aloe barbadensis miller',
        commonNames: ['Aloe Vera', 'True Aloe', 'آلوئه‌ورا'],
        family: 'Asphodelaceae',
        confidenceScore: 99.2,
        activeCompounds: [
          { name: 'Aloin (آلوئین)', percentage: 15 },
          { name: 'Acemannan (آسمانان)', percentage: 25 },
          { name: 'Salicylic Acid (اسید سالیسیلیک)', percentage: 5 },
        ],
        safety: {
          toxicity: 'Low (Topical) - پایین (موضعی)',
          contraindications: ['Deep open wounds - زخم‌های باز عمیق'],
          drugInteractions: ['Hydrocortisone (increases absorption) - هیدروکورتیزون (افزایش جذب)'],
        },
        conservationStatus: 'Least Concern (کمترین نگرانی)',
      };
      setAnalysisResult(newPlant);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    if (analysisResult) {
      addPlant(analysisResult);
      setAnalysisResult(null);
      setActiveTab('library');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-deep-slate)] tracking-tight">{t('Research Lab', 'آزمایشگاه تحقیق')}</h2>
          <p className="text-gray-500 mt-1">{t('AI-powered plant identification and phytochemical analysis.', 'شناسایی گیاه و تحلیل فیتوشیمیایی با هوش مصنوعی.')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'identify' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('identify')}
        >
          {t('Identify Plant', 'شناسایی گیاه')}
        </button>
        <button
          className={cn('px-6 py-3 font-medium text-sm transition-colors border-b-2', activeTab === 'library' ? 'border-[var(--color-forest-green)] text-[var(--color-forest-green)]' : 'border-transparent text-gray-500 hover:text-gray-700')}
          onClick={() => setActiveTab('library')}
        >
          {t('Research Library', 'کتابخانه تحقیق')}
        </button>
      </div>

      {activeTab === 'identify' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-gray-300 bg-gray-50/50 hover:bg-gray-50 transition-colors">
            {!isAnalyzing && !analysisResult ? (
              <>
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-[var(--color-sky-teal)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-deep-slate)] mb-2">{t('Upload Plant Image', 'آپلود تصویر گیاه')}</h3>
                <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">{t('Drag and drop an image of the leaf, flower, or whole plant for AI analysis.', 'تصویر برگ، گل یا کل گیاه را برای تحلیل هوش مصنوعی بکشید و رها کنید.')}</p>
                <button onClick={handleUpload} className="btn-primary">{t('Select Image', 'انتخاب تصویر')}</button>
              </>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-[var(--color-light-gray)] border-t-[var(--color-forest-green)] rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-[var(--color-deep-slate)] animate-pulse">{t('Analyzing botanical features...', 'در حال تحلیل ویژگی‌های گیاه‌شناسی...')}</p>
                <p className="text-sm text-gray-500">{t('Cross-referencing with 10,000+ species', 'تطبیق با بیش از ۱۰۰۰۰ گونه')}</p>
              </div>
            ) : analysisResult && (
              <div className="w-full h-full flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <Leaf className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-deep-slate)]">{analysisResult.scientificName}</h3>
                <p className="text-gray-500">{analysisResult.commonNames.join(', ')}</p>
                <div className="badge badge-success text-sm py-1 px-3">
                  {analysisResult.confidenceScore}% {t('Match Confidence', 'اطمینان تطابق')}
                </div>
                <div className="pt-6 flex gap-4">
                  <button onClick={() => setAnalysisResult(null)} className="btn-secondary">{t('Analyze Another', 'تحلیل دیگری')}</button>
                  <button onClick={handleSave} className="btn-primary">{t('Save to Library', 'ذخیره در کتابخانه')}</button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className={cn("card p-6 transition-all duration-500", !analysisResult ? "opacity-50 grayscale pointer-events-none" : "")}>
            <h3 className="text-xl font-bold text-[var(--color-deep-slate)] mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-[var(--color-sky-teal)]" /> {t('Phytochemical Profile', 'پروفایل فیتوشیمیایی')}
            </h3>
            
            {analysisResult ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('Active Compounds', 'ترکیبات فعال')}</h4>
                  <div className="space-y-3">
                    {analysisResult.activeCompounds.map((compound, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-deep-slate)]">{compound.name}</span>
                        <div className="flex items-center gap-3 w-1/2">
                          <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--color-sky-teal)] rounded-full" style={{ width: `${compound.percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-500 w-8 text-end">{compound.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--color-warm-amber)]" /> {t('Safety Assessment', 'ارزیابی ایمنی')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <span className="text-xs text-amber-800 font-semibold block mb-1">{t('Toxicity', 'سمیت')}</span>
                      <span className="text-sm text-amber-900">{analysisResult.safety.toxicity}</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <span className="text-xs text-blue-800 font-semibold block mb-1">{t('Conservation', 'حفاظت')}</span>
                      <span className="text-sm text-blue-900">{analysisResult.conservationStatus}</span>
                    </div>
                    <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 font-semibold block mb-1">{t('Contraindications', 'موارد منع مصرف')}</span>
                      <span className="text-sm text-[var(--color-deep-slate)]">{analysisResult.safety.contraindications.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 py-12">
                <Info className="w-12 h-12 opacity-20" />
                <p>{t('Upload a plant image to view its analysis profile.', 'برای مشاهده پروفایل تحلیل آن، تصویر یک گیاه را آپلود کنید.')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={t('Search plants, active compounds...', 'جستجوی گیاهان، ترکیبات فعال...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none text-sm bg-white"
              />
              <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
            <div 
              key={plant.id} 
              className="card p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedPlant(plant)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="badge badge-success flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {plant.confidenceScore}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-deep-slate)] italic">{plant.scientificName}</h3>
              <p className="text-sm text-gray-500 mb-4">{plant.commonNames.join(', ')}</p>
              
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('Key Actives', 'مواد فعال کلیدی')}</p>
                <div className="flex flex-wrap gap-2">
                  {plant.activeCompounds.slice(0, 2).map((c, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {c.name} ({c.percentage}%)
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">{plant.family}</span>
                <button className="text-sm text-[var(--color-sky-teal)] font-medium hover:underline">{t('View Details', 'مشاهده جزئیات')}</button>
              </div>
            </div>
          ))}
          {filteredPlants.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              {t('No plants found matching your search.', 'هیچ گیاهی مطابق با جستجوی شما یافت نشد.')}
            </div>
          )}
        </div>
        </div>
      )}

      {/* Plant Details Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-deep-slate)] italic">{selectedPlant.scientificName}</h3>
                  <p className="text-gray-500">{selectedPlant.commonNames.join(', ')}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPlant(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">{t('Family', 'خانواده')}</span>
                  <span className="font-medium text-[var(--color-deep-slate)]">{selectedPlant.family}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">{t('Confidence Score', 'امتیاز اطمینان')}</span>
                  <span className="font-medium text-[var(--color-forest-green)] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {selectedPlant.confidenceScore}%
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[var(--color-sky-teal)]" /> {t('Active Compounds', 'ترکیبات فعال')}
                </h4>
                <div className="space-y-3 bg-white border border-gray-100 rounded-xl p-4">
                  {selectedPlant.activeCompounds.map((compound, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-medium text-[var(--color-deep-slate)]">{compound.name}</span>
                      <div className="flex items-center gap-3 w-1/2">
                        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-sky-teal)] rounded-full" style={{ width: `${compound.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8 text-end">{compound.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[var(--color-deep-slate)] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-warm-amber)]" /> {t('Safety Assessment', 'ارزیابی ایمنی')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block mb-2">{t('Toxicity', 'سمیت')}</span>
                    <span className="font-medium text-amber-900">{selectedPlant.safety.toxicity}</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <span className="text-xs text-blue-800 font-semibold uppercase tracking-wider block mb-2">{t('Conservation', 'حفاظت')}</span>
                    <span className="font-medium text-blue-900">{selectedPlant.conservationStatus}</span>
                  </div>
                  <div className="col-span-full bg-red-50 p-4 rounded-xl border border-red-100">
                    <span className="text-xs text-red-800 font-semibold uppercase tracking-wider block mb-2">{t('Contraindications', 'موارد منع مصرف')}</span>
                    <ul className="list-disc list-inside text-red-900 space-y-1">
                      {selectedPlant.safety.contraindications.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="col-span-full bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <span className="text-xs text-orange-800 font-semibold uppercase tracking-wider block mb-2">{t('Drug Interactions', 'تداخلات دارویی')}</span>
                    <ul className="list-disc list-inside text-orange-900 space-y-1">
                      {selectedPlant.safety.drugInteractions.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedPlant(null)}
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
