import { create } from 'zustand';

export type Plant = {
  id: string;
  scientificName: string;
  commonNames: string[];
  family: string;
  confidenceScore: number;
  activeCompounds: { name: string; percentage: number }[];
  safety: { toxicity: string; contraindications: string[]; drugInteractions: string[] };
  conservationStatus: string;
};

export type Formula = {
  id: string;
  name: string;
  productType: 'cream' | 'lotion' | 'serum' | 'gel';
  targetSkinType: string;
  status: 'draft' | 'validated' | 'production';
  ingredients: {
    phase: 'aqueous' | 'oil' | 'cool-down';
    inciName: string;
    percentage: number;
    function: string;
  }[];
  stabilityPrediction: string;
  shelfLifeEstimate: string;
};

export type Batch = {
  id: string;
  formulaId: string;
  batchCode: string;
  sizeKg: number;
  manufacturingDate: string;
  expiryDate: string;
  qcStatus: 'pending' | 'passed' | 'failed';
  releaseStatus: 'pending' | 'production' | 'approved' | 'rejected';
};

interface AppState {
  plants: Plant[];
  formulas: Formula[];
  batches: Batch[];
  addPlant: (plant: Plant) => void;
  addFormula: (formula: Formula) => void;
  updateFormulaStatus: (id: string, status: Formula['status']) => void;
  addBatch: (batch: Batch) => void;
  updateBatchStatus: (id: string, qc: Batch['qcStatus'], release: Batch['releaseStatus']) => void;
}

export const useStore = create<AppState>((set) => ({
  plants: [
    {
      id: 'p1',
      scientificName: 'Centella asiatica',
      commonNames: ['Gotu Kola', 'Tiger Grass', 'آب بشقابی'],
      family: 'Apiaceae',
      confidenceScore: 98.5,
      activeCompounds: [
        { name: 'Asiaticoside', percentage: 40 },
        { name: 'Madecassoside', percentage: 30 },
      ],
      safety: {
        toxicity: 'Low (پایین)',
        contraindications: ['Pregnancy (high doses) - بارداری (دوزهای بالا)'],
        drugInteractions: ['Sedatives - آرام‌بخش‌ها'],
      },
      conservationStatus: 'Least Concern (کمترین نگرانی)',
    },
  ],
  formulas: [
    {
      id: 'f1',
      name: 'کرم تسکین‌دهنده سیکا (Soothing Cica Cream)',
      productType: 'cream',
      targetSkinType: 'Sensitive',
      status: 'validated',
      ingredients: [
        { phase: 'aqueous', inciName: 'آب (Water)', percentage: 65, function: 'حلال (Solvent)' },
        { phase: 'aqueous', inciName: 'گلیسیرین (Glycerin)', percentage: 5, function: 'مرطوب‌کننده (Humectant)' },
        { phase: 'oil', inciName: 'تری‌گلیسرید کاپریلیک/کاپریک (Caprylic/Capric Triglyceride)', percentage: 15, function: 'نرم‌کننده (Emollient)' },
        { phase: 'oil', inciName: 'ستئاریل الکل (Cetearyl Alcohol)', percentage: 5, function: 'امولسیفایر (Emulsifier)' },
        { phase: 'cool-down', inciName: 'عصاره سنتلا آسیاتیکا (Centella Asiatica Extract)', percentage: 8, function: 'ماده فعال (Active)' },
        { phase: 'cool-down', inciName: 'فنوکسی‌اتانول (Phenoxyethanol)', percentage: 2, function: 'نگهدارنده (Preservative)' },
      ],
      stabilityPrediction: 'بالا (پایدار در دمای ۴۰ درجه سانتی‌گراد به مدت ۳ ماه)',
      shelfLifeEstimate: '۲۴ ماه',
    },
  ],
  batches: [
    {
      id: 'b1',
      formulaId: 'f1',
      batchCode: 'B-2023-001',
      sizeKg: 50,
      manufacturingDate: '2023-10-01',
      expiryDate: '2025-10-01',
      qcStatus: 'passed',
      releaseStatus: 'approved',
    },
  ],
  addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
  addFormula: (formula) => set((state) => ({ formulas: [...state.formulas, formula] })),
  updateFormulaStatus: (id, status) =>
    set((state) => ({
      formulas: state.formulas.map((f) => (f.id === id ? { ...f, status } : f)),
    })),
  addBatch: (batch) => set((state) => ({ batches: [...state.batches, batch] })),
  updateBatchStatus: (id, qcStatus, releaseStatus) =>
    set((state) => ({
      batches: state.batches.map((b) => (b.id === id ? { ...b, qcStatus, releaseStatus } : b)),
    })),
}));
