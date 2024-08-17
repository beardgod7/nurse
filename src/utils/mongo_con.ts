import Database from "../database/db_config";
import connect from "../middleware/mogondb_connect";
import dotenv from "dotenv"

dotenv.config()
class connectivity{
    private dbUrl: string;
    
    constructor(){
        this.dbUrl= process.env.DB_Url || ""
        this.connectionrun()
    }

    private connectionrun(){
        const dbinstance=new Database(this.dbUrl)
        const connection= new connect(dbinstance)
        connection.run()
    }

}

const connectivityistance = new connectivity()

export default connectivityistance