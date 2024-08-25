import { DataTypes, Model} from 'sequelize';
import sequelize from "../../database/pg_config";


class Message extends Model {
    public id!: number;
    public chatId!: number;
    public senderId!: number;
    public text!: string;
    public timestamp!: Date;
  }
  
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    tableName: 'messages',
  });
  
  export default Message;
  