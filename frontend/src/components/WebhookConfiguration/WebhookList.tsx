import React, { useEffect, useState } from 'react';
import { getWebhooks } from 'frontend/src/services/webhookService';
import { useAppSelector } from 'frontend/src/store';

const WebhookList: React.FC = () => {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhooks = async () => {
    try {
      setLoading(true);
      const fetchedWebhooks = await getWebhooks();
      setWebhooks(fetchedWebhooks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch webhooks. Please try again later.');
      console.error('Error fetching webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const handleEdit = (webhookId: string) => {
    // Implement edit functionality
    console.log('Edit webhook:', webhookId);
  };

  const handleDelete = (webhookId: string) => {
    // Implement delete functionality
    console.log('Delete webhook:', webhookId);
  };

  if (loading) {
    return <div>Loading webhooks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Registered Webhooks</h2>
      {webhooks.length === 0 ? (
        <p>No webhooks registered.</p>
      ) : (
        <ul>
          {webhooks.map((webhook) => (
            <li key={webhook.id}>
              <span>{webhook.url} - {webhook.event_type}</span>
              <button onClick={() => handleEdit(webhook.id)}>Edit</button>
              <button onClick={() => handleDelete(webhook.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WebhookList;