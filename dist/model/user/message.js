"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_config_1 = __importDefault(require("../../database/pg_config"));
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chatId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: pg_config_1.default,
    tableName: 'messages',
});
exports.default = Message;
