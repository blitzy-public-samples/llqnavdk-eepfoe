import React, { useEffect, useState } from 'react';
import { ApplicationDetails, DocumentViewer } from 'frontend/src/components/ApplicationManagement';
import { getApplication } from 'frontend/src/services/applicationService';
import { useAppSelector } from 'frontend/src/store';

const ApplicationReview: React.FC = () => {
  const [applicationDetails, setApplicationDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Assuming we get the applicationId from the URL params or props
  const applicationId = ""; // TODO: Get the actual applicationId

  const fetchApplicationDetails = async (applicationId: string) => {
    try {
      setLoading(true);
      const details = await getApplication(applicationId);
      setApplicationDetails(details);
      setError(null);
    } catch (err) {
      setError('Failed to fetch application details. Please try again.');
      console.error('Error fetching application details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplicationDetails(applicationId);
    }
  }, [applicationId]);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="application-review">
      <h1>Application Review</h1>
      {applicationDetails ? (
        <>
          <ApplicationDetails application={applicationDetails} />
          <DocumentViewer documents={applicationDetails.documents} />
        </>
      ) : (
        <div>No application details available.</div>
      )}
    </div>
  );
};

export default ApplicationReview;