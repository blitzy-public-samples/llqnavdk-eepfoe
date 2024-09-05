import { object, string, date } from 'yup';
import { USER_ROLES } from 'frontend/src/utils/constants';

const UserSchema = object({
  username: string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must not exceed 50 characters'),

  email: string()
    .required('Email is required')
    .email('Invalid email format'),

  role: string()
    .required('Role is required')
    .oneOf(USER_ROLES, 'Invalid role'),

  created_at: date()
    .default(() => new Date())
    .required('Created date is required'),
});

export default UserSchema;

// HUMAN INPUT NEEDED: Consider adding additional validation rules or custom error messages if necessary.