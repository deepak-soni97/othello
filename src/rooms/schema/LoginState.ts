import { Schema, Context, type } from "@colyseus/schema";

export class LoginState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

}
