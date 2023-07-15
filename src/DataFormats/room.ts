import { roomPayload } from "../logics/game/createGameRoom";


interface roomCodes {
    roomCode: string;
    info: BasicInfo;   
}
interface BasicInfo{

    players: string[];
    gameStarted: boolean;
}

export class roomcode implements roomCodes {

    roomCode: string
    info: BasicInfo;   
    
    constructor(roomCode,playerId,data: roomPayload) {
        this.createRoom(roomCode,playerId,data);
    }

    createRoom(roomCode,playerId,roomData: roomPayload) {
        this.roomCode = generateRoomCode();
        this.info = {
            players:[playerId],
            gameStarted: false,

        }
    }

}


// Generate a random room code
function generateRoomCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  
    return code;
  }