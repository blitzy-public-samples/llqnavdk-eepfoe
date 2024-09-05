import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'frontend/src/pages/Home';
import { Login } from 'frontend/src/pages/Login';
import { ApplicationReview } from 'frontend/src/pages/ApplicationReview';
import { NotFound } from 'frontend/src/pages/NotFound';
import { Header } from 'frontend/src/components/Shared/Header';
import { Footer } from 'frontend/src/components/Shared/Footer';
import { Sidebar } from 'frontend/src/components/Shared/Sidebar';
import { useAppSelector } from 'frontend/src/store';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    // You can add any app-wide side effects here
    // For example, checking authentication status
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/application/:id" element={<ApplicationReview />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;