"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect,
            define: config.define,
            pool: config.pool,
            port: config.port
        });
    }
}
const config = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.db_username,
    password: process.env.db_password,
    database: 'ibenefit1.0',
    define: {
        underscored: true,
    },
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
const database = new Database(config);
exports.default = database.sequelize;
