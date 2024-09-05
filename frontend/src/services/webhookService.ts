import { get, post, delete as deleteRequest } from 'frontend/src/services/api';
import { WebhookSchema } from 'frontend/src/schema/webhookSchema';

export const registerWebhook = async (webhookData: WebhookSchema): Promise<object> => {
  try {
    const response = await post('/webhooks', webhookData);
    return response.data;
  } catch (error) {
    console.error('Error registering webhook:', error);
    throw error;
  }
};

export const getWebhooks = async (): Promise<object[]> => {
  try {
    const response = await get('/webhooks');
    return response.data;
  } catch (error) {
    console.error('Error retrieving webhooks:', error);
    throw error;
  }
};

export const deleteWebhook = async (webhookId: string): Promise<void> => {
  try {
    await deleteRequest(`/webhooks/${webhookId}`);
  } catch (error) {
    console.error('Error deleting webhook:', error);
    throw error;
  }
};