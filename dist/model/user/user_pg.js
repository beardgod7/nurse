"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_config_1 = __importDefault(require("../../database/pg_config"));
const chat_1 = __importDefault(require("./chat"));
const message_1 = __importDefault(require("./message"));
const bcrypt_1 = __importDefault(require("../../utils/bcrypt"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    googleId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'client',
    },
    location: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
        defaultValue: null,
    },
    ProfileComplete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: pg_config_1.default,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            await bcrypt_1.default.hashPassword(user);
        },
        beforeUpdate: async (user) => {
            await bcrypt_1.default.hashPassword(user);
        }
    }
});
User.hasMany(chat_1.default, { foreignKey: 'clientId', as: 'chats' });
User.hasMany(chat_1.default, { foreignKey: 'nurseId', as: 'nurseChats' });
chat_1.default.hasMany(message_1.default, { foreignKey: 'chatId', as: 'messages' });
exports.default = User;
