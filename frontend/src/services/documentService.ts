import { get, post } from 'frontend/src/services/api';
import { DocumentSchema } from 'frontend/src/schema/documentSchema';

export const uploadDocument = async (documentData: DocumentSchema): Promise<object> => {
  try {
    const response = await post('/documents', documentData);
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const getDocument = async (documentId: string): Promise<object> => {
  try {
    const response = await get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving document:', error);
    throw error;
  }
};

export const classifyDocument = async (documentId: string): Promise<object> => {
  try {
    const response = await post(`/documents/${documentId}/classify`);
    return response.data;
  } catch (error) {
    console.error('Error classifying document:', error);
    throw error;
  }
};