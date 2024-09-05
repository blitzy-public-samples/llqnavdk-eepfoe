import { post } from 'frontend/src/services/api';
import { AUTH_ENDPOINTS } from 'frontend/src/utils/constants';

export const login = async (credentials: object): Promise<object> => {
  try {
    const response = await post(AUTH_ENDPOINTS.LOGIN, credentials);
    // Assuming the response contains the tokens
    return response.data;
  } catch (error) {
    // Handle error (e.g., invalid credentials)
    throw new Error('Login failed');
  }
};

export const logout = (): void => {
  // Clear the stored authentication tokens
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  
  // Clear any session data related to the user
  // This might include clearing other items from localStorage or sessionStorage
  // For example:
  // localStorage.removeItem('userData');
  // sessionStorage.clear();
};

export const refreshToken = async (refreshToken: string): Promise<object> => {
  try {
    const response = await post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
    // Assuming the response contains the new tokens
    return response.data;
  } catch (error) {
    // Handle error (e.g., invalid or expired refresh token)
    throw new Error('Token refresh failed');
  }
};