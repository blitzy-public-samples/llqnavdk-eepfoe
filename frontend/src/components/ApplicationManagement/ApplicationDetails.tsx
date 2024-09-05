import React, { useEffect, useState } from 'react';
import { getApplication } from 'frontend/src/services/applicationService';
import DocumentViewer from 'frontend/src/components/DocumentViewer';

interface ApplicationDetails {
  id: string;
  merchantName: string;
  ownerName: string;
  fundingAmount: number;
  status: string;
  createdAt: string;
  documents: string[];
}

const ApplicationDetails: React.FC<{ applicationId: string }> = ({ applicationId }) => {
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicationDetails = async (applicationId: string): Promise<void> => {
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
    fetchApplicationDetails(applicationId);
  }, [applicationId]);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!applicationDetails) {
    return <div>No application details found.</div>;
  }

  return (
    <div className="application-details">
      <h2>Application Details</h2>
      <div>
        <strong>Application ID:</strong> {applicationDetails.id}
      </div>
      <div>
        <strong>Merchant Name:</strong> {applicationDetails.merchantName}
      </div>
      <div>
        <strong>Owner Name:</strong> {applicationDetails.ownerName}
      </div>
      <div>
        <strong>Funding Amount:</strong> ${applicationDetails.fundingAmount.toFixed(2)}
      </div>
      <div>
        <strong>Status:</strong> {applicationDetails.status}
      </div>
      <div>
        <strong>Created At:</strong> {new Date(applicationDetails.createdAt).toLocaleString()}
      </div>
      
      <h3>Documents</h3>
      {applicationDetails.documents.map((documentId, index) => (
        <DocumentViewer key={documentId} documentId={documentId} />
      ))}
    </div>
  );
};

export default ApplicationDetails;