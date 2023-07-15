// Import required libraries
import { Room , Client } from 'colyseus';
import { type, Schema } from '@colyseus/schema';
// import { GameState } from './schema/GameState';
import { isValidMove, makeMove, startGame } from '../logics/game/startGame';
import {GAME } from '../logics/game/startGame'
// Define constants
const BOARD_SIZE = 8;
const INITIAL_PLAYER_TURN = 0; // 0 for black, 1 for white
const TURN_TIMEOUT = 10

// Define the state schema for the game room
 class GameState extends Schema {
    @type([('string')])
    board: Array<Array<string>> = [] ;
  
    @type('number')
    playerTurn: number = INITIAL_PLAYER_TURN;
  }


// Define the Othello game room
export class GameRoom extends Room<GameState> {
  gameState: any;
  onCreate(options: any) {
    this.setState(new GameState());
    // this.initializeBoard();
    this.registerClientMessages();
  
    }


  registerClientMessages() {
    this.onMessage("startGame", async(client,payload)=>{
      let res = await startGame();
      if(res.success){
      this.broadcast("gameStar",res.message)

      }

      client.send("response",{ response: res, respId: payload.respId});
    })


    this.onMessage('move',async (client, message) => {

     let res = await makeMove(message.playerId,message.rows,message.cols);
     if(res.success){
      this.broadcast('updateBoard', GAME.board);
     } else {
      // Handle the case when the move is invalid
      client.send('invalidMove', { message: res.message });
    }
    });
   
  }
 

  onJoin(client: any) {
    // Handle player joining the room
  }

  onLeave(client: any) {
    // Handle player leaving the room
  }

  onMessage(client: any, message: any) {
    // Handle player's move
  }

  onDispose() {
    // Cleanup resources when the game room is disposed
  }


 
}



