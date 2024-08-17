import {databaseDTO} from '../database/db_config';



export default class connect {
  private db:databaseDTO
  constructor(db:databaseDTO){
     this.db = db
  }
  public async run ():Promise<void>{
    try {
      await this.db.connect()
    } catch (error) {
      console.error('errorr in connection', error)
    }
  }
  
}
