import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()
class Database {
    public sequelize: Sequelize;
  
    constructor(databaseUrl: string) {
      this.sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
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
  
  const databaseUrl = process.env.DATABASE_URL!;
  const database = new Database(databaseUrl);
  export default database.sequelize;
  