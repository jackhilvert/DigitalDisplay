import mysql from 'mysql2/promise'

// Describes the parameters required to connect to the mySQL DB
// This works only on local devices. 
interface ConnectionParameters{
  host:string
  port: number
  user:string
  password:string
  database:string
}
//Defines the default parameters to connect to mySQL DB
//Only works on local machines
const admindb_parameters:ConnectionParameters ={
  host: '192.168.1.5', 
  port: 3306, 
  user: 'remote',
  password:'password',
  database: 'admindb'
} 

export class DatabaseConnection{
  connection: mysql.Pool;
  default_connection_parameters = admindb_parameters
  defualt_query = 'SELECT * FROM player_devices';  
    // Takes an implementation of the connection Parameters interface
    // as parameter and creates a connection
    // no return value, stores it as the connection variable of the object
  constructor(connection_parameters?:ConnectionParameters){
      connection_parameters = connection_parameters?connection_parameters:this.default_connection_parameters;
      this.connection = mysql.createPool(connection_parameters)
    }

  async queryDatabase(query_parameter?: string, placeholders?: any[]): Promise<any> {
    const query = query_parameter?query_parameter:this.defualt_query
    try {
      const [rows] = await this.connection.execute(query, placeholders);
      return rows;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}

// Usage
// const main = async () => {
//   const dbconn = new DatabaseConnection 
//   const result = await dbconn.queryDatabase('SELECT * FROM player_devices');
//   console.log(result);
// };

// main().catch(console.error);
