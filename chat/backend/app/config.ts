import dotenv from "dotenv"
dotenv.config()
const {DBHOST,DATABASE,DBPASSWORD,DBUSER} = process.env;

class  mysqlConfig {
    user = DBUSER
    password = DBPASSWORD
    database = DATABASE
    host = DBHOST
    constructor() {
        return {host:this.host,user:this.user,password:this.password,database:this.database}
    }
}

const dbConfig = new mysqlConfig()

export default dbConfig 