import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { getDocument } from 'frontend/src/services/documentService';

interface DocumentViewerProps {
  documentId: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId }) => {
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocument(documentId);
  }, [documentId]);

  const fetchDocument = async (documentId: string) => {
    try {
      const content = await getDocument(documentId);
      setDocumentContent(content);
      setError(null);
    } catch (err) {
      setError('Failed to fetch document. Please try again.');
      console.error('Error fetching document:', err);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages || 1));
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!documentContent) {
    return <div className="loading-message">Loading document...</div>;
  }

  return (
    <div className="document-viewer">
      <Document
        file={documentContent}
        onLoadSuccess={onDocumentLoadSuccess}
        error={<div>Failed to load PDF document.</div>}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="page-controls">
        <button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={() => changePage(1)} disabled={pageNumber >= (numPages || 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DocumentViewer;