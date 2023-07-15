import { Room, Client } from "colyseus";
import { LobbyState } from "./schema/LobbyState";
import { getTablesFromDB } from "../logics/lobby/lobby";
import { createGameRoom } from "../logics/game/createGameRoom";
import { IncomingMessage } from "http";
import { getPlayerList } from "../db/MasterQueries";
import { Player } from "../DataFormats/Player"
import { isCodeInUse,createRoomCode } from "../db/MasterQueries";
import { type,Schema } from "@colyseus/schema";
import { joinGameRoom } from "../logics/game/joinGameRoom";



class RoomCreatedResponse extends Schema {
    @type("string") action: string;
    @type("string") code: string;
}

export class LobbyRoom extends Room<LobbyState> {

    onCreate(options: any) {
        this.setState(new LobbyState());
        console.log("Lobby room created:", this.roomId);
        this.registerClientMessages();
    }

    registerClientMessages() {

        // this.onMessage("getTables", async (client, payload) => {
        //     let res = await getTablesFromDB(payload.message);
        //     client.send("response", { response: res, respId: payload.respId });
        // });


        this.onMessage("createRoom", async(client, payload) => {
            let res = await createGameRoom(client.sessionId,payload.message);
            client.send("response", { response: res, respId: payload.respId});
        })

    //     this.onMessage("getPlayers", async (client, payload)=>{
    //      let res = await getPlayerList();
    //      client.send("response", {response: res, respId: payload.respId})
    //     })

        this.onMessage("joinRoom", async (client, payload) => {
console.log("playerJoined 46",client);

         let{roomCode, playerId } = payload.message;
         let response= await joinGameRoom(roomCode,playerId);

          if(response.success) {

            if(response.roomData){
                
          this.broadcast("playerJoined",response.roomData);
        console.log("line 55 broadcast Send",response.roomData);
        
            }
          }
          client.send("response", {response: response, respId: payload.respId});
        });
        
    

    //     // this.onMessage("updateProfile", async (client, payload) => {
    //     //     let res = await updateProfile(payload.message);
    //     //     client.send("response", { response: res, respId: payload.respId });
    //     // });
    }

    onAuth(client: Client, options: any, request?: IncomingMessage) {
        return true;//auth??
    }   

   async onJoin(client: Client, options: any) {
    
        console.log("Player joined lobby room:", client.sessionId);
    this.broadcast(`Player ${client.sessionId} joined the lobby.`);
    }

    onLeave(client: Client, consented: boolean) {
        console.log("Player left lobby room:", client.sessionId);
        this.broadcast(`Player ${client.sessionId} left the lobby.`);
    }








    onDispose() {
        // console.log("lobby room", this.roomId, "disposing...");
    }

}

// // Generate a random room code
// function generateRoomCode(): string {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let code = "";
  
//     for (let i = 0; i < 8; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       code += characters[randomIndex];
//     }
  
//     return code;
//   }
//   console.log(generateRoomCode());