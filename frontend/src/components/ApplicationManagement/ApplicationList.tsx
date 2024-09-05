import React, { useEffect, useState } from 'react';
import { getApplications } from 'frontend/src/services/applicationService';
import { useAppSelector } from 'frontend/src/store';

interface Application {
  id: string;
  status: string;
  createdAt: string;
  merchantName: string;
}

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const fetchedApplications = await getApplications();
      setApplications(fetchedApplications);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications. Please try again later.');
      console.error('Error fetching applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // HUMAN INPUT NEEDED: Implement sorting and filtering logic

  return (
    <div className="application-list">
      <h2>MCA Applications</h2>
      {isLoading && <p>Loading applications...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <>
          {/* HUMAN INPUT NEEDED: Add sorting and filtering UI components */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Merchant Name</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.merchantName}</td>
                  <td>{app.status}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && <p>No applications found.</p>}
        </>
      )}
    </div>
  );
};

export default ApplicationList;