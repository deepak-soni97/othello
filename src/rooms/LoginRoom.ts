import { Room, Client, ServerError } from "colyseus";
import { IncomingMessage } from "http";
import { onLoginRequest } from "../logics/entry/login";
import { onRegisterRequest } from "../logics/entry/register";
import { LoginState } from "./schema/LoginState";

export class LoginRoom extends Room<LoginState> {

    onCreate(options: any) {
        this.setState(new LoginState());
        this.registerClientMessages();
    }
    
    registerClientMessages() {
        this.onMessage("login", async (client, payload) => {
            let res = await onLoginRequest(payload.message);
            client.send("response", { response: res, respId: payload.respId });
        });

        this.onMessage("register", async (client, payload) => {
            let res = await onRegisterRequest(payload.message);
            client.send("response", { response: res, respId: payload.respId });
        })

        this.onMessage('*', (client: Client, type: string | number, message: any) => {
            console.log("X handler", type)
        })
    }

    onAuth(client: Client, options: any, request?: IncomingMessage) {
        // throw new ServerError(400, "bad access token");
        const { username, password } = options;

        // Call the authentication logic to validate the username and password
        // const isAuthenticated = authenticateUser(username, password);

        // if (!isAuthenticated) {
            // If authentication fails, throw a ServerError with an appropriate error message and code
            // throw new ServerError(401, "Unauthorized");
        // }

        // return true;
    }
     

    onJoin(client: Client, options: any) {
        console.log(options)
        // console.log(client.sessionId, "joined login room!");
    }

    onLeave(client: Client, consented: boolean) {
        // console.log(client.sessionId, "left login room!");
    }

    onDispose() {
        // console.log("room", this.roomId, "login room disposing...");
    }




}
