"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_config_1 = __importDefault(require("../database/pg_config"));
class Connectpg {
    constructor() {
        this.syncDatabase = async () => {
            try {
                await pg_config_1.default.sync();
                console.log('Database synchronized.');
            }
            catch (error) {
                console.error('Database synchronization failed:', error);
            }
        };
    }
}
const connnect_pg = new Connectpg();
exports.default = connnect_pg;
