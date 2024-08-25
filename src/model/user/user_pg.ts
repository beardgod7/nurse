import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../database/pg_config';
import UserAttributes, { ILocation } from './userinterface';
import Chat from './chat';  
import Message from './message';
import Userhash from '../../utils/bcrypt';



export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  [x: string]: any;
  public id!: number;
  public googleId?: string;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public gender?: string;
  public phoneNumber?: number;
  public password?: string;
  public role!: 'client';
  public location?:ILocation
  public createdAt!: Date;
  public updatedAt!: Date;
  public comparePassword?: (password:String) => Promise<boolean>
  public getChats!: () => Promise<Chat[]>;
  public addChat!: (chat: Chat) => Promise<void>;
  public createChat!: (chat: Chat) => Promise<Chat>;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'client',
  },
  location: {
    type: DataTypes.JSONB, 
    allowNull: true,
    defaultValue: null,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'users',
  hooks: {
    beforeCreate: async (user: User) => {
      await Userhash.hashPassword(user);
    },
    beforeUpdate: async (user: User) => {
      await Userhash.hashPassword(user);
    }
  }
});

User.hasMany(Chat, { foreignKey: 'clientId', as: 'chats' });
User.hasMany(Chat, { foreignKey: 'nurseId', as: 'nurseChats' });
Chat.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });

export default User;
