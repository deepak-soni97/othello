

export async function gameStart(data) {

    let res: any = {};
    res.gameStart = true;
    res.tableData = {
        tableId: data.tables.id,
        turnTime: data.tables.info.turnTime,
        state: data.tables.currentInfo.state,
        totalGameTime: data.tables.info.totalGameTime
    }

    res.tableData.players = [];
    data.tables.currentInfo.players.forEach((player) => {
        let playerObj: any = {};
        playerObj.playerId = player.playerId;
        playerObj.playerName = player.playerName;
        playerObj.imageAvtar = player.imageAvtar;
        playerObj.state = player.state;
        playerObj.game = player.game;
        res.tableData.players.push(playerObj);
        
    });

    return res;
}
