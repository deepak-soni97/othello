import { DbManager } from "./DbManager";
import { Player } from "../DataFormats/Player";
import { Table } from "../DataFormats/Table";
import { Db } from "mongodb";
import { updateGameBoard } from "../logics/game/startGame";






export async function createTable(tableData: Table): Promise<void> {
    const tablesCollection = DbManager.Instance.gameDb.collection<Table>("tables");
    const result = await tablesCollection.insertOne(tableData);
    console.log(result);
}

export async function getTables(query: any = {}): Promise<Table[]> {
    let skip = query.skip || 0;
    let limit = query.limit || 0;
    delete query.skip;
    delete query.limit;
    const tablesCollection = DbManager.Instance.gameDb.collection<Table>("tables");
    const result = await tablesCollection.find<Table>(query).skip(skip).limit(limit).toArray();
    return result;
}

export async function fetchTable(tableId: string, processName: string = "unknown"): Promise<Table> {
    const tableCollection = DbManager.Instance.gameDb.collection<Table>("tables");
    const table = await tableCollection.findOneAndUpdate({ id: tableId }, { $set: { "currentInfo.isOperationOn": false, "currentInfo.actionName": processName, "currentInfo.operationStartTime": Number(new Date()) }, $inc: { "currentInfo._v": 1 } });
    return table.value;
};




//#endregion
export async function addPlayerToTable(table:any, players: any): Promise<Table> {
    // console.log("===",players);
    const tableCollection = DbManager.Instance.gameDb.collection<any>('tables');
    const updateTable = await tableCollection.findOneAndUpdate(
        { tableId: table.id },
        { $push: { 'currentInfo.players':{$each: players} } }
        // {returnOriginal: false}
    );
    return updateTable;
}

export async function saveMove(tableId: string, playerId:string, row:number, col:number) {
     
    const tableCollection = DbManager.Instance.gameDb.collection<Table>("tables");
    const filter = { id: tableId, "currentInfo.players.playerId": playerId };
    let data = await getTables()
    let update ={};

    if(data[0].currentInfo.players[0].playerId === playerId){

    update = {
            $push: {
              "currentInfo.player1Moves": [row, col],
            }
          };
    }else{
    update = {
            $push: {
              "currentInfo.player2Moves": [row, col]
            }
          };
    }

    const updatedTable = await tableCollection.updateOne(filter, update);
    return updatedTable;
  }


export async function saveWinner(tableId:string,winner:any){
  const tableCollection = DbManager.Instance.gameDb.collection<Table>("table");
  const addWinner = await tableCollection.updateOne({id:tableId},{$push:{"curretnInfo.winner":winner}});
  console.log(addWinner);  
  return addWinner;
}

  export async function updatePosition(tableId:string,playerId:string,position:number) {
    // console.log(playerId,position);
    
    const tableCollection = DbManager.Instance.gameDb.collection<Table>("table");
    const updatePosition = await tableCollection.updateOne({id:tableId, "currentInfo,.players.playerId":playerId},{$set:{"currentInfo.players[0].position":position}})
    // console.log(updatePosition);
    return updatePosition;
    
  }