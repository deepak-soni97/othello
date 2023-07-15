import { log } from "common-errors";
import { Player } from "../DataFormats/Player";
import { roomcode } from "../DataFormats/room";
// import { Tables } from "../DataFormats/Tables";
// import { LoginPayload } from "../logics/entry/login";
import { DbManager } from "./DbManager";

//#region Entry

export async function signupUser(playerData: Player): Promise<void> {
    const usersCollection = DbManager.Instance.masterDb.collection<Player>("players");
    const result = await usersCollection.insertOne(playerData);
    console.log(`Player sign up inserted with the _id: ${result.insertedId}`, result);
}

export async function loginUser(queryData: any): Promise<Player> {
    const usersCollection = DbManager.Instance.masterDb.collection<Player>("players");
    const result = await usersCollection.findOne<Player>(queryData);
    return result;
}

export async function getPlayerList():Promise<Player[]> {
const playerCollection = DbManager.Instance.masterDb.collection<Player>("players");
const result = await playerCollection.find({}).toArray();
return result;

}
export async function getPlayer(playerId:any):Promise<Player> {
    const playerCollection = DbManager.Instance.masterDb.collection<Player>("players");
    const result = await playerCollection.find({playerId:{ $in: playerId}}).toArray();
    return result;
}

// Check if the room code is already in use
export async function isCodeInUse(code: string) {
    const roomCollection = DbManager.Instance.gameDb.collection("rooms");
    const roomCodes = await roomCollection.findOne({code})
    return roomCodes;
  }

export async function createRoomCode(query:roomcode) {
    const roomCollection = DbManager.Instance.masterDb.collection<Player>("rooms");
    const result = await roomCollection.insertOne(query) ;
    return result;
    
}




export async function findGameRoom(code: string) {
    const roomCollection = DbManager.Instance.masterDb.collection("rooms");
    const result = await roomCollection.findOne({roomCode:code});
    return result;
}


export async function updateGameRoomPlayers(code: string, players: any,gameStarted:boolean): Promise<void> {
    const gameRoomsCollection = DbManager.Instance.masterDb.collection("rooms");
   let result =  await gameRoomsCollection.updateOne({ roomCode: code }, { $push: { 'info.players': players },$set:{ 'info.gameStarted':gameStarted} });
   return result;

}