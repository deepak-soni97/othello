import { Client } from "colyseus";
import { GameVariation } from "../GameConstants";

const Joi = require('joi');

export const login_schema = Joi.object({
    user_name: Joi.string().required(),
    emailId: Joi.string().email(),
    mobile_num: Joi.string(),
    password: Joi.string().required(),
});

export type login_data = {
    user_name: string;
    emailId: string;
    mobile_num: string;
    password: string;
};



export const CreateTableSchema = Joi.object({
    tableName: Joi.string().required(),
    maxPlayers: Joi.number().required(),
    turnTime: Joi.number().required(),
    totalGameTime: Joi.number().required(),
    prizeStructure: Joi.object().required(),
    gameVariation: Joi.string().required()
})

export type CreateTablePayload = {
    tableName: string;
    maxPlayers: number;
    turnTime: number;
    totalGameTime: number;
    prizeStructure: object;
    gameVariation: GameVariation;
};

export type JoinTablePayload = {
    tableId: string;
    playerId: string;
    playerName?: string;
    avatar?: string;
    tableType?: string;
    password?: string;
    networkIp?: string;
    deviceType?: string;//find on backend
    processedData?: any;
    client?: Client
}

