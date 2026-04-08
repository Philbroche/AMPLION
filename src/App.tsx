import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { useBooking } from './context/BookingContext';
import { LanguageProvider } from './context/LanguageContext';
import { PreBookingModal } from './components/PreBookingModal';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { isOpen, closeModal } = useBooking();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1A2F3D',
            color: '#fff',
            border: '1px solid #00E5FF',
          },
          success: {
            iconTheme: {
              primary: '#00E5FF',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6B35',
              secondary: '#fff',
            },
          },
        }}
      />
      <PreBookingModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BookingProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </BookingProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
