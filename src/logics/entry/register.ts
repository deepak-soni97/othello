import { Player } from "../../DataFormats/Player";
import * as MasterDB from '../../db/MasterQueries';

export interface RegisterPayload {
    userName: string;
    emailId: string;
    password: string;
    mobileNumber: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: string;
    avatar?: string;


    ipV4Address?: string;
    ipV6Address?: string;
    deviceType?: string;
    loginMode?: string;
   }

export async function onRegisterRequest(data: RegisterPayload) {
    
    if (!data.userName || !data.password || !data.emailId) {
        return { success: false, info: "username ,emailId, password not present" }
    }

 

    let newPlayer = new Player(data);
    let catchedError: any = null;
    let res = await MasterDB.signupUser(newPlayer).catch((err) => { console.log(err); catchedError = err });
    if (!catchedError) {        
        return { success: true }
    } else {
        return { success: false, info: catchedError }
    }
    
}

