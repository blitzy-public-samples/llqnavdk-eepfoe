import React, { useState } from 'react';
import { registerWebhook } from 'frontend/src/services/webhookService';
import { WebhookSchema } from 'frontend/src/schema/webhookSchema';
import { useFormik } from 'formik';

const AddWebhook: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: WebhookSchema) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate the form data using WebhookSchema
      await WebhookSchema.validate(values);

      // Call the API to register the new webhook with the validated data
      await registerWebhook(values);

      // Reset form and show success message
      formik.resetForm();
      // You might want to add a success message or redirect here
    } catch (err) {
      // Handle any errors that occur during the registration process
      setError(err instanceof Error ? err.message : 'An error occurred while registering the webhook');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      url: '',
      event_type: '',
    },
    validationSchema: WebhookSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="url">Webhook URL</label>
        <input
          id="url"
          name="url"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
        />
        {formik.touched.url && formik.errors.url && (
          <div>{formik.errors.url}</div>
        )}
      </div>

      <div>
        <label htmlFor="event_type">Event Type</label>
        <input
          id="event_type"
          name="event_type"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.event_type}
        />
        {formik.touched.event_type && formik.errors.event_type && (
          <div>{formik.errors.event_type}</div>
        )}
      </div>

      {error && <div>{error}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register Webhook'}
      </button>
    </form>
  );
};

export default AddWebhook;