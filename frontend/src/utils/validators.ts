import { string, object, number, date } from 'yup';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  // This regex assumes a US phone number format: (xxx) xxx-xxxx or xxx-xxx-xxxx
  const phoneRegex = /^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

export function validateSSN(ssn: string): boolean {
  // This regex assumes the SSN format: xxx-xx-xxxx
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(ssn);
}