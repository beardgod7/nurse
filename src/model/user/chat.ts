import { DataTypes, Model} from 'sequelize';
import sequelize from "../../database/pg_config";

class Chat extends Model {
    public id!: number;
    public nurseId!: number;
    public clientId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
  }
  
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nurseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'chats',
  });
  
  export default Chat;
  