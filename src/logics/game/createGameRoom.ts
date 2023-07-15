import { createRoomCode ,isCodeInUse} from "../../db/MasterQueries";
import { roomcode } from "../../DataFormats/room";

export interface roomPayload {
    roomId: string;
    players: string[];
    gameType: boolean;
    
}


export async function createGameRoom(playerId: string, data: roomPayload) {

    let roomCode = generateRoomCode();

    let newRoom = new roomcode(roomCode,playerId,data);
    let catchedError: any = null;
    let res = await createRoomCode(newRoom);
    if(!!res){
        return { success: true, roomCode:roomCode }
    }else {
        return {success: false, info: catchedError }
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
