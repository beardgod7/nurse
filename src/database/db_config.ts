import mongoose from 'mongoose';


export interface databaseDTO{
  connect():Promise<void>
  disconnect(): Promise<void>
}
class Database implements databaseDTO {
  private dbUrl: string;

  constructor(dbUrl: string) {
    this.dbUrl = dbUrl;
  }


  public async connect(): Promise<void> {
    try {
      const conn = await mongoose.connect(this.dbUrl, {
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1); 
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB Disconnected');
    } catch (err) {
      console.error('Error disconnecting from the database:', err);
    }
  }
}

export default Database;
