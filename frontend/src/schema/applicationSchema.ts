import { object, string, date } from 'yup';
import { APPLICATION_STATUSES } from 'frontend/src/utils/constants';

export const ApplicationSchema = object({
  merchant_id: string().required('Merchant ID is required'),
  owner_id: string().required('Owner ID is required'),
  status: string()
    .oneOf(APPLICATION_STATUSES, 'Invalid application status')
    .required('Status is required'),
  created_at: date().required('Created date is required'),
  updated_at: date().required('Updated date is required'),
});

// Define the TypeScript interface for the Application
export interface Application {
  merchant_id: string;
  owner_id: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}