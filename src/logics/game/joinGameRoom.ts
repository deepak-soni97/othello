import { createInGamePlayer, InGamePlayer } from "../../DataFormats/InGamePlayer";
import { findGameRoom,getPlayer,updateGameRoomPlayers } from "../../db/MasterQueries"
import { addPlayerToTable } from "../../db/Queries";
import { GameStates, PlayerState } from "../../GameConstants";
import { getTablesFromDB } from "../lobby/lobby";




export async function joinGameRoom(roomCode: string, playerId: string) {
    // Find the game room in MongoDB based on the code
    
    const gameRoom = await findGameRoom(roomCode);
  
    if (!gameRoom) {
      console.error(`Game room with code ${roomCode} not found.`);
      return null;
    }
  
    if(gameRoom.info.players.length >= 2){
      const table = await getTablesFromDB();
      const findPlayer = await getPlayer(gameRoom.info.players); 


      if(table.tables.currentInfo.players.length >= 2){
        return { success: true, message:"table is full"};
      }

      // let position : number ;

      // if(table.tables.currentInfo.players[0] !== playerId){

      //   position = 1;
      // }else{
      //   position = 2;
      // }
      // console.log("position is ",position);
      

      const players = [];
      findPlayer.forEach((player: InGamePlayer) => {
          let p = {
              playerId: player.playerId,
              // position:position,
              playerName: player.info.name,
              state: player.state,
              isPartOfGame: GameStates.Running && player.state !== PlayerState.Surrender,
              imageAvtar: player.info.avatar,
              gameInfo:player.gameInfo
          }
          
          players.push(p);
      });
      const addPlayer = await addPlayerToTable(table,players);

        return { success: true, message:"Room is full"}
    }

    if (gameRoom.info.gameStarted) {
      console.error(`Game has already started in the specified room: ${roomCode}`);
      return null;
    }
  
    // Add the player to the game room and update the MongoDB document
    gameRoom.info.players.push(playerId);
    const update = await updateGameRoomPlayers(roomCode, playerId,true); 
     
    const res = gameRoom.info.players
    return {success: true,roomData:res};
  }


  