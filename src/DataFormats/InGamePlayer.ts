import { PlayerState } from "../GameConstants";

export type InGamePlayer = {
    gameInfo: any;
    info: any;
    playerId: string;
    tableId: string;
    playerName: string;
    position: number;
    active: boolean; 
    seatIndex: number;
    avatar: string;
    state: PlayerState;
   
    isPlayed: boolean;

    preActiveIndex: number;
    nextActiveIndex: number;

    roundId: string;
    hasPlayedOnceOnTable: boolean;

    isWaitingPlayer: boolean;

    disconnectedMissed: number;


    isTimeBankUsed: boolean;
    timeBankStartedAt: number;



    networkIp?: string;
    deviceType?: string;


    isDisconnected: boolean;

    isJoinedOnce: boolean;

    activityRecord?: any;


    tournamentData?: any;
}



export function createInGamePlayer(playerData: Partial<InGamePlayer>): InGamePlayer {
    let newPlayer: InGamePlayer = {
        playerId: playerData.playerId,
        position: playerData.position,
        tableId: playerData.tableId,
        playerName: playerData.playerName,
        networkIp: playerData.networkIp,
        deviceType: playerData.deviceType,
        avatar: playerData.avatar,
        state: playerData.state || PlayerState.Waiting,

        active: false,
        isPlayed: false,
        preActiveIndex: -1,
        nextActiveIndex: -1,
        roundId: "",
        hasPlayedOnceOnTable: false,
        isWaitingPlayer: true,
        disconnectedMissed: 0,
        isTimeBankUsed: false,
        timeBankStartedAt: 0,
        isDisconnected: false,
        isJoinedOnce: false,
        activityRecord: {
            seatReservedAt: !!playerData.state && playerData.state === PlayerState.Reserved ? new Date() : null,
            lastMovePlayerAt: null,
            disconnectedAt: null,
            lastActivityAction: "",
            lastActivityTime: Number(new Date())
        },
        tournamentData: {
            isTournamentSitout: false
        }
    };

    return newPlayer;
}


