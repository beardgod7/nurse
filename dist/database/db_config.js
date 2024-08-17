"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }
    async connect() {
        try {
            const conn = await mongoose_1.default.connect(this.dbUrl, {});
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
        catch (err) {
            console.error('Database connection error:', err);
            process.exit(1);
        }
    }
    async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log('MongoDB Disconnected');
        }
        catch (err) {
            console.error('Error disconnecting from the database:', err);
        }
    }
}
exports.default = Database;
