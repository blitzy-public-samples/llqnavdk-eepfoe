import React, { useState } from 'react';
import { useFormik } from 'formik';
import { createUser } from 'frontend/src/services/userService';
import { UserSchema } from 'frontend/src/schema/userSchema';

const AddUser: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      role: '',
    },
    validationSchema: UserSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: UserSchema): Promise<void> {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate the form data using UserSchema
      await UserSchema.validate(values);

      // Call the API to create the new user with the validated data
      await createUser(values);

      // Reset the form after successful submission
      formik.resetForm();
    } catch (err) {
      // Handle any errors that occur during the creation process
      setError(err instanceof Error ? err.message : 'An error occurred while creating the user');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <div>{formik.errors.username}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div>{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
        >
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <div>{formik.errors.role}</div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding User...' : 'Add User'}
      </button>
    </form>
  );
};

export default AddUser;