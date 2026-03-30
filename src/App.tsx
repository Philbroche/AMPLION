import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <AnnouncementBanner />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/quiz-result/:id" element={<QuizResultPage />} />
                <Route path="/order-success/:id" element={<OrderSuccessPage />} />
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
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
