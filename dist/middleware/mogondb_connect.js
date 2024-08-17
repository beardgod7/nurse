"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class connect {
    constructor(db) {
        this.db = db;
    }
    async run() {
        try {
            await this.db.connect();
        }
        catch (error) {
            console.error('errorr in connection', error);
        }
    }
}
exports.default = connect;
