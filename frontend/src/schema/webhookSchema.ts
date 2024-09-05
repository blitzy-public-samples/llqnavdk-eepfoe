import { object, string, boolean } from 'yup';
import { WEBHOOK_EVENTS } from 'frontend/src/utils/constants';

export const WebhookSchema = object({
  url: string()
    .url('Invalid URL format')
    .required('URL is required'),
  event_type: string()
    .oneOf(WEBHOOK_EVENTS, 'Invalid event type')
    .required('Event type is required'),
  active: boolean()
    .required('Active status is required')
});

// HUMAN INPUT NEEDED
// Consider adding additional validation rules or custom error messages if needed