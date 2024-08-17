import bcrypt from 'bcryptjs';

class UserHash {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(Password: string, candidatePassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(candidatePassword, Password);
        } catch (error) {
            throw new Error('Password comparison failed');
        }
    }
}

export default UserHash;


  
