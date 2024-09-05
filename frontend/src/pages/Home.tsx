import React, { useEffect, useState } from 'react';
import { Header, Footer, Sidebar } from 'frontend/src/components/Shared';
import { get } from 'frontend/src/services/api';
import { useAppSelector } from 'frontend/src/store';

const Home: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await get('/api/dashboard');
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again later.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard">
          <h1>Welcome to MCA Application Processing System</h1>
          {loading && <p>Loading dashboard data...</p>}
          {error && <p className="error-message">{error}</p>}
          {dashboardData && (
            <div className="dashboard-content">
              <section className="recent-applications">
                <h2>Recent Applications</h2>
                {/* Display recent applications data */}
              </section>
              <section className="system-health">
                <h2>System Health</h2>
                {/* Display system health metrics */}
              </section>
              <section className="quick-actions">
                <h2>Quick Actions</h2>
                {/* Add buttons or links for quick actions */}
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;