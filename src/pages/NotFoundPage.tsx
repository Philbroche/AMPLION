import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function NotFoundPage() {
  const { language } = useLanguage();
  const t = translations[language].notFound;

  useEffect(() => {
    document.title = language === 'fr' ? 'Page introuvable — Amplion' : 'Page Not Found — Amplion';
  }, [language]);

  return (
    <div className="min-h-screen bg-[#080812] flex flex-col items-center justify-center text-center px-4">
      <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        {t.title}
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        {t.message}
      </p>
      <Link
        to="/"
        className="inline-block bg-orange hover:opacity-90 transition-opacity text-white font-semibold px-8 py-3 rounded-lg"
      >
        {t.backHome}
      </Link>
    </div>
  );
}
