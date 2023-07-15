import { Server } from "colyseus";

import { monitor } from "@colyseus/monitor";
/**
 * Import your Room files
 */
import { LobbyRoom } from "./rooms/LobbyRoom";
import { GameRoom } from "./rooms/GameRoom";

//Others
import { DbManager } from "./db/DbManager";
import { EventEmitterInstance } from "./EventEmitter";
import { RandomTestsInstance } from "./RandomTests";
import { LoginRoom } from "./rooms/LoginRoom";

import cors from 'cors';
import fs from 'fs';
import { createServer as createLocalServer } from "http";
import { createServer } from "https";

import express from "express";
// import { Table } from "./DataFormats/Tables";
// import { TableRoom } from "./rooms/tableRoom";

import * as dotenv from 'dotenv';
// import the route
import { playground } from "@colyseus/playground";


import { func } from "joi";
dotenv.config()

const port = 3002;//Number(process.env.port) || 3000;
const app = express();
app.use(express.json());


let gameServer: Server = null;
if (process.env.NODE_ENV == "development") {
    gameServer = new Server({
        server: createLocalServer(app)
    });
} else {
    var privateKey = fs.readFileSync('../shared/skillyuddh.com.key', 'utf8');
    var certificate = fs.readFileSync('../shared/skillyuddh.com.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    const options = {
        origin: 'http://localhost:7456',
    }
    app.use(cors());//todo remove later?
    app.options('*', cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version, device-id, env, User-IP, x-api-key',
        );
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });
    gameServer = new Server({
        server: createServer(credentials, app)
    });
}

gameServer.listen(port);
initializeGameServer(gameServer);
initializeExpress(app);


function initializeGameServer(gameServer) {
    /**
     * Define your room handlers:
     */
    gameServer.define("othello_login", LoginRoom);
    gameServer.define("othello_lobby", LobbyRoom);
    gameServer.define("othello_game", GameRoom);

    //custom stuff
    initializeDependencies();
}


function initializeDependencies() {
    DbManager.Instance.init()
        .then((a) => {
            RandomTestsInstance.init();
            // EventEmitterInstance.emit("signup");
            // RandomTestsInstance.login();
        })
        .catch();
};

function initializeExpress(app) {
    /**
     * Bind your custom express routes here:
     */

    app.use(cors());
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Methods",
            "GET, PUT, POST, PATCH, DELETE, OPTIONS"
        );
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version, device-id, env, User-IP, x-api-key"
        );
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    });


    app.get("/", (req, res) => {
        res.send("It's time to kick ass and chew bubblegum!");
    });

// bind it as an express middleware
app.use("/playground", playground);

    app.use("/colyseus", monitor());
}
