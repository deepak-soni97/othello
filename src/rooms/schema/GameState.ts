// import { Schema, Context, type } from "@colyseus/schema";


// const INITIAL_PLAYER_TURN = 0; // 0 for black, 1 for white

// export class GameState extends Schema {

//   // @type("string") mySynchronizedProperty: string = "Hello world";
//   @type([('string')])
//   board: Array<Array<string>> = [] ;

//   @type('number')
//   playerTurn: number = INITIAL_PLAYER_TURN;
// }

import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';

const BOARD_WIDTH = 8;

export class GameState extends Schema {
  @type("string") currentTurn: string;
  @type({ map: "boolean" }) players = new MapSchema<boolean>();
  @type(["number"]) board: number[] = new ArraySchema<number>(...Array(BOARD_WIDTH * BOARD_WIDTH).fill(0));
  @type("string") winner: string;
  @type("boolean") draw: boolean;
}
