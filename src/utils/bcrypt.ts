import bcrypt from 'bcryptjs';
import User from '../model/user/user_pg';

class Userhash {
  static async hashPassword(user: User): Promise<void> {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password!, 10); // Add `!` to ensure password is not undefined
    }
  }

  static async comparePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) {
      throw new Error('User password is not set.');
    }

    return bcrypt.compare(password, user.password);
  }
}

export default Userhash;

   


  
