"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Database {
    constructor(databaseUrl) {
        this.sequelize = new sequelize_1.Sequelize(databaseUrl, {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true, // Render databases typically require SSL
                    rejectUnauthorized: false,
                },
            },
            pool: {
                max: 50,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });
    }
}
// Use the DATABASE_URL from environment variables
const databaseUrl = process.env.DATABASE_URL;
const database = new Database(databaseUrl);
exports.default = database.sequelize;
