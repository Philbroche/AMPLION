import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — Amplion';
  }, []);

  return (
    <div className="min-h-screen bg-[#080812] flex flex-col items-center justify-center text-center px-4">
      <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-orange hover:opacity-90 transition-opacity text-white font-semibold px-8 py-3 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
