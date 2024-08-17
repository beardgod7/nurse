"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../database/db_config"));
const mogondb_connect_1 = __importDefault(require("../middleware/mogondb_connect"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class connectivity {
    constructor() {
        this.dbUrl = process.env.DB_Url || "";
        this.connectionrun();
    }
    connectionrun() {
        const dbinstance = new db_config_1.default(this.dbUrl);
        const connection = new mogondb_connect_1.default(dbinstance);
        connection.run();
    }
}
const connectivityistance = new connectivity();
exports.default = connectivityistance;
