import { MongoClient, Db } from "mongodb";
// systemConfig
// const uri = "mongodb+srv://shishir:2swkidw2lQFnfPZH@24-7play.thiowq7.mongodb.net/test";
        const uri = "mongodb://127.0.0.1:27017"
/*collection todo
userSession collection
admin
finance
log
*/

//if you write code using the raw compiled javascript you will not have protection against multiple instantiation, as the constraints of TS disappears and the constructor won't be hidden.
export class DbManager {
    private static _instance: DbManager;
    private client: MongoClient;
    masterDb: Db;
    gameDb: Db;
    adminDb: Db;
    financeDb: Db;
    logDb: Db;
    constructor() {
        console.log("constructor of DbManager");
        this.client = new MongoClient(uri);
    }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public async init() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await this.client.connect();
            // Establish and verify connection
            this.masterDb = await this.client.db("Play");
            this.gameDb = await this.client.db("othello-board");//.command({ ping: 1 });

            console.log("Connected successfully to server");
        }
        catch (err) {
            // catchCode - Code block to handle errors
            console.log("db init error ", err);
        }
        finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
            // console.log("db closed");
        }
    }

}