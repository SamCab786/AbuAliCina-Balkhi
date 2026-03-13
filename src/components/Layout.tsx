import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Microscope, FlaskConical, Factory, BookOpen, History, FileText, ShieldCheck, Settings, Leaf, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../store/languageStore';

export function Layout() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('Dashboard', 'داشبورد'), path: '/', icon: Home },
    { name: t('Research Lab', 'آزمایشگاه تحقیق'), path: '/research', icon: Microscope },
    { name: t('Formulation Lab', 'آزمایشگاه فرمولاسیون'), path: '/formulation', icon: FlaskConical },
    { name: t('Production Suite', 'مجموعه تولید'), path: '/production', icon: Factory },
    { name: t('Knowledge Base', 'پایگاه دانش'), path: '/knowledge', icon: BookOpen },
  ];

  const secondaryNav = [
    { name: t('History', 'تاریخچه'), path: '/history', icon: History },
    { name: t('Sample Formulas', 'فرمول‌های نمونه'), path: '/sample-formulas', icon: FileText },
    { name: t('Compliance', 'انطباق'), path: '/compliance', icon: ShieldCheck },
    { name: t('Settings', 'تنظیمات'), path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[var(--color-cream-white)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-dark flex flex-col h-full flex-shrink-0 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-gradient-to-br from-[var(--color-forest-green)] to-[var(--color-sky-teal)] p-2 rounded-xl shadow-md">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AbuAliCina-Balkhi</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">{t('Main Menu', 'منوی اصلی')}</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-[var(--color-forest-green)]' : 'text-gray-400')} />
                {item.name}
              </Link>
            );
          })}

          <div className="mt-8 mb-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('Secondary', 'ثانویه')}</div>
          {secondaryNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <item.icon className={cn('w-4 h-4', isActive ? 'text-[var(--color-forest-green)]' : '')} />
                {item.name}
              </Link>
            );
          })}
          <Link
            to="/language"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 mt-2',
              location.pathname === '/language'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
          >
            <Globe className={cn('w-4 h-4', location.pathname === '/language' ? 'text-[var(--color-forest-green)]' : '')} />
            {t('Language', 'زبان')}
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--color-forest-green)] to-[var(--color-sky-teal)] flex items-center justify-center text-white font-bold text-sm shadow-md">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Dr. Jane Doe</span>
              <span className="text-xs text-gray-400">{t('Lead Formulator', 'فرمولاتور ارشد')}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 glass flex items-center justify-between px-8 z-10 flex-shrink-0">
          <h1 className="text-lg font-semibold text-[var(--color-deep-slate)]">
            {navItems.find((item) => item.path === location.pathname)?.name || secondaryNav.find((item) => item.path === location.pathname)?.name || (location.pathname === '/language' ? t('Language', 'زبان') : 'PhytoForge')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('Search plants, formulas...', 'جستجوی گیاهان، فرمول‌ها...')}
                className="ps-10 pe-4 py-1.5 rounded-full border border-[var(--color-light-gray)] bg-white/50 focus:bg-white focus:ring-2 focus:ring-[var(--color-sky-teal)] focus:border-transparent outline-none text-sm w-80 transition-all"
              />
              <svg
                className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-[var(--color-warm-amber)] rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
