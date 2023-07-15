import { gameStart } from "../../DataFormats/ClientDataFormat/ResponseMaker";
import { getTablesFromDB } from "../lobby/lobby";
// import { GameState } from "../../rooms/schema/GameState";
import { saveMove, saveWinner, updatePosition } from "../../db/Queries";

const PlayerStates = Object.freeze({
  playerId: "0c404871-aa3a-4cd2-8ed9-f9ccade85804",
});

var GAME;
export function initGame() {

  GAME = {
    players: [],
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
    turn: 0,
  };
}


export async function startGame() {
  initGame();
  const tableData = await getTablesFromDB();

  const res = await gameStart(tableData);

  if (tableData.tables.currentInfo.players.length >= 2) {
    return { success: true, message: "Game start!", res };
  }
}


export async function makeMove(playerId:any,rows:number, cols:number) {
  
  const tableData = await getTablesFromDB();

  let position : number ;

  if(tableData.tables.currentInfo.players[0].playerId === playerId){

    position = 1;
  }else{
    position = 2;
  }
  
  
  let currentPlayer = tableData.tables.currentInfo.players.find((x) => x.playerId === playerId);
  
  let newboard = isValidMove(position, rows, cols); // Assuming isValidMove returns the game board
  

  // If the move is invalid, then we should return an error message.

  if (!newboard) {
    return { success: false, message: "Invalid move" };
  }
  else {
    console.log("It is a valid move");
    if (newboard) {
      let addmoves = await saveMove(
        tableData.tables.id,playerId,
        // "0c404871-aa3a-4cd2-8ed9-f9ccade85804", 
        // "c333f32b-4bd4-483f-8208-2ccd95342dc1",
        rows,
        cols
      );
      
    }
    let emptyflag = 0;
    if (newboard) {

      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (newboard[i][j] === 0) {
            emptyflag = 1;
            break;
          }
        }
        if (emptyflag === 1) {
          break;
        }
      }
    }

    if (emptyflag === 0) {

      let count1 = 0;
      let count2 = 0;
      if (newboard) {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 7; j++) {
            if (newboard[i][j] === 1) {
              count1++;
            } else {
              count2++;
            }
          }
        }
      }
      let winner;
      if (count1 > count2) {
        winner = "player1";
      } else {
        winner = "player2";
      }

const winners = await saveWinner(tableData.tables.id, winner);
// console.log(winners);

      let gameOverRes = gameOver(winner, count1, count2);
      let isGameOver = gameOverRes.success;

      return {
      success: true,
      message: isGameOver ? "Game over" : "Game not over", 
      winner: gameOverRes.winner,
      counts: gameOverRes.counts,
      playerId: currentPlayer.playerId,
      isWinner: isGameOver ? isWinner(GAME, playerId) : false,
    };
     
    } else {

      GAME.board = newboard;
      updateGameBoard(newboard);

      let nextPlayerIndex =
        (tableData.tables.currentInfo.players.findIndex(
          (x) => x.playerId === playerId
        ) +  1) % tableData.tables.currentInfo.players.length;
      let nextPlayer = tableData.tables.currentInfo.players[nextPlayerIndex];

           
      // Handle the valid move case
      return {
        success: true,
        message: "Move successful",
        turn: nextPlayer.playerName ,
        playerId: currentPlayer.playerId,
        board: newboard,
      };
    }
  }
}


export function updateGameBoard(newBoard) {
  GAME.board = newBoard; // Update the game board
  
}

export function isValidMove(tile: any, rows: any, cols: any) {
  let board = GAME.board;

    // Check if the square is empty.
  if (board[rows][cols] !== 0 || !isOnBoard(rows, cols)) {
    return false;
  }

  board[rows][cols] = tile;
  

  let otherTile = tile === 1 ? 2 : 1;
  let tilesToFlip: [number, number][] = [];

  const directions = [
    [-1, -1], // top-left
    [-1, 0], // top
    [-1, 1], // top-right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottom-left
    [1, 0], // bottom
    [1, 1], // bottom-right
  ];

  for (const [dx, dy] of directions) {
    let x = rows + dx;
    let y = cols + dy;
    let tilesToFlipDirection: [number, number][] = [];

    while (isOnBoard(x, y) && board[x][y] === otherTile) {
      tilesToFlipDirection.push([x, y]);
      x += dx;
      y += dy;
    }

    if (isOnBoard(x, y) && board[x][y] === tile) {
      tilesToFlip.push(...tilesToFlipDirection);
    }
  }

  if (tilesToFlip.length === 0) {
    board[rows][cols] = 0;
    return false;
  }

  for (const [x, y] of tilesToFlip) {
    board[x][y] = tile;
  }

  return board;
}

function isOnBoard(x, y) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function gameOver(winner, count1, count2) {
  // Check if the game is over.
  if (count1 === 0 || count2 === 0) {
    // The game is over.
    return {
      // isGameOver: false,
      success: true,
      message: "Game over",
      winner,
      counts: { count1, count2 },
    };
  }

  // The game is not over.
  return {
    success: false,
    message: "Game not over",
  };
}
// isWinner(game, playerId);
function isWinner(GAME, playerId) {
  if (GAME.board[playerId] === 0) {
    return false;
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (GAME.board[i][j] === playerId) {
        if (isSurrounded(GAME, i, j)) {
          return false;
        }
      }
    }
  }

  return true;
}

function isSurrounded(GAME, x, y) {
  for (let i = 0; i < 8; i++) {
    const dx = [-1, 0, 1, 1, 1, 0, -1, -1];
    const dy = [-1, -1, -1, 0, 1, 1, 1, 0];
    let nextX = x + dx[i];
    let nextY = y + dy[i];

    if (!isOnBoard(nextX, nextY)) {
      continue;
    }

    if (GAME.board[nextX][nextY] !== GAME.currentPlayer) {
      continue;
    }

    return true;
  }

  return false;
}
