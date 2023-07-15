// import { Table } from "../../DataFormats/Table";
import { Table } from "../../DataFormats/Table";
import { createTable, getTables } from "../../db/Queries";
import { CreateTablePayload } from "../../DataFormats/payload";
import { validate } from "../../core/validator";
import * as payloads from "../../DataFormats/payload";
import { getPlayerList,createRoomCode ,isCodeInUse} from "../../db/MasterQueries";
import { roomcode } from "../../DataFormats/room";





export async function getTablesFromDB() {
    let res = await getTables();
    if (!!res) {
        return { success: true, tables: res[0] }
    } else {
        return { success: false }
    }
}

export function createTableInDB(data: CreateTablePayload) {
    validate(data, payloads.CreateTableSchema);
    let newTable = new Table(data);
    createTable(newTable).then((a) => {
        console.log(a)
    }).catch((e) => {
        console.log("create table error ", e)
    })
}

export async function playersData() {
    let res = await getPlayerList();
    if(!!res) {
        return { success: true, playerList:res}
    }else {
        return{success :false};
    }
}

 
