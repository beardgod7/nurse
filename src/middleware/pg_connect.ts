import sequelize from "../database/pg_config";

class Connectpg{
    public syncDatabase=async(): Promise<void> => {
        try {
          await sequelize.sync();
          console.log('Database synchronized.');
        } catch (error) {
          console.error('Database synchronization failed:', error);
        }
      }
}
const connnect_pg =new Connectpg()
 export default connnect_pg

