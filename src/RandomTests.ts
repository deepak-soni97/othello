import { EventEmitterInstance } from "./EventEmitter";
import { onLoginRequest } from "./logics/entry/login";
import { getTablesFromDB,createTableInDB,playersData} from "./logics/lobby/lobby";
import { onRegisterRequest } from "./logics/entry/register";
import { createGameRoom } from "./logics/game/createGameRoom";
import { joinGameRoom } from "./logics/game/joinGameRoom"
import { DbManager } from "./db/DbManager";
import { makeMove, startGame } from "./logics/game/startGame";



EventEmitterInstance.on("signup", () => {
    console.log("evemt recieved signup");
    RandomTests.Instance.signup();
});

class RandomTests {
    private static _instance: RandomTests;

    constructor() {
        // console.log("")
    }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    init() {
        // this.joinRoom();
        this.startGame();
        this.makeMove();
        //   this.playerlist();
        // this.signup();
        // this.login();
        // this.table();
        // this.createRoom();
        // this.createTable();
        // this.joinTable();
    }

    async pr() {
        const tableCollection = DbManager.Instance.gameDb.collection("tables");
        const projection = { _id: 0, id: 1, "info.name": 1, "info.turnTime": 1, "currentInfo.firstActiveIndex": 1 };

        let cursor = await tableCollection.findOne({ id: "8be7f75c-056c-4d8f-9cc9-1cedd9abb3ac" }, { projection: projection });//.project(projection);
        // cursor.forEach(console.dir);
        // console.log

        console.log(cursor)
    }

    async joinRoom(){
        let sampleData = {
            playerId: "c333f32b-4bd4-483f-8208-2ccd95342dc1",
            roomCode: "GUOK4MIE",

        }
        let res = await joinGameRoom(sampleData.roomCode,sampleData.playerId);
        console.log("joinGame",res);
        
    }
    async makeMove(){
let data = {
    playerId: "0c404871-aa3a-4cd2-8ed9-f9ccade85804",
    // playerId: "c333f32b-4bd4-483f-8208-2ccd95342dc1",
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
}
         
let res = await makeMove(data.playerId,3,5);
    
console.log("player turn===",res);

    }
    async startGame(){
        let res = await startGame();
        // console.log("game-start-res",res);
        
    }
   async playerlist() {
    let res = await playersData();
    // console.log(res);
    
   }

   async createRoom() {
    let sampleData = {
        playerId: "0c404871-aa3a-4cd2-8ed9-f9ccade85804",
    }
    let res = await createGameRoom(sampleData.playerId,sampleData);
    // console.log("code",res);
    
   }

    async signup() {
        let sampleData = {
            userName: "Rahul",
            emailId: "rahul@sp.com",
            password: "123",
            mobileNumber: 989898983
        }
       
        let res = await onRegisterRequest(sampleData);
        // console.log("resp ",res);
        
    }
    
    async createTable() {
        let sampleData: any = {
            tableName: "testTable",
            maxPlayers: 2,
            turnTime: 60,
            totalGameTime: 10,
            prizeStructure: {
                win:"",
                lose:""
            },
            gameVariation: "1"
        }
        let res = await createTableInDB(sampleData);
        // console.log("ress==",res);
        
    }
    async table() {
        let sampleData: any = {
            table_name: "gametable1",
            maxPlayers: 2,
            currentMoveIndex: -1,
            state: "1",

        }
        let res = await getTablesFromDB(sampleData);
        // console.log(res)
    }
    

    async joinTable() {
        let data: any = {
            tableId: "testid1",
            playerId: "fb956d51-a5d1-42f4-8eb7-5b364f36eaf5",
            playerName: "u"
        }


        // let table = await processJoin(Data, Data.playerId, new GameRoom);
        // console.log(table);
        // let res = await processJoin(data);
        // console.log("khafga ", res)

    }


    async login() {
        let sampleData: any = {
            user_name: "a",
            password: "a",
            emailId: "a@g.com",

        }
        let res = await onLoginRequest(sampleData);
        // console.log(res);

    }


}


export const RandomTestsInstance = RandomTests.Instance;