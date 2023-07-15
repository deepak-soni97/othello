import { GameStates, GameVariation } from "../GameConstants";
import { CreateTablePayload } from "./payload";
import { InGamePlayer } from "./InGamePlayer";
const uuid = require('uuid');

interface ITable {
    id: string;
    info: {
        tableName: string;
        gameVariation: GameVariation;
        maxPlayers: number;
        turnTime: number;
        totalGameTime: number;
        prizeStructure: object;
    };
    currentInfo: {
        state: string;
        players: InGamePlayer[];
        // player1Moves:[[]];
        // player2Moves:[[]];
        turnTimeStartAt: number;
    };
}



export class Table implements ITable {
    id: string;
    info: {
          tableName: string; 
          gameVariation: GameVariation;
          maxPlayers: number; 
          turnTime: number;
          totalGameTime: number; 
          prizeStructure: object;
    };

    currentInfo: {
         state: string;
         players: InGamePlayer[]; 
        //  player1Moves:[[]];
        // player2Moves:[[]];
         turnTimeStartAt: number
    };


    constructor(data: CreateTablePayload) {
        this.createTableData(data);
    }

    createTableData(data: CreateTablePayload) {
        this.id = uuid.v4();
        this.info = {
            tableName: data.tableName,
            gameVariation: data.gameVariation,
            maxPlayers: data.maxPlayers,
            turnTime: data.turnTime,
            totalGameTime: data.totalGameTime,
            prizeStructure: data.prizeStructure
        };

        this.currentInfo =
        {
            state: GameStates.Idle,
            players: [],
            // player1Moves:[[]],
            // player2Moves:[[]],
            turnTimeStartAt: -1,
        };

    }
}

