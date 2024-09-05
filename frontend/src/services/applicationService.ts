import { get, post, put } from 'frontend/src/services/api';
import { ApplicationSchema } from 'frontend/src/schema/applicationSchema';

// HUMAN INPUT NEEDED
export const createApplication = async (applicationData: ApplicationSchema): Promise<object> => {
  try {
    const response = await post('/applications', applicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const getApplication = async (applicationId: string): Promise<object> => {
  try {
    const response = await get(`/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting application:', error);
    throw error;
  }
};

// HUMAN INPUT NEEDED
export const updateApplication = async (applicationId: string, applicationData: ApplicationSchema): Promise<object> => {
  try {
    const response = await put(`/applications/${applicationId}`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};