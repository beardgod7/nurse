export default class Sanitizer {
    static sanitizeEmail(email: string): string {
      return email.trim().toLowerCase();
    }
  
    static sanitizeTextField(field: string): string {
      return field.trim();
    }
  
    static sanitizePassword(password: string): string {
      return password.trim(); 
    }

    static sanitizeName(firstName: string): string {
      return firstName.trim(); 
    }
    
    static sanitizeGender(Gender: string): string {
      return Gender.trim(); 
    }
  }
  