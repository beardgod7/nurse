import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()
interface IDatabaseConfig {
    dialect: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    define: {
      underscored: boolean;
    };
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  }
class Database {
    public sequelize: Sequelize;
  
    constructor(config: IDatabaseConfig) {
      this.sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        define: config.define,
        pool: config.pool,
        port: config.port
      });
    }
  }
  
  const config: IDatabaseConfig = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.db_username!,
    password: process.env.db_password!,
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
  export default database.sequelize;