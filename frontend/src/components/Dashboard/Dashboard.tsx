import React, { useEffect, useState } from 'react';
import { get } from 'frontend/src/services/api';
import { useAppSelector } from 'frontend/src/store';
import { Header, Footer, Sidebar } from 'frontend/src/components/Shared';

interface DashboardData {
  recentApplications: any[];
  systemHealth: {
    status: string;
    uptime: string;
  };
  // Add more properties as needed
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await get('/api/dashboard');
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main>
          <h1>Dashboard</h1>
          {isLoading && <p>Loading dashboard data...</p>}
          {error && <p className="error">{error}</p>}
          {dashboardData && (
            <div>
              <section>
                <h2>Recent Applications</h2>
                <ul>
                  {dashboardData.recentApplications.map((app, index) => (
                    <li key={index}>{/* Render application details */}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2>System Health</h2>
                <p>Status: {dashboardData.systemHealth.status}</p>
                <p>Uptime: {dashboardData.systemHealth.uptime}</p>
              </section>
              {/* Add more sections for other dashboard metrics */}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;