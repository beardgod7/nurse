export default class Validator {
    static isEmailValid(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static isPasswordStrong(password: string): boolean {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }
  
    static isFieldNotEmpty(field: string): boolean {
      return field.trim().length > 0;
    }
  }
  