/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ResearchLab } from './pages/ResearchLab';
import { FormulationLab } from './pages/FormulationLab';
import { ProductionSuite } from './pages/ProductionSuite';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { History } from './pages/History';
import { SampleFormulas } from './pages/SampleFormulas';
import { Compliance } from './pages/Compliance';
import { Settings } from './pages/Settings';
import { Language } from './pages/Language';
import { useLanguageStore, useTranslation } from './store/languageStore';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-4xl font-bold text-[var(--color-deep-slate)] mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">{t('Page not found', 'صفحه یافت نشد')}</p>
    </div>
  );
}

export default function App() {
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="research" element={<ResearchLab />} />
          <Route path="formulation" element={<FormulationLab />} />
          <Route path="production" element={<ProductionSuite />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="history" element={<History />} />
          <Route path="sample-formulas" element={<SampleFormulas />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="language" element={<Language />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

