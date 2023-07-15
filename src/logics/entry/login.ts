import { validate } from "../../core/validator";
import { loginUser } from "../../db/MasterQueries";
import * as payloads from '../../DataFormats/payload';


export async function onLoginRequest(data: payloads.login_data) {
    validate(data, payloads.login_schema);
    let catchedError: any = null;
    let res = await loginUser({ 'info.name': data.user_name }).catch(e => { console.log(e); catchedError = e; });
    if (!!res) {
        if (res.info.password == data.password) {
            return { success: true, user: res }
        } else {
            return { success: false, info: "Password is invalid" }
        }
    } else {
        return { success: false, info: catchedError }
    }

}

