import { RegisterPayload } from "../logics/entry/register";
const uuid = require('uuid');

//#region Player
interface Players {
    info: BasicInfo;
    loginInfo: LoginInfo;
    playerId: string;
    gameInfo: GameInfo;
}

interface BasicInfo {
    name: string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNumber: number;
    age: number;
    gender: string;
    avatar: string;
    password: string;
    createdAt: number;
}
interface LoginInfo {
    ipV4Address: string;
    ipV6Address: string;
    deviceType: string; //devices interface
    loginMode: string;//interface normal,google,fb , then add googledata,fb data
    lastLogin: number;
}

interface GameInfo {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesTied: number; 
}


//#endregion
export class Player implements Players {
    forEach(arg0: (player: import("./InGamePlayer").InGamePlayer) => void) {
      throw new Error("Method not implemented.");
    }
    info: BasicInfo;
    loginInfo: LoginInfo;
    playerId: string;
    gameInfo: GameInfo; 

    constructor(data: RegisterPayload) {
        this.createDataForUser(data);
    }

    createDataForUser(userData: RegisterPayload) {
        this.info = {
            name: !!userData && userData.userName ? userData.userName : "",
            firstName: !!userData && userData.firstName ? userData.firstName : "",
            lastName: !!userData && userData.lastName ? userData.lastName : "",
            emailId: !!userData && userData.emailId ? userData.emailId : "",
            mobileNumber: !!userData && userData.mobileNumber ? userData.mobileNumber : -1,
            age: !!userData && userData.age ? userData.age : -1,
            gender: !!userData && userData.gender ? userData.gender : "",
            avatar: !!userData && userData.avatar ? userData.avatar : "",
            password: !!userData && userData.password ? userData.password : "11", //encrypt
            createdAt: Number(new Date()),
        };

        this.loginInfo = {
            ipV4Address: !!userData && userData.ipV4Address ? userData.ipV4Address : "",
            ipV6Address: !!userData && userData.ipV6Address ? userData.ipV6Address : "",
            deviceType: !!userData && userData.deviceType ? userData.deviceType : "web",
            loginMode: !!userData && userData.loginMode ? userData.loginMode : "normal",
            lastLogin: Number(new Date()),

        }

        this.playerId = uuid.v4();

        this.gameInfo = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost:0,
            gamesTied:0
        }
        

}
}



